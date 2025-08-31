# Prettier Setup

This project uses Prettier for consistent code formatting across all file types, including Astro files.

## What's Installed

- `prettier` - The core Prettier formatter
- `prettier-plugin-astro` - Plugin for formatting `.astro` files

## Available Scripts

- `pnpm format` - Format all files in the project
- `pnpm format:check` - Check if all files are properly formatted (useful for CI/CD)

## VS Code Integration

The project includes VS Code settings that:
- Set Prettier as the default formatter for all file types
- Enable format on save
- Enable format on paste
- Configure Prettier specifically for Astro files

## Recommended Extensions

Make sure you have these VS Code extensions installed:
- Astro VS Code Extension (`astro-build.astro-vscode`)
- Prettier - Code formatter (`esbenp.prettier-vscode`)

## Configuration Files

- `.prettierrc` - Main Prettier configuration
- `.prettierignore` - Files and directories to exclude from formatting
- `.vscode/settings.json` - VS Code-specific settings

## Usage

1. **Automatic formatting**: Files will be formatted automatically when you save them in VS Code
2. **Manual formatting**: Run `pnpm format` to format all files
3. **Check formatting**: Run `pnpm format:check` to verify all files are properly formatted

## File Types Supported

- `.astro` files (with the Astro plugin)
- JavaScript/TypeScript files
- CSS files
- JSON files
- Markdown files
- And more!

## Excluded from Formatting

The following are excluded from Prettier formatting:
- `node_modules/`
- Build outputs (`dist/`, `.output/`)
- Lock files
- Environment files
- Cache directories
