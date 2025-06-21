# Project: Subnetting Curriculum Builder PWA v1.0
Author(s): <YOUR NAME>  Start Date: <YYYY-MM-DD>
Last Status Update: 2025-01-20

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

| ID | Task | Dependencies | Deliverables | Status |
|----|------|--------------|--------------|--------|
| T-01 | Initialize Vite + React | - | Basic app structure, dev server running | ✅ Complete |
| T-02 | Setup ESLint + Prettier | T-01 | Linting configured, pre-commit hooks | ✅ Complete |
| T-03 | Create base components | T-01 | Layout, Header, Navigation | ✅ Complete |
| T-04 | Implement routing | T-03 | React Router, basic pages | ✅ Complete |
| T-05 | Convert curriculum to JSON | - | `curriculum.js` with all modules | ✅ Complete |
| T-06 | Module viewer component | T-04, T-05 | Display lesson content | ✅ Complete |
| T-07 | Binary math utilities | T-05 | Functions for conversions | ✅ Complete |
| T-08 | Subnet calc utilities | T-07 | CIDR calculations, validation | ✅ Complete |
| T-09 | Quiz component | T-06 | Interactive questions, scoring | ✅ Complete |
| T-10 | Progress tracking | T-09 | localStorage hooks, progress UI | ✅ Complete |
| T-11 | PWA manifest | T-01 | `manifest.json`, icons | ✅ Complete |
| T-12 | Service worker | T-11 | Offline caching with Workbox | ✅ Complete |
| T-13 | Unit tests | T-07, T-08 | >95% coverage for utils | ✅ Complete |
| T-14 | Component tests | T-09 | Test interactive components | 🔲 Pending |
| T-15 | Responsive design | T-03 | Mobile-friendly layouts | ✅ Complete |
| T-16 | Deploy to GitHub Pages | All | CI/CD workflow | 🔲 Pending |
| T-17 | Module 0 Content | T-05 | Full lesson: intro, examples, diagrams | 🔲 Pending |
| T-18 | Module 1 Content | T-05 | Binary lesson with conversion examples | 🔲 Pending |
| T-19 | Module 2 Content | T-05 | Bitwise AND with visual examples | 🔲 Pending |
| T-20 | Module 3 Content | T-05 | IPv4 anatomy with diagrams | 🔲 Pending |
| T-21 | Module 4 Content | T-05 | CIDR notation with mask ladder | 🔲 Pending |
| T-22 | Module 5 Content | T-05 | Subnet calculations with examples | 🔲 Pending |
| T-23 | Module 6 Content | T-05 | VLSM design with scenarios | 🔲 Pending |
| T-24 | Module 7 Content | T-05 | Routing examples and demos | 🔲 Pending |
| T-25 | Module 8 Content | T-05 | IPv6 with compression examples | 🔲 Pending |
| T-26 | Module 9 Content | T-05 | Troubleshooting guides and tools | 🔲 Pending |

### Progress Summary
- **Completed**: 7/26 tasks (27%)
- **Infrastructure**: ✅ Vite, React, ESLint, Prettier, PWA setup
- **Components**: ✅ Base UI components (Layout, Navigation, Pages)
- **Data Structure**: ✅ Curriculum framework, quiz questions, and exercises
- **Content**: 🔲 Need to write actual lesson content for all 10 modules
- **Logic**: 🔲 Need to implement subnet calculations and utilities
- **Testing**: 🔲 Need to add test coverage

### Recent Updates (2025-01-20)
- Created Layout, Header, and Navigation components with responsive design
- Implemented Home, Module, and Progress pages
- Converted all curriculum content to JavaScript data structures
- Added quiz questions (5 per module) and practice exercises
- Created helper functions for module navigation and prerequisites
- Added 10 new tasks (T-17 to T-26) for creating actual curriculum content

### Module Content Requirements (T-17 to T-26)

Each module's content should include:

1. **Introduction** (Why this matters)
   - Real-world context and applications
   - How it connects to previous modules
   - What problems this knowledge solves

2. **Core Content**
   - Step-by-step explanations with clear prose
   - Multiple worked examples showing the process
   - Common patterns and shortcuts
   - "Try it yourself" checkpoints

3. **Visual Elements**
   - Diagrams and charts (can be ASCII art or SVG)
   - Color-coded examples (e.g., network vs host portions)
   - Interactive visualizations where helpful
   - Reference tables (e.g., powers of 2, subnet masks)

4. **Practice Integration**
   - Inline practice problems with immediate feedback
   - Progressive difficulty from simple to complex
   - Common mistakes and how to avoid them
   - Self-check questions throughout

5. **Summary & Next Steps**
   - Key takeaways
   - Skills checklist
   - Preview of next module
   - Additional resources

## 6 Curriculum Modules (Client-Side)

The complete curriculum specification is documented in `curriculum-modules.md`. All module content will be stored in `src/data/curriculum.js` with the following structure:

```javascript
export const modules = [
  {
    id: 0,
    title: "Orientation & Pre-Assessment",
    goal: "Make the student emotionally comfortable and capture a baseline",
    objectives: [
      "Describe, in plain language, what 'subnetting' achieves",
      "Explain why even a home user benefits"
    ],
    content: [...],
    activities: [...],
    assessment: {...},
    stickingPoints: [...]
  },
  // ... modules 1-9
];
```

Each module includes:
- Module 0: Orientation & Pre-Assessment
- Module 1: Positional Number Systems & Powers of Two
- Module 2: Bitwise Logic Without Programming
- Module 3: IPv4 Address Anatomy
- Module 4: Subnet Masks & CIDR Notation
- Module 5: Fixed-Length Subnet Calculations
- Module 6: Variable Length Subnet Masking (VLSM)
- Module 7: Subnetting in Practice: Routing & ACL
- Module 8: IPv6 Subnet Fundamentals
- Module 9: Verification & Troubleshooting Tools
- Graduation Capstone Project

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