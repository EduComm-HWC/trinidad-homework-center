# Trinidad & Tobago Homework Centre Management System

A comprehensive web application for managing the Trinidad & Tobago Education Committee Homework Centre. This system helps track students, volunteers, tutoring sessions, and academic progress with a focus on CSEC preparation.

## Features

- **Student Management**: Register and track students from both primary and secondary schools
- **Volunteer Coordination**: Manage volunteer tutors and their areas of expertise
- **Session Recording**: Document tutoring sessions with detailed assessments
- **Progress Tracking**: Monitor student performance and academic growth
- **Trinidad & Tobago Context**: Local schools, CSEC subjects, and educational system integration

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: PostgreSQL (Vercel Postgres for production)
- **ORM**: Prisma
- **State Management**: React Query (TanStack Query)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or bun package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/trinidad-homework-center.git
cd trinidad-homework-center
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL:
```env
DATABASE_URL="your_database_url_here"
```

4. Set up the database:
```bash
npm run db:push
# This creates the database tables based on the Prisma schema
```

5. (Optional) Seed the database with sample data:
```bash
npm run db:seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment on Vercel

### Step 1: Prepare Your Repository

1. Create a new repository on GitHub
2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trinidad-homework-center.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account
2. Click "New Project"
3. Import your `trinidad-homework-center` repository
4. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### Step 3: Set Up Database

1. In your Vercel project dashboard, go to the "Storage" tab
2. Click "Create Database" and select "Postgres"
3. Choose a database name (e.g., "homework-center-db")
4. Click "Create"
5. Vercel will automatically add the `DATABASE_URL` environment variable

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your application will be live at `https://your-project.vercel.app`

### Step 5: Initialize Database

After deployment, you need to push the schema to your production database:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Pull your environment variables:
```bash
vercel env pull .env.local
```

3. Push the database schema:
```bash
npx prisma db push
```

## Environment Variables

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string (automatically set by Vercel Postgres)
- `NEXT_PUBLIC_APP_URL`: Your application URL (e.g., https://your-project.vercel.app)

## Database Schema

The application uses the following main models:

- **Student**: Student information, education level, subjects, and parent details
- **Volunteer**: Tutor information, expertise, and availability
- **Session**: Tutoring session records with assessments
- **Assessment**: Test scores and academic evaluations
- **RegistrationAssessment**: Comprehensive initial student assessment
- **Parent**: Parent/guardian contact information

## Project Structure

```
trinidad-homework-center/
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── api/              # API routes
│   │   ├── page.tsx          # Main dashboard
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── StudentRegistrationForm.tsx
│   │   ├── SessionRecordingForm.tsx
│   │   ├── StudentsTab.tsx
│   │   └── VolunteersTab.tsx
│   └── lib/                  # Utility functions
│       ├── db.ts            # Prisma client
│       └── utils.ts         # Helper functions
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Sample data
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Features by Tab

### Overview
- Dashboard with key statistics
- Quick access to all major functions

### Registration
- Multi-step student registration form
- Support for both primary and secondary students
- Comprehensive parent/guardian information

### Students
- View all registered students
- Student cards with key information
- CSEC subjects and career goals
- Delete student records

### Volunteers
- Manage volunteer tutors
- Track expertise and availability
- Background check status

### Sessions
- Record tutoring sessions
- Session assessments (attentiveness, participation, understanding, behaviour)
- Topic tracking

### Progress
- Student academic progress tracking
- Performance trends
- (Coming soon)

### Assessments
- Test and exam management
- CSEC practice assessments
- (Coming soon)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For support, please contact the Trinidad & Tobago Education Committee or open an issue in this repository.

## Acknowledgements

- Built for the Trinidad & Tobago Education Committee
- Designed to support CSEC preparation and student success
- Local schools and educational context integrated throughout
