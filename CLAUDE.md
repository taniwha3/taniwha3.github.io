# Tani's Notebook - Curriculum & Technical Documentation

## Project Structure
- **Music**:
  - **Guitar Curriculum**: 10-year progressive metal guitar curriculum with weekly practice routines
  - **Synthwave Curriculum**: 3-year synthwave production curriculum
  - **Music Theory & Analysis**: Resources for music analysis and theory
  - **Tools**: Interactive music tools (metronome, etc.)
- **Technical Documentation**: Collection of technical guides and notes
- **Practice Log**: Personal tracking of practice sessions and progress

## Commands
- `make serve` - Run the markdown server locally
- `make build` - Generate static HTML site in the `/docs` directory
- `make serve-custom` - Run server on custom port (8081)
- `make clean` - Remove the `/docs` directory
- `make rebuild` - Clean and rebuild the site
- `make update-metronome` - Update the metronome tool with latest changes

## Code Style Guidelines
- **Go**: Standard Go formatting with gofmt
- **Go Imports**: Group standard library, third-party, and local imports
- **Error Handling**: Use explicit error checks with descriptive log messages
- **Naming**: CamelCase for exported functions/variables, lowercase for unexported
- **Comments**: Function/struct comments with purpose description

## Markdown Formatting
- **Headers**: Use ## for year headers, ### for sections
- **Tables**: Maintain consistent column alignment and spacing
- **Code Blocks**: Use ```language for code samples
- **Notes**: Use > for important notes or callouts
- **Links**: Use relative paths for internal links (e.g., `/music/guitar/year1.md`)
- **HTML Conversion**: All .md links are automatically converted to .html in the built site

## Content Guidelines
- **Curriculum Entries**: Year, Week, Song - Artist, Reason for Inclusion
- **Technical Docs**: Clear titles, purpose, overview, implementation details
- **Practice Log**: Date, focus areas, songs practiced, progress notes
- **Consistent Style**: Concise descriptions focused on technique/implementation

## Site Structure
- Content is organized in a hierarchical structure:
  - `/music/guitar/` - All guitar curriculum content
  - `/music/synthwave/` - All synthwave production content
  - `/music/tools/` - Interactive music tools
  - `/music/` - Music theory and analysis
  - `/tech/` - Technical documentation
- Site builds into `/docs` directory with proper navigation
- URLs are automatically converted from `.md` to `.html` when building
- Links between pages use relative paths
- Synthwave aesthetic with responsive design for all devices

## Updating the Metronome Tool

The metronome tool is a React application sourced from the GitHub repo `github.com/taniwha3/metronome` and integrated into the site.

### Workflow Overview

The metronome follows this update workflow:
1. Make changes in the upstream GitHub repo (`github.com/taniwha3/metronome`)
2. Pull the latest changes into the website repo
3. Run the update-metronome task to build and integrate the changes

### Updating from the GitHub Repository

To get the latest version from GitHub:

1. **Pull and Update in One Command**:
   ```sh
   make pull-metronome
   ```
   This command will:
   - Pull the latest changes from GitHub (or clone the repo if it doesn't exist)
   - Automatically build and integrate the metronome

2. **If you prefer separate steps**:
   ```sh
   # First pull the changes
   cd metronome && git pull origin main
   
   # Then build and integrate
   make update-metronome
   ```
   This command will:
   - Install dependencies
   - Build the React application
   - Copy the built assets to the website
   - Update the site

3. **Verify Changes**:
   - Run `make serve` to start the server
   - Visit http://localhost:8080/music/tools/metronome/

### Local Development Workflow

For local development:

1. **Navigate to the metronome directory**:
   ```sh
   cd metronome
   ```

2. **Make changes** to the source files:
   - Main component: `src/App.jsx`
   - UI Controls: `src/components/MetronomeControls.jsx` and `src/components/PolyRhythmControls.jsx`
   - Visual display: `src/components/Visualizer.jsx`

3. **Test locally**:
   ```sh
   npm run dev
   ```
   This will start a development server on port 5173.

4. **When satisfied**, commit changes and push to the GitHub repo:
   ```sh
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

5. **Build and integrate** into the website:
   ```sh
   make update-metronome
   ```

### Notes
- The metronome uses Tone.js for timing and audio
- Data flows one-way from parent components to children
- Styled with styled-components for consistent theming