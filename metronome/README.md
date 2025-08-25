# Metronomicon

A progressive metal metronome for complex rhythmic structures. Features polyrhythms, polymeter, tempo maps, and sample-accurate timing via Web Audio API.

## Features

- 🎵 **Simple & Advanced Modes** - Basic metronome or full timeline editor
- 🔊 **Polyrhythm Support** - Layer multiple rhythm patterns with visual alignment
- 📊 **Tempo Maps** - Create complex tempo progressions bar by bar
- 🎹 **Multiple Click Sounds** - Click, accent, woodblock, cowbell, hi-hat, rimshot
- 🎨 **Synthwave UI** - Dark theme with neon accents
- 💾 **Project Persistence** - Auto-save to localStorage, import/export JSON
- ⌨️ **Keyboard Shortcuts** - Space to play/stop, Ctrl+D for debug mode

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Deploy

For GitHub Pages deployment, uncomment and set the base path in `vite.config.ts`:

```typescript
base: '/your-repo-name/',
```

## Usage

### Simple Mode
- Adjust tempo with the dial (20-400 BPM)
- Select time signature
- Tap tempo for quick BPM detection
- Press Space or click Play to start

### Advanced Mode
- Create tempo map with multiple bars
- Each bar can have unique tempo and time signature
- Drag to reorder bars
- Visual tempo curve display

### Polyrhythm Editor
- Add multiple rhythm layers
- Each layer has subdivision pattern
- Visual alignment display shows how rhythms interact
- Mute individual layers
- Adjust velocity per beat

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (requires user interaction for audio unlock)
- iOS Safari: Tap play button to unlock audio context

## Known Limitations

- iOS/Safari requires user interaction to start audio
- Maximum polyrhythm complexity limited to prevent overflow
- Tempo range: 20-400 BPM
- Time signatures: numerator 1-16, denominator 2/4/8/16/32

## Architecture

- **React** - UI framework with hooks
- **TypeScript** - Type safety
- **Web Audio API** - Sample-accurate timing
- **Vite** - Build tool
- **CSS Variables** - Theming

## Performance Optimizations

- React.memo for heavy components
- useCallback for event handlers
- Canvas rendering with device pixel ratio support
- Microsecond precision for polyrhythm calculations
- Debug mode for development (localStorage.setItem('DEBUG', 'true'))

## Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests: `npm test`
4. Commit your changes
5. Push to the branch
6. Open a Pull Request

## License

Apache V2
