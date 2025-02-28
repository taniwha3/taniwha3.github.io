# Tani's Notebook - Curriculum & Technical Documentation

## Project Structure
- **Music**:
  - **Guitar Curriculum**: 10-year progressive metal guitar curriculum with weekly practice routines
  - **Synthwave Curriculum**: 3-year synthwave production curriculum
  - **Music Theory & Analysis**: Resources for music analysis and theory
- **Technical Documentation**: Collection of technical guides and notes
- **Practice Log**: Personal tracking of practice sessions and progress

## Commands
- `go run main.go` - Run the markdown server locally
- `go run main.go build` - Generate static HTML site in the `/site` directory
- `go run main.go -port=8081` - Run server on custom port (default: 8080)

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
  - `/music/` - Music theory and analysis
  - `/tech/` - Technical documentation
- Site builds into `/site` directory with proper navigation
- URLs are automatically converted from `.md` to `.html` when building
- Links between pages use relative paths
- Synthwave aesthetic with responsive design for all devices