import { useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          user_badges (
            earned_at,
            badges (*)
          )
        `)
        .eq('id', userId)
        .single();

      if (error) throw error;

      // Transform the data to match our User interface
      const userWithBadges: User = {
        ...data,
        badges: data.user_badges?.map((ub: any) => ({
          ...ub.badges,
          earned_at: ub.earned_at
        })) || []
      };

      setUser(userWithBadges);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const switchRole = async (role: User['role']) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('users')
          .update({ role, updated_at: new Date().toISOString() })
          .eq('id', user.id);
        
        if (error) throw error;
        
        setUser({ ...user, role });
      } catch (error) {
        console.error('Error switching role:', error);
      }
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    switchRole
  };
};