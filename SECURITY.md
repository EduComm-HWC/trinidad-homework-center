# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The Trinidad & Tobago Education Committee takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:

**Security Team Email:** [Your Security Contact Email]

or create a private security advisory:
1. Go to the GitHub repository
2. Click "Security" tab
3. Click "Report a vulnerability"

### What to Include

Please include as much of the following information as possible:

- **Type of vulnerability** (e.g., SQL injection, XSS, authentication bypass)
- **Full path of affected source file(s)**
- **Location of the affected code** (tag/branch/commit or direct URL)
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the issue** (what an attacker could do)
- **Suggested fix** (if you have one)

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Target:** Within 30 days for critical issues

### Disclosure Policy

- We will acknowledge receipt of your vulnerability report
- We will provide an estimated timeline for a fix
- We will notify you when the vulnerability is fixed
- We will publicly credit you (unless you prefer to remain anonymous)

## Security Best Practices

### For Developers

#### Environment Variables

❌ **NEVER** commit sensitive data:
```bash
# Bad - DO NOT DO THIS
git add .env
git commit -m "Add environment variables"
```

✅ **Always** use `.env.example`:
```bash
# Good
cp .env.example .env
# Edit .env with your actual values
# .env is in .gitignore
```

#### Database Security

✅ **Use Prisma** for all database queries (prevents SQL injection):
```typescript
// Good - Parameterised query via Prisma
const student = await db.student.findUnique({
  where: { id: studentId }
})
```

❌ **Never** use raw SQL with user input:
```typescript
// Bad - Vulnerable to SQL injection
const student = await db.$queryRaw(`
  SELECT * FROM Student WHERE id = '${studentId}'
`)
```

#### Input Validation

✅ **Always validate and sanitise** user input:
```typescript
// Good
const schema = z.object({
  firstName: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().min(5).max(100)
})

const validatedData = schema.parse(body)
```

❌ **Never trust** user input directly:
```typescript
// Bad
const student = await db.student.create({
  data: body // Unvalidated input
})
```

#### Authentication & Authorisation

Currently, this application doesn't have authentication. When implementing:

✅ **Use secure authentication:**
- Use NextAuth.js or similar
- Implement proper session management
- Use HTTPS in production
- Implement CSRF protection

❌ **Never** roll your own authentication

#### API Security

✅ **Implement rate limiting** for API routes
✅ **Validate all inputs** before processing
✅ **Return appropriate HTTP status codes**
✅ **Log security events**
✅ **Handle errors gracefully** without exposing sensitive information

```typescript
// Good error handling
catch (error) {
  console.error('Database error:', error)
  return NextResponse.json(
    { error: 'An error occurred' },
    { status: 500 }
  )
}
```

```typescript
// Bad - Exposes internal details
catch (error) {
  return NextResponse.json(
    { error: error.message, stack: error.stack },
    { status: 500 }
  )
}
```

### For Deployments

#### Vercel Security

✅ **Do:**
- Use Vercel's environment variables for secrets
- Enable Vercel Authentication if needed
- Use Vercel's security headers
- Keep dependencies updated
- Review deployment logs regularly

❌ **Don't:**
- Commit `.env` files
- Expose sensitive data in client-side code
- Use weak database passwords
- Ignore security warnings

#### Database Security

✅ **Vercel Postgres:**
- Connection uses SSL by default
- Use `POSTGRES_PRISMA_URL` for Prisma
- Regularly backup your database
- Monitor database access logs

#### HTTPS

- Vercel provides automatic HTTPS
- All connections are encrypted
- Certificates auto-renew

### For Users

#### Admin Access

When authentication is implemented:
- Use strong, unique passwords
- Enable two-factor authentication
- Regularly review access logs
- Limit admin privileges
- Change default credentials

#### Data Protection

- Don't share login credentials
- Log out after use on shared computers
- Report suspicious activity
- Keep browsers updated
- Be cautious with public WiFi

## Known Security Considerations

### Current Version (1.0.0)

#### No Authentication Yet
- **Status:** Not implemented
- **Impact:** Anyone with the URL can access the application
- **Mitigation:** 
  - Use Vercel Authentication if needed
  - Deploy to private subdomain
  - Implement authentication in v1.1

#### Public Data Access
- **Status:** API routes are public
- **Impact:** Anyone can read/write data if they know the endpoints
- **Mitigation:**
  - Implement authentication before public deployment
  - Use Vercel's built-in protection features
  - Consider IP allowlisting for admin functions

#### Data Validation
- **Status:** Basic validation implemented
- **Impact:** Some edge cases may not be covered
- **Mitigation:**
  - Additional validation will be added
  - Report any validation bypasses

## Compliance

### Data Protection

This application may handle personal data of students and parents. Ensure compliance with:

- Trinidad & Tobago Data Protection Act
- General guidelines for educational data
- Parental consent for student information

### Best Practices

✅ **Collect only necessary data**
✅ **Store data securely**
✅ **Use encryption for sensitive data**
✅ **Implement data retention policies**
✅ **Provide data access/deletion on request**
✅ **Maintain audit logs**

## Security Checklist

Before deploying to production:

- [ ] All environment variables set in Vercel
- [ ] `.env` files not committed to Git
- [ ] Database uses strong password
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Error messages don't expose sensitive info
- [ ] Input validation on all forms
- [ ] API rate limiting considered
- [ ] Dependencies are up to date
- [ ] Security headers configured
- [ ] Monitoring and logging enabled
- [ ] Backup strategy in place
- [ ] Incident response plan created

## Vulnerability Severity

We use the following severity levels:

- **Critical:** Remote code execution, authentication bypass, data breach
- **High:** SQL injection, XSS, CSRF, privilege escalation
- **Medium:** Information disclosure, denial of service
- **Low:** Minor issues with limited impact

## Security Updates

Security updates will be released as soon as possible after a vulnerability is confirmed:

- **Critical vulnerabilities:** Immediate patch release
- **High vulnerabilities:** Within 7 days
- **Medium vulnerabilities:** Next minor release
- **Low vulnerabilities:** Next major release

## Recognition

We maintain a Security Hall of Fame to recognise researchers who help improve our security:

### Security Researchers
*(No vulnerabilities reported yet - be the first!)*

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Vercel Security](https://vercel.com/docs/security)
- [Prisma Security](https://www.prisma.io/docs/guides/security)

## Questions?

If you have questions about security that don't involve a specific vulnerability:

- Check this security policy
- Review our documentation
- Open a general GitHub issue (non-sensitive questions only)

---

**Thank you for helping keep the Trinidad & Tobago Homework Centre secure!** 🔒
