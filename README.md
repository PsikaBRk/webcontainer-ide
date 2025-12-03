# WebContainer IDE

> A full-featured, browser-based IDE powered by WebContainer. Run Node.js, install packages, and build applications entirely in your browser—no backend required.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff)](https://vitejs.dev/)

## 🎯 Overview

WebContainer IDE is a production-ready, browser-based development environment that brings the full power of Node.js to your browser. Built on StackBlitz's WebContainer technology, it enables developers to code, build, and preview applications without any server infrastructure.

### Key Capabilities

- ✅ **Full Node.js Runtime** - Execute Node.js code natively in the browser
- ✅ **Package Management** - Install npm/pnpm packages with intelligent caching
- ✅ **Live Development** - Hot module replacement with instant preview updates
- ✅ **Professional Editor** - Monaco Editor with IntelliSense and multi-language support
- ✅ **Interactive Terminal** - Full-featured xterm.js terminal with 10,000 line buffer
- ✅ **Dynamic File System** - Real-time file operations with automatic synchronization
- ✅ **Resizable Workspace** - Fully customizable panel layout with drag-to-resize
- ✅ **Zero Configuration** - Works out of the box with sensible defaults

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or **pnpm** 8+
- **Modern Browser** with SharedArrayBuffer support:
  - Chrome/Edge 84+
  - Safari 15.2+
  - Firefox 89+ (with specific flags)

### Installation

```bash
# Clone the repository
git clone https://github.com/Sunny-117/webcontainer-ide.git
cd webcontainer-ide

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:5173` to access the IDE.

### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser Window                            │
├───────────────┬──────────────────────────┬──────────────────────┤
│   File Tree   │    Code Editor           │   Live Preview       │
│               │                          │                      │
│  📁 src/      │  ┌────────────────────┐  │  ┌─────────────────┐ │
│  📁 public/   │  │  Monaco Editor     │  │  │   iframe        │ │
│  📄 package   │  │  - IntelliSense    │  │  │   (Vite HMR)    │ │
│  📁 node_mod  │  │  - Syntax HL       │  │  │   localhost:*   │ │
│               │  │  - Auto-save       │  │  └─────────────────┘ │
│               │  └────────────────────┘  │                      │
│               ├──────────────────────────┤                      │
│               │   Terminal (xterm.js)    │                      │
│               │   ➜ ~ pnpm install       │                      │
│               │   ➜ ~ pnpm run dev       │                      │
└───────────────┴──────────────────────────┴──────────────────────┘
                              ↓
                ┌──────────────────────────┐
                │   WebContainer API       │
                │   - Virtual File System  │
                │   - Node.js Runtime      │
                │   - Process Management   │
                └──────────────────────────┘
```

### Component Architecture

```
src/
├── editor/
│   └── Editor.tsx              # Monaco editor integration
│       - Multi-tab support
│       - Auto-save to WebContainer
│       - Language detection
│       - Syntax highlighting
│
├── preview/
│   └── Preview.tsx             # Live preview iframe
│       - Dev server connection
│       - Auto-refresh on changes
│       - Port forwarding
│
├── ui/
│   ├── FileTree.tsx            # File system tree view
│   │   - Context menu (create/delete)
│   │   - Real-time sync (2s polling)
│   │   - Drag-to-expand folders
│   │
│   └── Terminal.tsx            # Interactive terminal
│       - xterm.js integration
│       - Command execution
│       - 10k line scrollback
│       - Auto-scroll to command
│
├── webcontainer/
│   ├── webcontainer.ts         # WebContainer API wrapper
│   ├── init.ts                 # Initialization & boot logic
│   ├── template.ts             # Default Vite+React template
│   ├── fileWatcher.ts          # File system monitoring
│   ├── fileOperations.ts       # CRUD operations
│   └── terminalManager.ts      # Terminal instance manager
│
├── store/
│   └── useStore.ts             # Zustand global state
│       - File tree state
│       - Open files tracking
│       - Terminal output
│       - Preview URL
│
└── App.tsx                     # Main application layout
    - Panel management (react-resizable-panels)
    - Component orchestration
```

## 🛠️ Technology Stack

### Core Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 18.2 | UI framework |
| **Language** | TypeScript | 5.2 | Type safety |
| **Build Tool** | Vite | 5.0 | Fast dev server & bundler |
| **Runtime** | WebContainer API | 1.1.9 | Browser-based Node.js |

### UI & Components

| Library | Purpose |
|---------|---------|
| **@monaco-editor/react** | Code editor (VS Code engine) |
| **xterm** + addons | Terminal emulator |
| **react-resizable-panels** | Draggable panel layout |
| **@radix-ui** | Accessible UI primitives (context menu, dialog) |
| **lucide-react** | Icon library |
| **TailwindCSS** | Utility-first styling |

### State & Data

| Library | Purpose |
|---------|---------|
| **zustand** | Lightweight state management |
| **WebContainer FS** | Virtual file system |

## 📖 Usage Guide

### File Operations

**Create File/Folder:**
- Right-click in file tree → "New File" or "New Folder"
- Or use toolbar buttons at the top of file tree

**Delete:**
- Right-click on file/folder → "Delete"
- Confirmation dialog will appear

**Edit:**
- Click any file to open in Monaco Editor
- Changes auto-save to WebContainer

### Terminal Commands

The terminal supports all standard shell commands:

```bash
# List files
ls

# View file contents
cat package.json

# Install packages
pnpm install
pnpm add lodash

# Run scripts
pnpm run dev
pnpm run build

# File operations
mkdir components
touch components/Button.tsx
```

### Live Preview

1. Run `pnpm run dev` in terminal
2. Wait for "Dev server ready!" message
3. Preview automatically loads in right panel
4. Edit files → Changes reflect instantly via HMR

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save file (auto-save enabled) |
| `Ctrl/Cmd + /` | Toggle comment |
| `Ctrl/Cmd + F` | Find in file |
| `Ctrl + C` | Cancel running command |

## ⚙️ Configuration

### Customize Default Template

Edit `src/webcontainer/template.ts`:

```typescript
export const defaultTemplate: FileSystemTree = {
  'package.json': {
    file: {
      contents: JSON.stringify({
        name: 'my-custom-project',
        dependencies: {
          'react': '^18.2.0',
          // Add your dependencies
        }
      }, null, 2)
    }
  },
  'src': {
    directory: {
      'main.tsx': {
        file: { contents: '// Your code here' }
      }
    }
  }
};
```

### Terminal Configuration

Modify `src/ui/Terminal.tsx`:

```typescript
const xterm = new XTerm({
  fontSize: 14,           // Font size
  scrollback: 10000,      // History buffer
  cursorBlink: true,      // Blinking cursor
  theme: {
    background: '#0a0a0a',
    foreground: '#d4d4d4',
    // Customize colors
  }
});
```

### File Watcher Interval

Adjust polling frequency in `src/webcontainer/fileWatcher.ts`:

```typescript
watchFileSystem((tree) => {
  setFileTree(tree);
}, 2000); // Change interval (ms)
```

## 🚢 Deployment

### Vercel

1. Import repository to Vercel
2. Build settings:
   - **Build Command:** `pnpm build`
   - **Output Directory:** `dist`
3. Add environment headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "require-corp"
        },
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        }
      ]
    }
  ]
}
```

### Netlify

1. Connect repository
2. Build settings:
   - **Build Command:** `pnpm build`
   - **Publish Directory:** `dist`
3. Create `_headers` file in `public/`:

```
/*
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
```

### Custom Server (Nginx)

```nginx
location / {
    add_header Cross-Origin-Embedder-Policy "require-corp";
    add_header Cross-Origin-Opener-Policy "same-origin";
    try_files $uri $uri/ /index.html;
}
```

## ⚡ Performance Optimizations

### Implemented

- **Dependency Caching** - Detects existing `node_modules`, skips reinstall
- **pnpm** - 2-3x faster than npm for package operations
- **File System Polling** - 2-second interval balances responsiveness and performance
- **Lazy Component Loading** - Components load on-demand
- **Virtual Scrolling** - Efficient rendering of large file trees
- **Debounced Auto-save** - Reduces unnecessary writes

### Benchmarks

| Operation | Time |
|-----------|------|
| Initial boot | ~2s |
| pnpm install (cached) | <1s |
| pnpm install (fresh) | 10-30s |
| File save | <100ms |
| HMR update | <500ms |

## 🔒 Security & Limitations

### Browser Requirements

WebContainer requires specific browser features:

- **SharedArrayBuffer** - For multi-threading support
- **Cross-Origin Isolation** - COOP/COEP headers must be set
- **Modern JavaScript** - ES2020+ support

### Limitations

- **Memory Constraints** - Limited by browser memory (typically 2-4GB)
- **No Native Modules** - Cannot use Node.js native addons (C++ modules)
- **Network Restrictions** - CORS applies to external API requests
- **File System Isolation** - Cannot access local file system
- **Performance** - Slower than native Node.js for CPU-intensive tasks

### Security Features

- ✅ Sandboxed execution environment
- ✅ No access to local file system
- ✅ Isolated from host system
- ✅ CORS-protected network requests

## 🗺️ Roadmap

### Planned Features

- [ ] **Collaboration** - Multi-user editing with Yjs
- [ ] **Git Integration** - Commit, push, pull via isomorphic-git
- [ ] **Extension System** - Plugin architecture for custom tools
- [ ] **Theme Customization** - Light/dark themes + custom colors
- [ ] **Keyboard Shortcuts** - Configurable keybindings
- [ ] **Debugging** - Breakpoints and step-through debugging
- [ ] **Multiple Terminals** - Tab-based terminal management
- [ ] **File Upload/Download** - Import/export project files
- [ ] **Search & Replace** - Global find/replace across files
- [ ] **Project Templates** - Gallery of starter templates

### Under Consideration

- [ ] AI-powered code completion
- [ ] Integrated testing framework
- [ ] Performance profiling tools
- [ ] Mobile-responsive layout
- [ ] Offline mode with service workers

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/Sunny-117/webcontainer-ide.git
cd webcontainer-ide

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run type checking
pnpm tsc --noEmit
```

### Contribution Guidelines

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Use TypeScript for all new code
- Follow existing code style (Prettier/ESLint)
- Add comments for complex logic
- Update README if adding features

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This project is built on the shoulders of giants:

- **[WebContainer](https://webcontainers.io/)** by StackBlitz - Browser-based Node.js runtime
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** by Microsoft - VS Code's editor engine
- **[xterm.js](https://xtermjs.org/)** by SourceLair - Terminal emulator for the web
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI components
- **[Vite](https://vitejs.dev/)** by Evan You - Next-generation frontend tooling
- **[React](https://react.dev/)** by Meta - UI library

## 📞 Support & Community

- 📖 **Documentation** - [GitHub Wiki](https://github.com/Sunny-117/webcontainer-ide/wiki)
- 🐛 **Bug Reports** - [Issue Tracker](https://github.com/Sunny-117/webcontainer-ide/issues)
- 💬 **Discussions** - [GitHub Discussions](https://github.com/Sunny-117/webcontainer-ide/discussions)
- 🌟 **Star** the project if you find it useful!

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Sunny-117/webcontainer-ide?style=social)
![GitHub forks](https://img.shields.io/github/forks/Sunny-117/webcontainer-ide?style=social)
![GitHub issues](https://img.shields.io/github/issues/Sunny-117/webcontainer-ide)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Sunny-117/webcontainer-ide)

---

<div align="center">

**Built with ❤️ using WebContainer technology**

[⬆ Back to Top](#webcontainer-ide)

</div>
