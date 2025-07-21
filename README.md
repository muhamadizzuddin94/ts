# Enterprise Timesheet Tracking Application
A comprehensive timesheet tracking application built with React, TypeScript, and Supabase.
## Features
- **User Management**: Multi-role support (Employee, Manager, HR, Finance, Management, IT Admin, Production Supervisor)
- **Timesheet Management**: Create, submit, and approve timesheet entries
- **Project & Task Management**: Organize work by projects and tasks
- **Leave Management**: Request and approve various types of leave
- **Overtime Tracking**: Track and approve overtime hours
- **Gamification**: Points, levels, badges, and achievements system
- **Reports & Analytics**: Generate detailed reports and variance analysis
- **IT Support**: Built-in ticketing system
- **Holiday Management**: Configure public holidays by location
## Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd timesheet-tracking-app
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema provided in the project
   - Copy your project URL and anon key
4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. **Run the development server**
   ```bash
   npm run dev
   ```
## Database Schema
The application uses the following main tables:
- `users` - User profiles and authentication
- `projects` - Project management
- `tasks` - Task assignments and tracking
- `timesheet_entries` - Time tracking entries
- `leave_requests` - Leave request management
- `overtime_requests` - Overtime tracking
- `it_tickets` - IT support tickets
- `public_holidays` - Holiday configuration
- `badges` & `achievements` - Gamification system
## Architecture
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React hooks
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite
## Key Components
- **Authentication**: Role-based access control
- **Dashboard**: Overview of user statistics and activities
- **Timesheet Entry**: Time logging with automatic overtime detection
- **Project Management**: Create and assign projects to team members
- **Task Management**: Create tasks and assign to users
- **Leave Management**: Request and approve leave
- **Reports**: Generate detailed timesheet reports
- **Gamification**: Points, badges, and leaderboards
## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
## License
This project is licensed under the MIT License.