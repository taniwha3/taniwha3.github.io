# Project: Subnetting Curriculum Builder PWA v1.0
Author(s): <YOUR NAME>  Start Date: <YYYY-MM-DD>

## 0 Purpose
Create a Progressive Web App (PWA) for learning IPv4/IPv6 subnetting.
All functionality runs client-side in the browser.

Outputs include:
* Interactive curriculum modules with lessons and exercises
* Auto-graded practice sets with instant feedback
* Progress tracking (using localStorage)
* Offline-capable PWA that can be installed

## 1 Technology Stack
* **Frontend Framework**: React 18+
* **Build Tool**: Vite 5+
* **Styling**: CSS Modules or styled-components
* **PWA**: Workbox for service worker
* **Testing**: Vitest + React Testing Library
* **Linting**: ESLint + Prettier
* **State Management**: React Context API or Zustand
* **Deployment**: GitHub Pages or Netlify

## 2 Project Structure

```
/
├── index.html
├── package.json
├── vite.config.js
├── .eslintrc.cjs
├── .prettierrc
├── public/
│   ├── manifest.json
│   ├── icon-192.png
│   ├── icon-512.png
│   └── robots.txt
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── components/
│   │   ├── Layout/
│   │   ├── Module/
│   │   ├── Quiz/
│   │   └── Progress/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Module.jsx
│   │   └── Progress.jsx
│   ├── data/
│   │   └── curriculum.js
│   ├── utils/
│   │   ├── subnet.js
│   │   ├── binary.js
│   │   └── grading.js
│   ├── hooks/
│   │   ├── useProgress.js
│   │   └── useLocalStorage.js
│   └── service-worker.js
└── tests/
    ├── components/
    └── utils/
```

## 3 Coding Standards

### JavaScript/React
* ES6+ syntax, functional components with hooks
* PropTypes or TypeScript for type safety
* Component files: PascalCase (e.g., `QuizComponent.jsx`)
* Utility files: camelCase (e.g., `subnetCalculator.js`)
* Max line length: 100 characters
* Prettier for formatting, ESLint for linting

### CSS
* CSS Modules for component styling
* BEM naming convention for global styles
* Mobile-first responsive design
* CSS custom properties for theming

### Testing
* Unit tests for all utility functions (>95% coverage)
* Component tests for interactive elements
* Integration tests for key user flows

## 4 Feature List

| ID | Feature | Priority | Description |
|----|---------|----------|-------------|
| F-01 | Module Navigation | High | Browse through 10 curriculum modules |
| F-02 | Interactive Lessons | High | Read content with examples and visualizations |
| F-03 | Practice Exercises | High | Auto-graded problems with instant feedback |
| F-04 | Progress Tracking | High | Save progress locally, show completion % |
| F-05 | Offline Mode | High | Full functionality without internet |
| F-06 | Binary Converter | Med | Interactive tool for decimal ↔ binary |
| F-07 | Subnet Calculator | Med | Visual subnet breakdown tool |
| F-08 | Dark Mode | Low | Toggle between light/dark themes |
| F-09 | Export Progress | Low | Download progress as JSON |
| F-10 | Achievements | Low | Gamification elements |

## 5 Implementation Tasks

| ID | Task | Dependencies | Deliverables |
|----|------|--------------|--------------|
| T-01 | Initialize Vite + React | - | Basic app structure, dev server running |
| T-02 | Setup ESLint + Prettier | T-01 | Linting configured, pre-commit hooks |
| T-03 | Create base components | T-01 | Layout, Header, Navigation |
| T-04 | Implement routing | T-03 | React Router, basic pages |
| T-05 | Convert curriculum to JSON | - | `curriculum.js` with all modules |
| T-06 | Module viewer component | T-04, T-05 | Display lesson content |
| T-07 | Binary math utilities | T-05 | Functions for conversions |
| T-08 | Subnet calc utilities | T-07 | CIDR calculations, validation |
| T-09 | Quiz component | T-06 | Interactive questions, scoring |
| T-10 | Progress tracking | T-09 | localStorage hooks, progress UI |
| T-11 | PWA manifest | T-01 | `manifest.json`, icons |
| T-12 | Service worker | T-11 | Offline caching with Workbox |
| T-13 | Unit tests | T-07, T-08 | >95% coverage for utils |
| T-14 | Component tests | T-09 | Test interactive components |
| T-15 | Responsive design | T-03 | Mobile-friendly layouts |
| T-16 | Deploy to GitHub Pages | All | CI/CD workflow |

## 6 Curriculum Modules (Client-Side)

All module content stored in `src/data/curriculum.js`:

```javascript
export const modules = [
  {
    id: 0,
    title: "Orientation & Pre-Assessment",
    objectives: [...],
    content: [...],
    exercises: [...],
    quiz: [...]
  },
  // ... modules 1-9
];
```

## 7 PWA Requirements

### Manifest
* Name: "Subnet Master"
* Short name: "SubnetPWA"
* Theme color: #2196F3
* Background color: #FFFFFF
* Display: standalone
* Icons: 192x192, 512x512

### Service Worker
* Cache all static assets
* Cache API responses (if any)
* Offline fallback page
* Background sync for progress

### Performance
* Lighthouse score > 90
* First Contentful Paint < 2s
* Time to Interactive < 3s
* Bundle size < 200KB (gzipped)

## 8 Development Workflow

1. `npm install` - Install dependencies
2. `npm run dev` - Start dev server
3. `npm run lint` - Run ESLint
4. `npm run format` - Run Prettier
5. `npm test` - Run tests
6. `npm run build` - Build for production
7. `npm run preview` - Preview production build
8. `npm run deploy` - Deploy to GitHub Pages

## 9 Browser Support
* Chrome/Edge 90+
* Firefox 88+
* Safari 14+
* Mobile browsers (iOS Safari, Chrome Android)

## 10 Accessibility
* WCAG 2.1 AA compliance
* Keyboard navigation
* Screen reader support
* High contrast mode