# Tani's Notebook

> Created on: 2025-02-27 | Last Updated: 2025-03-01

Personal website and learning curriculum tracking.

## Development

Prerequisites:
- Go 1.21+
- Node.js 20+ (for the metronome tool)

### Local Development

Run the local server:
```sh
make serve
```

Or with a custom port:
```sh
make serve-custom
```

### Building the Site

Generate the static site:
```sh
make build
```

Clean and rebuild:
```sh
make rebuild
```

### Updating the Metronome Tool

When changes are made to the metronome tool, run:
```sh
make update-metronome
```

This will:
1. Install dependencies and build the metronome app
2. Copy the built assets to the correct location
3. Rebuild the website

## Deployment

The site is built to the `docs/` directory for GitHub Pages hosting.

1. Make changes to markdown files
2. Run `make build` to generate the static site
3. Commit and push changes

## Server Usage

The server can be run directly with additional flags:

- `-port`: Change the server port (default: 8080)
  ```sh
  go run main.go -port 3000
  ```

- `-dir`: Change the content directory (default: current directory)
  ```sh
  go run main.go -dir ./content
  ```

## Content Structure

- `/music/guitar/` - Progressive metal guitar curriculum
- `/music/synthwave/` - Synthwave production curriculum
- `/music/tools/` - Music tools (metronome, etc.)
- `/tech/` - Technical documentation
- `/practice_log.md` - Daily practice tracking