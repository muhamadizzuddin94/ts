export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager' | 'hr' | 'finance' | 'management' | 'it_admin' | 'production_supervisor';
  department: string;
  location: 'location_a' | 'location_b';
  manager_id?: string;
  hod_id?: string;
  annual_leave_balance: number;
  medical_leave_balance: number;
  unpaid_leave_balance: number;
  time_off_balance: number;
  total_points: number;
  level: number;
  streak: number;
  last_activity_date?: string;
  created_at: string;
  updated_at: string;
  // Computed fields for UI
  badges?: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'productivity' | 'consistency' | 'quality' | 'collaboration' | 'milestone';
  created_at: string;
  earned_at?: string; // From user_badges join
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface Achievement {
  id: string;
  user_id: string;
  type: 'task_completed' | 'streak_milestone' | 'overtime_hero' | 'early_bird' | 'quality_work' | 'team_player';
  title: string;
  description: string;
  points: number;
  earned_at: string;
}

export interface Leaderboard {
  user_id: string;
  user_name: string;
  department: string;
  total_points: number;
  level: number;
  rank: number;
  weekly_points: number;
  monthly_points: number;
}

export interface Project {
  id: string;
  name: string;
  department: string;
  status: 'active' | 'completed' | 'on_hold';
  start_date: string;
  end_date?: string;
  created_by: string;
  is_billable: boolean;
  created_at: string;
  updated_at: string;
  updated_by?: string;
  // Computed fields
  assigned_users?: string[];
}

export interface ProjectAssignment {
  project_id: string;
  user_id: string;
  assigned_at: string;
  assigned_by?: string;
}

export interface Task {
  id: string;
  project_id: string;
  name: string;
  description?: string;
  estimated_hours?: number;
  is_billable: boolean;
  task_type: 'project' | 'annual_leave' | 'medical_leave' | 'unpaid_leave' | 'time_off';
  created_by: string;
  assigned_by?: string;
  due_date?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  status?: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  created_at: string;
  updated_at: string;
  updated_by?: string;
  // Computed fields
  assigned_to?: string[];
}

export interface TaskAssignment {
  task_id: string;
  user_id: string;
  assigned_at: string;
  assigned_by?: string;
}

export interface TimesheetEntry {
  id: string;
  user_id: string;
  date: string;
  project_id: string;
  task_id: string;
  hours_worked: number;
  description: string;
  status: 'draft' | 'submitted' | 'approved';
  is_overtime: boolean;
  overtime_hours?: number;
  submitted_at?: string;
  approved_at?: string;
  approved_by?: string;
  is_billable: boolean;
  task_type: string;
  is_holiday?: boolean;
  is_weekend?: boolean;
  auto_overtime_reason?: string;
  created_at: string;
  created_by: string;
  updated_by?: string;
  updated_at: string;
}

export interface PublicHoliday {
  id: string;
  name: string;
  date: string;
  location: 'location_a' | 'location_b' | 'both';
  recurring: boolean;
  created_at: string;
  updated_at: string;
}

export interface OvertimeRequest {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string;
  period_type: 'first_half' | 'second_half';
  year: number;
  total_overtime_hours: number;
  status: 'pending' | 'approved_hod' | 'approved_finance' | 'approved_management' | 'rejected';
  submitted_at: string;
  hod_approved_at?: string;
  hod_approved_by?: string;
  finance_approved_at?: string;
  finance_approved_by?: string;
  management_approved_at?: string;
  management_approved_by?: string;
  rejected_at?: string;
  rejected_by?: string;
  rejection_reason?: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by?: string;
  // Computed fields
  period?: string; // For UI compatibility
  attachments?: OvertimeAttachment[];
  overtime_entries?: OvertimeEntry[];
}

export interface OvertimeEntry {
  id: string;
  request_id: string;
  date: string;
  project_name: string;
  task_name: string;
  hours: number;
  description: string;
  reason: 'weekend' | 'holiday' | 'excess_hours';
  created_at: string;
  created_by: string;
  updated_by?: string;
}

export interface OvertimeAttachment {
  id: string;
  overtime_id: string;
  file_name: string;
  file_type: 'pdf' | 'image' | 'document';
  file_url: string;
  uploaded_at: string;
  created_by: string;
  updated_by?: string;
  updated_at: string;
}

export interface LeaveRequest {
  id: string;
  user_id: string;
  leave_type: 'annual_leave' | 'medical_leave' | 'unpaid_leave' | 'time_off';
  start_date: string;
  end_date: string;
  total_days: number;
  reason: string;
  status: 'pending' | 'approved_hod' | 'approved_hr' | 'rejected';
  submitted_at: string;
  hod_approved_at?: string;
  hod_approved_by?: string;
  hr_approved_at?: string;
  hr_approved_by?: string;
  rejected_at?: string;
  rejected_by?: string;
  rejection_reason?: string;
  created_at: string;
  created_by: string;
  updated_by?: string;
  // Computed fields
  attachments?: LeaveAttachment[];
}

export interface LeaveAttachment {
  id: string;
  leave_id: string;
  file_name: string;
  file_type: 'pdf' | 'image' | 'document';
  file_url: string;
  uploaded_at: string;
  created_by: string;
  updated_by?: string;
  updated_at: string;
}

export interface ITTicket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: 'hardware' | 'software' | 'network' | 'access' | 'other';
  submitted_at: string;
  assigned_to?: string;
  resolved_at?: string;
  created_at: string;
  created_by: string;
  updated_by?: string;
  // Computed fields
  attachments?: ITTicketAttachment[];
}

export interface ITTicketAttachment {
  id: string;
  it_ticket_id: string;
  file_name: string;
  file_type: 'pdf' | 'image' | 'document';
  file_url: string;
  uploaded_at: string;
  created_by: string;
  updated_by?: string;
  updated_at: string;
}

export interface Attachment {
  id: string;
  related_type: 'leave' | 'overtime' | 'it_ticket';
  leave_id?: string;
  overtime_id?: string;
  it_ticket_id?: string;
  file_name: string;
  file_type: 'pdf' | 'image' | 'document';
  file_url: string;
  uploaded_at: string;
  created_by: string;
  updated_by?: string;
  updated_at: string;
}

export interface Statistics {
  expected_hours: number;
  actual_hours: number;
  overtime_hours: number;
  efficiency: number;
  completed_tasks: number;
  active_projects: number;
  billable_hours: number;
  non_billable_hours: number;
  leave_hours: number;
}

export interface HourVariance {
  user_id: string;
  user_name: string;
  department: string;
  expected_hours: number;
  actual_hours: number;
  variance: number;
  variance_percentage: number;
  month: string;
}

export interface TaskVariance {
  task_id: string;
  task_name: string;
  project_name: string;
  estimated_hours: number;
  actual_hours: number;
  variance: number;
  variance_percentage: number;
  assigned_users: string[];
}

export interface BatchUpdate {
  id: string;
  user_id: string;
  date: string;
  time_slot: 'morning' | 'afternoon' | 'full_day';
  project_id: string;
  task_id: string;
  description: string;
  created_at: string;
}