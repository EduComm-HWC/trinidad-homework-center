# Vercel Deployment Guide

Complete step-by-step guide to deploy the Trinidad & Tobago Homework Centre on Vercel's free tier.

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com with GitHub)
- Git installed on your computer

## Part 1: Prepare Your Code for GitHub

### Step 1: Create a GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository: `trinidad-homework-center`
4. Keep it Public (for free tier)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push Code to GitHub

Open your terminal in the project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit - Trinidad Homework Centre"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/trinidad-homework-center.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Part 2: Deploy to Vercel

### Step 1: Sign in to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorise Vercel to access your GitHub account

### Step 2: Import Your Project

1. On Vercel dashboard, click "Add New..." → "Project"
2. Find your `trinidad-homework-center` repository
3. Click "Import"

### Step 3: Configure Your Project

Vercel will auto-detect Next.js settings. Verify these:

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

Click "Deploy" (we'll add the database later)

**First deployment will fail - this is expected!** We need to add the database first.

## Part 3: Set Up Vercel Postgres Database

### Step 1: Create Database

1. In your Vercel project dashboard, click the "Storage" tab
2. Click "Create Database"
3. Select "Postgres"
4. Choose a database name: `homework-center-db`
5. Select your region (choose closest to Trinidad & Tobago - US East is usually best)
6. Click "Create"

### Step 2: Connect Database to Project

1. Vercel will ask "Connect to Project?"
2. Select your `trinidad-homework-center` project
3. Click "Connect"

Vercel automatically adds these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

### Step 3: Configure Database URL

1. Go to your project's "Settings" tab
2. Click "Environment Variables"
3. Add a new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Click "Reference" → Select `POSTGRES_PRISMA_URL`
   - **Environments**: Production, Preview, Development (select all)
4. Click "Save"

## Part 4: Initialize the Database

### Method 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI on your computer:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Link your project:
```bash
vercel link
```
Select your project when prompted.

4. Pull environment variables:
```bash
vercel env pull .env.local
```

5. Push database schema:
```bash
npx prisma db push
```

6. (Optional) Seed database with sample data:
```bash
npx prisma db seed
```

### Method 2: Using Vercel Dashboard

1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Temporarily add `DATABASE_URL` variable with your Vercel Postgres connection string
4. Open your project in a code editor
5. Run `npx prisma db push`
6. Remove the temporary environment variable from settings

## Part 5: Redeploy Your Application

### Option A: Automatic Deployment

1. Make any small change to your code (e.g., edit README)
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Trigger redeployment"
git push
```

Vercel will automatically detect the push and redeploy.

### Option B: Manual Deployment

1. Go to your Vercel project dashboard
2. Click "Deployments" tab
3. Click the "..." menu on your latest deployment
4. Select "Redeploy"
5. Click "Redeploy" to confirm

## Part 6: Verify Your Deployment

1. Once deployment is complete, click "Visit" to open your live application
2. Your app will be at: `https://your-project-name.vercel.app`
3. Test the application:
   - Click "Register New Student" to test student registration
   - Navigate through all tabs to ensure they work
   - Check that data persists (reload the page)

## Part 7: Add a Custom Domain (Optional)

### Using a Free Vercel Domain

Your project automatically gets: `your-project.vercel.app`

### Using Your Own Domain

1. Go to "Settings" → "Domains"
2. Enter your domain name
3. Follow Vercel's instructions to update your domain's DNS settings
4. Vercel automatically handles SSL certificates

## Troubleshooting

### Build Failures

**Error: "Prisma Client generation failed"**
- Solution: Make sure `prisma generate` is in your build command
- Update `package.json`:
  ```json
  "scripts": {
    "build": "prisma generate && next build"
  }
  ```

**Error: "Cannot find module '@prisma/client'"**
- Solution: Add `postinstall` script to `package.json`:
  ```json
  "scripts": {
    "postinstall": "prisma generate"
  }
  ```

### Database Connection Issues

**Error: "Can't reach database server"**
- Check that `DATABASE_URL` environment variable is set correctly
- Verify it's using `POSTGRES_PRISMA_URL` (not `POSTGRES_URL`)
- Ensure database is in the same region as your deployment

### Page Not Loading

**Error: "Application Error"**
- Check deployment logs in Vercel dashboard
- Go to "Deployments" → Click on latest deployment → "Build Logs"
- Look for specific error messages

## Free Tier Limits

Vercel Free Tier includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth per month
- ✅ Automatic SSL certificates
- ✅ Serverless functions
- ✅ 1 PostgreSQL database (256 MB storage)
- ✅ Preview deployments for pull requests

These limits are sufficient for the homework centre application with moderate usage.

## Managing Your Deployment

### Viewing Logs

1. Go to your project dashboard
2. Click "Deployments"
3. Click on a deployment
4. View "Runtime Logs" for application errors

### Updating Your Application

1. Make changes to your code locally
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Description of changes"
git push
```
3. Vercel automatically deploys the latest version

### Rolling Back

1. Go to "Deployments" tab
2. Find a previous successful deployment
3. Click "..." → "Promote to Production"

## Security Best Practices

1. **Never commit `.env` files** - they're in `.gitignore`
2. **Use environment variables** for all sensitive data
3. **Enable Vercel Authentication** (Settings → Authentication) for admin access
4. **Regularly update dependencies**:
```bash
npm audit fix
```

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Next.js Documentation**: https://nextjs.org/docs

## Post-Deployment Checklist

- [ ] Application loads at your Vercel URL
- [ ] Can register new students
- [ ] Student data persists after page reload
- [ ] All tabs are accessible and functional
- [ ] Forms submit successfully
- [ ] Database is connected and working
- [ ] Environment variables are set correctly
- [ ] No console errors in browser

## Maintenance

### Weekly Tasks
- Check application is running correctly
- Monitor database usage in Vercel dashboard
- Review error logs if any issues reported

### Monthly Tasks
- Update dependencies if needed
- Review and clean up test data
- Check storage usage

Your Trinidad & Tobago Homework Centre is now live and ready for volunteers to start using! 🎉
