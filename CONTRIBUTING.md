# Contributing to Trinidad & Tobago Homework Centre

Thank you for your interest in contributing to the Trinidad & Tobago Homework Centre Management System! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background or experience level.

### Our Standards

✅ **Do:**
- Be respectful and constructive
- Welcome newcomers and help them get started
- Focus on what's best for the community
- Show empathy towards others
- Accept constructive criticism gracefully

❌ **Don't:**
- Use inappropriate language or imagery
- Make personal attacks or insults
- Harass others publicly or privately
- Share others' private information
- Act unprofessionally

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git
- A GitHub account
- Basic knowledge of TypeScript and React

### Setting Up Your Development Environment

1. **Fork the repository:**
   - Go to the GitHub repository
   - Click "Fork" in the top right

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/trinidad-homework-center.git
   cd trinidad-homework-center
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/trinidad-homework-center.git
   ```

4. **Run setup script:**
   ```bash
   # Linux/Mac
   chmod +x setup.sh
   ./setup.sh
   
   # Windows
   setup.bat
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

---

## Development Process

### Branching Strategy

We use a simplified Git flow:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Creating a New Feature

1. **Create a feature branch:**
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the coding standards below
   - Add tests if applicable

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add student export functionality"
   ```

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request:**
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Fill in the PR template
   - Submit the pull request

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

**Examples:**
```
feat: add volunteer availability calendar
fix: correct student age calculation
docs: update deployment guide
style: format API route files
refactor: simplify session recording form
test: add student registration tests
chore: update dependencies
```

---

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Enable strict mode
- Define proper types and interfaces
- Avoid `any` type when possible

**Good:**
```typescript
interface Student {
  id: string
  firstName: string
  lastName: string
  age: number
}

const getStudent = (id: string): Promise<Student> => {
  // ...
}
```

**Avoid:**
```typescript
const getStudent = (id: any): any => {
  // ...
}
```

### React Components

- Use functional components with hooks
- Use meaningful component names
- Keep components focused and small
- Use TypeScript for props

**Good:**
```tsx
interface StudentCardProps {
  student: Student
  onDelete: (id: string) => void
}

export function StudentCard({ student, onDelete }: StudentCardProps) {
  // ...
}
```

### File Organisation

```
src/
├── app/           # Next.js app directory
├── components/    # React components
│   ├── ui/       # Reusable UI components
│   └── ...       # Feature components
└── lib/          # Utility functions
```

### Naming Conventions

- **Components:** PascalCase (`StudentCard.tsx`)
- **Functions:** camelCase (`getStudents()`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_STUDENTS`)
- **Files:** kebab-case or PascalCase for components
- **CSS Classes:** kebab-case

### UK English Spelling

This project uses UK English spelling throughout:

- ✅ `colour`, `behaviour`, `centre`, `organisation`
- ❌ `color`, `behavior`, `center`, `organization`

Please maintain this consistency in all code, comments, and documentation.

### Styling

- Use Tailwind CSS utility classes
- Follow existing component patterns
- Keep styles consistent with shadcn/ui
- Avoid custom CSS when possible

**Good:**
```tsx
<div className="flex items-center gap-2 rounded-md border p-4">
  <h2 className="text-lg font-semibold">Student Name</h2>
</div>
```

### API Routes

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate status codes
- Handle errors gracefully
- Validate input data

**Good:**
```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Validate input
    if (!body.firstName) {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 }
      )
    }
    // Process request
    const student = await db.student.create({ data: body })
    return NextResponse.json(student, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Database

- Use Prisma for database operations
- Write efficient queries
- Use proper indexes
- Handle database errors

---

## Submitting Changes

### Pull Request Process

1. **Update documentation:**
   - Update README.md if needed
   - Add/update comments in code
   - Update API documentation

2. **Ensure quality:**
   - Run linter: `npm run lint`
   - Build successfully: `npm run build`
   - Test locally: `npm run dev`

3. **Complete the PR template:**
   - Describe what changed
   - Explain why the change was needed
   - List any breaking changes
   - Add screenshots if UI changed

4. **Wait for review:**
   - Address reviewer comments
   - Make requested changes
   - Push updates to your branch

5. **Merge:**
   - Once approved, a maintainer will merge
   - Delete your feature branch after merge

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed my code
- [ ] Commented complex code sections
- [ ] Updated documentation
- [ ] No new warnings generated
- [ ] Tested locally
```

---

## Reporting Bugs

### Before Reporting

1. Check existing issues
2. Check TROUBLESHOOTING.md
3. Verify it's reproducible
4. Try the latest version

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behaviour
What should happen

## Actual Behaviour
What actually happens

## Screenshots
If applicable

## Environment
- OS: [e.g., Windows 10, macOS 13]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]
- npm version: [e.g., 9.8.0]

## Additional Context
Any other relevant information
```

---

## Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem It Solves
What problem does this feature address?

## Proposed Solution
How should it work?

## Alternatives Considered
Other ways to solve this

## Trinidad & Tobago Context
How does this relate to T&T education system?

## Additional Context
Any other relevant information
```

---

## Development Guidelines

### Trinidad & Tobago Context

When adding features, consider:

- **Schools:** Use real Trinidad & Tobago school names
- **Curriculum:** Focus on CSEC preparation and SEA
- **Names:** Use authentic local names
- **Subjects:** Match T&T educational curriculum
- **Language:** Use UK English spelling

### Accessibility

- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation works
- Maintain good colour contrast
- Test with screen readers when possible

### Performance

- Optimise images and assets
- Minimise bundle size
- Use proper loading states
- Implement pagination for large lists
- Cache API responses appropriately

### Security

- Never commit sensitive data
- Validate all user input
- Use environment variables for secrets
- Sanitise database queries
- Follow OWASP guidelines

---

## Testing

While formal tests aren't required yet, please:

1. **Test manually:**
   - Try all affected features
   - Test on different browsers
   - Test on mobile devices

2. **Check edge cases:**
   - Empty forms
   - Invalid input
   - Long strings
   - Special characters

3. **Verify data persistence:**
   - Reload the page
   - Check database entries

---

## Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Ask in a new issue with "question" label
4. Contact the maintainers

---

## Recognition

All contributors will be recognised in the project README. Thank you for helping improve the Trinidad & Tobago Homework Centre Management System! 🇹🇹

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
