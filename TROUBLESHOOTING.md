# Troubleshooting Guide

Common issues and their solutions for the Trinidad & Tobago Homework Centre application.

## Table of Contents

- [Installation Issues](#installation-issues)
- [Database Issues](#database-issues)
- [Build Issues](#build-issues)
- [Deployment Issues](#deployment-issues)
- [Runtime Issues](#runtime-issues)
- [Performance Issues](#performance-issues)

---

## Installation Issues

### Error: "npm install" fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete node_modules and package-lock.json:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Use legacy peer deps:
   ```bash
   npm install --legacy-peer-deps
   ```

### Error: Node version mismatch

**Symptoms:**
```
error: The engine "node" is incompatible with this module
```

**Solution:**
Ensure you're using Node.js 18 or higher:
```bash
node -v  # Should show v18.x.x or higher
```

Install/update Node.js from https://nodejs.org

---

## Database Issues

### Error: "Can't reach database server"

**Symptoms:**
```
Error: P1001: Can't reach database server at `localhost:5432`
```

**Solutions:**

1. **Local Development:**
   Check your `.env` file has the correct DATABASE_URL:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

2. **Vercel Production:**
   - Ensure Vercel Postgres database is created
   - Check environment variables in Vercel dashboard
   - DATABASE_URL should reference `POSTGRES_PRISMA_URL`

### Error: "Prisma Client not generated"

**Symptoms:**
```
Error: Cannot find module '@prisma/client'
```

**Solutions:**
```bash
npx prisma generate
```

Add to package.json if not present:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Error: Database schema out of sync

**Symptoms:**
```
Error: Prisma schema mismatch
```

**Solution:**
Push the schema to the database:
```bash
npx prisma db push
```

For production:
```bash
vercel env pull .env.local
npx prisma db push
```

---

## Build Issues

### Error: "Build failed" on Vercel

**Symptoms:**
Build logs show errors during `npm run build`

**Solutions:**

1. **Prisma generation issue:**
   Update `package.json`:
   ```json
   {
     "scripts": {
       "build": "prisma generate && next build"
     }
   }
   ```

2. **Environment variables missing:**
   - Go to Vercel → Settings → Environment Variables
   - Ensure `DATABASE_URL` is set and references `POSTGRES_PRISMA_URL`

3. **TypeScript errors:**
   Fix all TypeScript errors shown in build logs:
   ```bash
   npx tsc --noEmit
   ```

### Error: "Module not found"

**Symptoms:**
```
Module not found: Can't resolve '@/components/...'
```

**Solution:**
Check `tsconfig.json` has correct path mapping:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Deployment Issues

### Error: Vercel deployment stuck

**Symptoms:**
Deployment hangs at "Building..." for more than 10 minutes

**Solutions:**

1. Cancel deployment and retry
2. Check build logs for specific errors
3. Verify `vercel.json` configuration:
   ```json
   {
     "buildCommand": "prisma generate && next build",
     "framework": "nextjs"
   }
   ```

### Error: "This Serverless Function has crashed"

**Symptoms:**
Application shows error page after deployment

**Solutions:**

1. **Check Runtime Logs:**
   - Go to Vercel Dashboard → Deployments → [Your Deployment] → Runtime Logs
   - Look for specific error messages

2. **Common causes:**
   - Database connection issue (check DATABASE_URL)
   - Missing environment variables
   - Prisma Client not generated (add to build command)

### Error: Database migration needed

**Symptoms:**
```
Error: Migration `...` failed to apply cleanly
```

**Solution:**
For Vercel Postgres, use `db push` instead of migrations:
```bash
vercel env pull .env.local
npx prisma db push
```

---

## Runtime Issues

### Error: "Failed to fetch" on API calls

**Symptoms:**
Forms don't submit, data doesn't load

**Solutions:**

1. **Check Network tab in browser:**
   - Open DevTools → Network tab
   - Look for failed API requests
   - Check the error response

2. **Verify API routes:**
   - Ensure files exist in `src/app/api/`
   - Check file naming: `route.ts` not `route.tsx`

3. **CORS issues (local development):**
   Usually not an issue with Next.js API routes

### Error: Student/Volunteer not saving

**Symptoms:**
Form submits but data doesn't appear

**Solutions:**

1. **Check browser console:**
   - Press F12 → Console tab
   - Look for error messages

2. **Verify database connection:**
   ```bash
   npx prisma studio
   ```
   Check if Prisma Studio can connect and show data

3. **Check API route responses:**
   Add console.log in API routes to debug:
   ```typescript
   console.log('Received data:', body)
   ```

### Error: Toast notifications not showing

**Symptoms:**
No success/error messages appear

**Solution:**
Ensure `<Toaster />` is in `layout.tsx`:
```tsx
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

---

## Performance Issues

### Issue: Slow page loads

**Solutions:**

1. **Optimise images:**
   Use Next.js Image component:
   ```tsx
   import Image from 'next/image'
   <Image src="/..." width={100} height={100} alt="..." />
   ```

2. **Add loading states:**
   Already implemented in components

3. **Database indexes:**
   Schema already includes necessary indexes

### Issue: Vercel bandwidth limit reached

**Symptoms:**
"Bandwidth limit exceeded" error

**Solutions:**

1. **Optimise assets:**
   - Compress images
   - Reduce bundle size

2. **Upgrade to Pro plan** (if needed)

3. **Use CDN for static assets**

---

## Browser-Specific Issues

### Issue: Forms not working in Safari

**Solution:**
Ensure form submit handlers use `preventDefault()`:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()  // Important!
  // ...
}
```

### Issue: Styling looks different in Firefox

**Solution:**
Already using Tailwind CSS which handles cross-browser compatibility

---

## Data Issues

### Issue: Sample data not appearing

**Solution:**
Run the seed script:
```bash
npm run db:seed
```

Or manually via Prisma Studio:
```bash
npx prisma studio
```

### Issue: Duplicate student entries

**Solution:**
Check if form is being submitted multiple times. Add loading state:
```tsx
const [loading, setLoading] = useState(false)

const handleSubmit = async (e) => {
  if (loading) return  // Prevent double submission
  setLoading(true)
  // ...
}
```

---

## Getting Help

If your issue isn't listed here:

1. **Check logs:**
   - Browser console (F12)
   - Vercel deployment logs
   - Vercel runtime logs

2. **Search issues:**
   - Check GitHub issues in the repository
   - Search Stack Overflow for similar problems

3. **Create an issue:**
   - Go to GitHub repository
   - Click "Issues" → "New Issue"
   - Provide:
     - Error message
     - Steps to reproduce
     - Environment (OS, Node version, etc.)

4. **Contact support:**
   - Trinidad & Tobago Education Committee
   - Vercel support (for deployment issues)

---

## Preventive Measures

To avoid issues:

1. **Keep dependencies updated:**
   ```bash
   npm outdated
   npm update
   ```

2. **Run tests before deployment:**
   ```bash
   npm run lint
   npm run build
   ```

3. **Use environment variables properly:**
   - Never commit `.env` files
   - Always use `.env.example` as template

4. **Regular backups:**
   - Export database periodically
   - Keep code in version control

5. **Monitor application:**
   - Check Vercel analytics
   - Review error logs regularly

---

## Quick Diagnostics Checklist

When something goes wrong, check:

- [ ] Node.js version is 18+
- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file exists with correct DATABASE_URL
- [ ] Prisma Client generated (`npx prisma generate`)
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Application builds locally (`npm run build`)
- [ ] Browser console shows no errors (F12)
- [ ] API routes return expected data
- [ ] Environment variables set in Vercel (for production)

---

**Still having issues? Don't panic! Most problems have simple solutions. Read the error message carefully—it usually tells you what's wrong.**
