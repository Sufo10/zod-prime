# Contributing to zod-prime

We love your input! We want to make contributing to zod-prime as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

1. Fork the repo and create your branch from `main`
2. Install dependencies: `npm install`
3. Run tests in watch mode: `npm run test:watch`
4. Make your changes with proper TypeScript types and JSDoc comments
5. Add tests for any new functionality
6. Run the full test suite with coverage: `npm run test:coverage`
7. Make sure your code lints and formats: `npm run lint && npm run format`
8. Check types with `tsc --noEmit`
9. Create a pull request!

## Code Style

- Use TypeScript strict mode
- Add JSDoc comments for all exported functions and types
- Follow the existing code style (enforced by ESLint and Prettier)
- Keep functions focused and composable
- Maintain type safety without excessive use of `any`

## Testing

- All exports must have test coverage
- Use descriptive test names
- Test both success and error cases
- Include edge cases in tests
- Aim for 80%+ test coverage

## Documentation

- Keep README.md examples up to date
- Document breaking changes
- Include JSDoc comments for public APIs
- Add inline comments for complex logic

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Reference issues and pull requests liberally
- Consider starting the commit message with an applicable emoji:
  - ✨ (sparkles) for new features
  - 🐛 (bug) for fixes
  - 📝 (memo) for documentation
  - ♻️ (recycle) for refactoring
  - 🧪 (test tube) for tests
  - 🎨 (art) for formatting/style
  - ⚡️ (zap) for performance
  - 🔧 (wrench) for configuration
  - ⬆️ (arrow up) for upgrading dependencies
  - ⬇️ (arrow down) for downgrading dependencies

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the version number in package.json following [SemVer](http://semver.org/)
3. Add a description of your changes in CHANGELOG.md
4. The PR may be merged once it has approval and passes CI

## Local Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Run linter
npm run lint

# Format code
npm run format
```

## Pull Request Process

1. Update the README.md with details of changes to the interface
2. Update the version number in package.json following [SemVer](http://semver.org/)
3. Your PR will be merged once you have the sign-off of at least one maintainer

## Any Questions?

Feel free to open an issue for discussion!
