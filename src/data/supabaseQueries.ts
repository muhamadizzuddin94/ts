import { supabase } from '../lib/supabase';
import { 
  User, 
  Project, 
  Task, 
  TimesheetEntry, 
  PublicHoliday,
  OvertimeRequest,
  LeaveRequest,
  ITTicket,
  ProjectAssignment,
  TaskAssignment
} from '../types';

// Users
export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      user_badges (
        earned_at,
        badges (*)
      )
    `);
  
  if (error) throw error;
  
  return data.map(user => ({
    ...user,
    badges: user.user_badges?.map((ub: any) => ({
      ...ub.badges,
      earned_at: ub.earned_at
    })) || []
  }));
};

export const getUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      user_badges (
        earned_at,
        badges (*)
      )
    `)
    .eq('id', id)
    .single();
  
  if (error) throw error;
  
  return {
    ...data,
    badges: data.user_badges?.map((ub: any) => ({
      ...ub.badges,
      earned_at: ub.earned_at
    })) || []
  };
};

// Projects
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_assignments (
        user_id
      )
    `);
  
  if (error) throw error;
  
  return data.map(project => ({
    ...project,
    assigned_users: project.project_assignments?.map((pa: any) => pa.user_id) || []
  }));
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Tasks
export const getTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      task_assignments (
        user_id
      )
    `);
  
  if (error) throw error;
  
  return data.map(task => ({
    ...task,
    assigned_to: task.task_assignments?.map((ta: any) => ta.user_id) || []
  }));
};

export const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Task Assignments
export const assignTaskToUsers = async (taskId: string, userIds: string[], assignedBy: string): Promise<void> => {
  const assignments = userIds.map(userId => ({
    task_id: taskId,
    user_id: userId,
    assigned_by: assignedBy
  }));

  const { error } = await supabase
    .from('task_assignments')
    .insert(assignments);
  
  if (error) throw error;
};

// Project Assignments
export const assignProjectToUsers = async (projectId: string, userIds: string[], assignedBy: string): Promise<void> => {
  const assignments = userIds.map(userId => ({
    project_id: projectId,
    user_id: userId,
    assigned_by: assignedBy
  }));

  const { error } = await supabase
    .from('project_assignments')
    .insert(assignments);
  
  if (error) throw error;
};

// Timesheet Entries
export const getTimesheetEntries = async (userId?: string): Promise<TimesheetEntry[]> => {
  let query = supabase
    .from('timesheet_entries')
    .select('*');
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const createTimesheetEntry = async (entry: Omit<TimesheetEntry, 'id' | 'created_at' | 'updated_at'>): Promise<TimesheetEntry> => {
  const { data, error } = await supabase
    .from('timesheet_entries')
    .insert([entry])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateTimesheetEntry = async (id: string, updates: Partial<TimesheetEntry>): Promise<TimesheetEntry> => {
  const { data, error } = await supabase
    .from('timesheet_entries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Public Holidays
export const getPublicHolidays = async (): Promise<PublicHoliday[]> => {
  const { data, error } = await supabase
    .from('public_holidays')
    .select('*')
    .order('date');
  
  if (error) throw error;
  return data;
};

export const createPublicHoliday = async (holiday: Omit<PublicHoliday, 'created_at' | 'updated_at'>): Promise<PublicHoliday> => {
  const { data, error } = await supabase
    .from('public_holidays')
    .insert([holiday])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Leave Requests
export const getLeaveRequests = async (userId?: string): Promise<LeaveRequest[]> => {
  let query = supabase
    .from('leave_requests')
    .select('*');
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const createLeaveRequest = async (request: Omit<LeaveRequest, 'id' | 'created_at' | 'updated_by'>): Promise<LeaveRequest> => {
  const { data, error } = await supabase
    .from('leave_requests')
    .insert([request])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Overtime Requests
export const getOvertimeRequests = async (userId?: string): Promise<OvertimeRequest[]> => {
  let query = supabase
    .from('overtime_requests')
    .select(`
      *,
      overtime_entries (*)
    `);
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return data.map(request => ({
    ...request,
    period: `${request.year}-${request.period_type === 'first_half' ? 'H1' : 'H2'}`,
    overtime_entries: request.overtime_entries || []
  }));
};

export const createOvertimeRequest = async (request: Omit<OvertimeRequest, 'id' | 'created_at' | 'updated_at' | 'period'>): Promise<OvertimeRequest> => {
  const { data, error } = await supabase
    .from('overtime_requests')
    .insert([request])
    .select()
    .single();
  
  if (error) throw error;
  return {
    ...data,
    period: `${data.year}-${data.period_type === 'first_half' ? 'H1' : 'H2'}`
  };
};

// IT Tickets
export const getITTickets = async (userId?: string): Promise<ITTicket[]> => {
  let query = supabase
    .from('it_tickets')
    .select('*');
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const createITTicket = async (ticket: Omit<ITTicket, 'id' | 'created_at' | 'updated_by'>): Promise<ITTicket> => {
  const { data, error } = await supabase
    .from('it_tickets')
    .insert([ticket])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Statistics and Analytics
export const getUserStatistics = async (userId: string, month?: string) => {
  // This would be implemented as a Supabase function or complex query
  // For now, return mock data structure
  return {
    expected_hours: 160,
    actual_hours: 142.5,
    overtime_hours: 18.0,
    efficiency: 89.1,
    completed_tasks: 12,
    active_projects: 3,
    billable_hours: 120.5,
    non_billable_hours: 22.0,
    leave_hours: 16.0,
  };
};