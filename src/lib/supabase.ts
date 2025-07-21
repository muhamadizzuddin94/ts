import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for better type safety
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'employee' | 'manager' | 'hr' | 'finance' | 'management' | 'it_admin' | 'production_supervisor';
          department: string;
          location: 'location_a' | 'location_b';
          manager_id: string | null;
          hod_id: string | null;
          annual_leave_balance: number;
          medical_leave_balance: number;
          unpaid_leave_balance: number;
          time_off_balance: number;
          total_points: number;
          level: number;
          streak: number;
          last_activity_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role: 'employee' | 'manager' | 'hr' | 'finance' | 'management' | 'it_admin' | 'production_supervisor';
          department: string;
          location: 'location_a' | 'location_b';
          manager_id?: string | null;
          hod_id?: string | null;
          annual_leave_balance?: number;
          medical_leave_balance?: number;
          unpaid_leave_balance?: number;
          time_off_balance?: number;
          total_points?: number;
          level?: number;
          streak?: number;
          last_activity_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'employee' | 'manager' | 'hr' | 'finance' | 'management' | 'it_admin' | 'production_supervisor';
          department?: string;
          location?: 'location_a' | 'location_b';
          manager_id?: string | null;
          hod_id?: string | null;
          annual_leave_balance?: number;
          medical_leave_balance?: number;
          unpaid_leave_balance?: number;
          time_off_balance?: number;
          total_points?: number;
          level?: number;
          streak?: number;
          last_activity_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          department: string;
          status: 'active' | 'completed' | 'on_hold';
          start_date: string;
          end_date: string | null;
          created_by: string | null;
          is_billable: boolean;
          created_at: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          department: string;
          status: 'active' | 'completed' | 'on_hold';
          start_date: string;
          end_date?: string | null;
          created_by?: string | null;
          is_billable?: boolean;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          department?: string;
          status?: 'active' | 'completed' | 'on_hold';
          start_date?: string;
          end_date?: string | null;
          created_by?: string | null;
          is_billable?: boolean;
          created_at?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
      timesheet_entries: {
        Row: {
          id: string;
          user_id: string | null;
          date: string;
          project_id: string | null;
          task_id: string | null;
          hours_worked: number;
          description: string | null;
          status: 'draft' | 'submitted' | 'approved';
          is_overtime: boolean;
          overtime_hours: number | null;
          submitted_at: string | null;
          approved_at: string | null;
          approved_by: string | null;
          is_billable: boolean | null;
          task_type: string | null;
          is_holiday: boolean | null;
          is_weekend: boolean | null;
          auto_overtime_reason: string | null;
          created_at: string;
          created_by: string | null;
          updated_by: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          date: string;
          project_id?: string | null;
          task_id?: string | null;
          hours_worked: number;
          description?: string | null;
          status?: 'draft' | 'submitted' | 'approved';
          is_overtime?: boolean;
          overtime_hours?: number | null;
          submitted_at?: string | null;
          approved_at?: string | null;
          approved_by?: string | null;
          is_billable?: boolean | null;
          task_type?: string | null;
          is_holiday?: boolean | null;
          is_weekend?: boolean | null;
          auto_overtime_reason?: string | null;
          created_at?: string;
          created_by?: string | null;
          updated_by?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          date?: string;
          project_id?: string | null;
          task_id?: string | null;
          hours_worked?: number;
          description?: string | null;
          status?: 'draft' | 'submitted' | 'approved';
          is_overtime?: boolean;
          overtime_hours?: number | null;
          submitted_at?: string | null;
          approved_at?: string | null;
          approved_by?: string | null;
          is_billable?: boolean | null;
          task_type?: string | null;
          is_holiday?: boolean | null;
          is_weekend?: boolean | null;
          auto_overtime_reason?: string | null;
          created_at?: string;
          created_by?: string | null;
          updated_by?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};