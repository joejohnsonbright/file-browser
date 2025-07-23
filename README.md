# BrightHR Front End Task - Joe Johnson

## Development Setup

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Open Vitest UI
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run a11y` - Run accessibility tests (requires server running)
- `npm run a11y:dev` - Run accessibility tests on dev server
- `npm run ci:local` - Run all checks locally
- `npm run pre-commit-full` - Full pre-commit with tests
- `npm run prepare` - Set up Husky git hooks

## Git Workflow & Commit Conventions

This project enforces standardized commit messages through git hooks and GitHub Actions.

### Commit Message Rules

All commits must follow conventional commit format: `type(scope): description`

**Required commit types:**

- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Reverting commits

**Examples:**

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login form validation"
git commit -m "test: add unit tests for utils"
git commit -m "feat(auth): add password reset functionality"
```

### Pull Request Title Rules

Pull request titles are automatically validated and **must follow the same conventional commit format**:

## CI/CD Pipeline

GitHub Actions automatically run on all pull requests to `main`:

### Required Checks

- **Code Formatting** - Prettier format validation
- **Linting** - ESLint code quality checks
- **Unit Tests** - Full test suite with coverage
- **Accessibility Testing** - pa11y a11y compliance
- **Build Verification** - Successful production build
- **PR Title Validation** - Conventional commit format

## API Mocking

This project uses **Mock Service Worker (MSW)** for API mocking during development and testing:

- **Development**: MSW intercepts network requests in the browser using a Service Worker
- **Testing**: MSW provides a mock server for consistent test environments
- **Mock Data**: Stored in `src/data/files.json` and served via `/api/files` endpoint

### Usage

```javascript
// Making API calls (same in development and production)
const response = await fetch('/api/files');
const data = await response.json();
```

MSW automatically activates in development mode and provides realistic API responses without requiring a backend server.

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities
- **MSW** - API mocking for development and testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **pa11y** - Accessibility testing
