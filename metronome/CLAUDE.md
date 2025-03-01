# CLAUDE.md - Metronome Project

Repository: https://github.com/taniwha3/metronome

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- Project doesn't have test commands

## Code Style
- **Framework**: React 19 with functional components and hooks
- **Styling**: styled-components with consistent naming and structure
- **Imports**: React first, styled-components next, third-party libs, then local components
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Components**: Styled components at top, component logic in middle, export at bottom
- **Props**: Destructured in function parameters, use $ prefix for styled-component props
- **Formatting**: 2-space indentation, no trailing commas
- **Error Handling**: Try/catch for audio operations, defensive context state checks
- **State**: useState for local state, clean useEffect with proper cleanup
- **Audio**: Tone.js for audio generation and scheduling

Keep audio contexts properly initialized and disposed to prevent memory leaks.