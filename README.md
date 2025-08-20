# Review Launcher

A modern, AI-powered web application that streamlines the process of writing and posting Google Maps reviews for jewelry businesses. The app combines intelligent review template generation with seamless integration to Google Maps review forms.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Components](#components)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Configuration](#configuration)
- [Known Issues](#known-issues)
- [Recommendations](#recommendations)
- [Contributing](#contributing)

## 🎯 Project Overview

Review Launcher is a React-based web application designed to help customers easily generate authentic, personalized Google Maps reviews for supported jewelry businesses. The application features:

- **AI-Powered Review Generation**: Integration with Groq AI for creating natural, business-specific reviews
- **Business Selection**: Support for multiple jewelry businesses with tailored content
- **Staff Recognition**: Optional staff member name integration for personalized reviews
- **Template Management**: Custom review templates with local storage persistence
- **One-Click Review Launch**: Direct integration with Google Maps review forms
- **WhatsApp Sharing**: Built-in functionality to share the app with others

### Key Features

- ⚡ Fast, responsive interface built with React and TypeScript
- 🎨 Modern UI with Tailwind CSS and gradient design
- 🤖 AI-generated reviews using Groq's LLaMA model
- 💾 Local storage persistence for templates
- 📱 Mobile-responsive design
- 🔗 Direct Google Maps integration
- 📢 WhatsApp sharing functionality

## 🏗️ Architecture

The application follows a modular, component-based architecture with clear separation of concerns:

```
src/
├── components/          # React components
│   ├── BusinessSelector.tsx    # Business selection interface
│   ├── StaffSelector.tsx       # Staff name input
│   ├── TemplateManager.tsx     # Review template management
│   ├── ReviewActions.tsx       # Review launch actions
│   └── ShareTool.tsx          # WhatsApp sharing
├── data/               # Static data and types
│   ├── businesses.tsx         # Business definitions
│   └── templates.ts          # Initial review templates
├── services/           # External service integrations
│   └── groq.ts               # Groq AI service
├── App.tsx             # Main application component
├── review-launcher.tsx # Core application logic
└── main.tsx            # Application entry point
```

### Technical Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 3.4.4
- **Icons**: Lucide React 0.539.0
- **AI Integration**: Groq API (LLaMA 3.1 model)
- **Development**: ESLint, Vitest, JSDOM

## 🧩 Components

### BusinessSelector
- **Purpose**: Allows users to select between supported businesses
- **Features**:
  - Grid layout with business icons
  - Visual selection feedback
  - Responsive design for mobile/desktop
- **Props**: `businesses`, `selectedBusiness`, `onSelect`

### StaffSelector
- **Purpose**: Optional staff member name input
- **Features**:
  - Real-time staff name integration
  - Session-only storage (not persisted)
  - Dynamic template preview highlighting

### TemplateManager
- **Purpose**: Core template management and AI generation
- **Features**:
  - AI-powered review generation via Groq
  - Manual template addition/removal
  - Random template selection
  - Staff name integration with highlighting
  - Fallback template generation
- **Key Function**: `integrateStaffName()` for dynamic staff recognition

### ReviewActions
- **Purpose**: Handles the review launch process
- **Features**:
  - Automatic review text copying
  - Google Maps review form opening
  - Success/error feedback
  - Fallback clipboard methods

### ShareTool
- **Purpose**: WhatsApp sharing functionality
- **Features**:
  - Pre-formatted sharing message
  - Direct WhatsApp integration
  - Mobile-optimized sharing

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Groq API key (for AI features)

### Installation

1. **Clone the repository** (if applicable) or navigate to project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and set VITE_GROQ_API_KEY with your Groq API key
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open the application**:
   - Navigate to <http://localhost:5173> in your browser

## 📖 Usage Guide

### Basic Usage

1. **Select Business**: Choose from available jewelry businesses
2. **Add Staff Name** (Optional): Enter the staff member's name for personalized reviews
3. **Choose Template**: Select from existing templates or generate new ones
4. **Launch Review**: Click "Open Review Box" to copy and launch Google Maps

### Advanced Features

#### AI Template Generation
- Click the "AI Generate" button to create custom reviews
- Requires valid Groq API key
- Uses business-specific keywords and context

#### Template Management
- Add custom templates using the "Add" button
- Remove unwanted templates with the trash icon
- Templates persist in browser localStorage

#### Staff Integration
- Staff names are highlighted in templates
- Automatically integrated into review text
- Session-only (not persisted)

## ⚙️ Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Supported Businesses

Currently supports:
- **DDA Jewels**: Gold jewelry specialist
- **Deen Dayal Anand Kumar Saraf**: Silver jewelry specialist

Add new businesses by updating `src/data/businesses.tsx`.

### Template Keywords

Business-specific keywords are defined in `src/services/groq.ts`:
- **Gold**: hallmark gold, bridal sets, purity, certification, craftsmanship
- **Silver**: 925 silver, pure silver, traditional designs, handcrafted

## 🐛 Known Issues

1. **Popup Blockers**: May prevent automatic Google Maps opening
   - *Solution*: Allow popups for the application domain

2. **Clipboard Access**: May fail in some browsers
   - *Solution*: Application includes fallback methods

3. **AI Generation**: Requires valid Groq API key
   - *Solution*: Implement fallback template generation (already implemented)

4. **LocalStorage**: Templates may be lost if browser data is cleared
   - *Solution*: Consider implementing export/import functionality

## 💡 Recommendations

### Code Quality Improvements

1. **Error Handling**: Add more comprehensive error boundaries
2. **Testing**: Expand test coverage beyond BusinessSelector
3. **Performance**: Implement lazy loading for components
4. **Accessibility**: Add ARIA labels and keyboard navigation

### Feature Enhancements

1. **Export/Import**: Allow users to backup/restore templates
2. **Template Categories**: Organize templates by theme or occasion
3. **Review Analytics**: Track usage and success rates
4. **Multi-language**: Support for regional languages

### Security Considerations

1. **API Key Management**: Move to backend service for production
2. **Input Validation**: Add comprehensive sanitization
3. **Rate Limiting**: Implement request throttling for AI generation

### Performance Optimizations

1. **Caching**: Extend cache duration for AI-generated content
2. **Bundle Size**: Code splitting for better loading times
3. **Image Optimization**: Compress and optimize icons
4. **Service Worker**: Implement for offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Submit a pull request

### Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Testing
npm test

# Preview production build
npm run preview
```

## 📄 Additional Scripts

- **Development**: `npm run dev` - Start Vite development server
- **Build**: `npm run build` - Create production build
- **Lint**: `npm run lint` - Run ESLint for code quality
- **Test**: `npm test` - Run test suite with Vitest
- **Preview**: `npm run preview` - Preview production build locally

---

**Built with ❤️ for jewelry businesses**
