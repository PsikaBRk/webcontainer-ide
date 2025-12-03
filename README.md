# WebContainer IDE MVP

一个基于 WebContainer 技术的在线 IDE，类似 CodeSandbox 的 MVP 实现。

## 功能特性

✅ **WebContainer 运行环境**
- 完整的浏览器内 Node.js 环境
- 支持 npm install 和 npm run dev
- 实时文件系统同步

✅ **动态文件系统**
- 文件树实时展示
- 右键菜单：新建文件/文件夹、删除
- 自动监听文件变化（如 build 产物）
- 点击文件打开编辑

✅ **Monaco 编辑器**
- 多标签页支持
- 语法高亮（JS/JSX/TS/TSX/CSS/HTML/JSON）
- 自动保存到 WebContainer

✅ **实时预览**
- iframe 预览窗口
- 自动连接 Vite dev server
- 支持 HMR 热更新

✅ **交互式终端**
- 基于 xterm.js 的专业终端
- 支持命令输入和执行
- 实时显示输出（彩色高亮）
- 可拖拽调整大小

## 技术栈

- **前端框架**: React 18 + Vite
- **编辑器**: Monaco Editor
- **终端**: xterm.js + FitAddon
- **布局**: react-resizable-panels
- **状态管理**: Zustand
- **样式**: TailwindCSS
- **核心引擎**: @webcontainer/api
- **图标**: Lucide React

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 打开浏览器

访问 `http://localhost:5173`

**重要**: WebContainer 需要特定的 HTTP 头才能工作，Vite 配置已经包含了必要的 COOP/COEP 头。

## 项目结构

```
src/
├── editor/
│   └── Editor.tsx          # Monaco 编辑器组件
├── preview/
│   └── Preview.tsx         # 预览面板组件
├── ui/
│   ├── FileTree.tsx        # 文件树组件
│   └── Terminal.tsx        # 终端组件
├── webcontainer/
│   ├── webcontainer.ts     # WebContainer API 封装
│   ├── template.ts         # 默认项目模板
│   └── init.ts             # 初始化逻辑
├── store/
│   └── useStore.ts         # Zustand 状态管理
├── App.tsx                 # 主应用组件
├── main.tsx                # 入口文件
└── index.css               # 全局样式
```

## 工作流程

1. **启动**: 应用加载时自动初始化 WebContainer
2. **挂载**: 将默认的 Vite + React 模板挂载到虚拟文件系统
3. **缓存检测**: 检查是否已安装依赖（避免重复安装）
4. **安装**: 使用 `pnpm install` 快速安装依赖（仅首次）
5. **运行**: 执行 `pnpm run dev` 启动 Vite 开发服务器
6. **预览**: 捕获服务器 URL 并在 iframe 中显示
7. **编辑**: 用户编辑文件时自动同步到 WebContainer
8. **更新**: Vite HMR 自动刷新预览

## 性能优化

- ✅ **pnpm 包管理器**: 比 npm 快 2-3 倍
- ✅ **依赖缓存**: 检测 node_modules 存在则跳过安装
- ✅ **自动保存**: 编辑器内容自动同步到 WebContainer

## 交互功能

- ✅ **可拖拽面板**: 所有面板都可以拖拽调整大小
- ✅ **交互式终端**: 可以直接输入命令（如 `ls`, `cat package.json`, `pnpm add lodash` 等）
- ✅ **多标签编辑**: 同时打开多个文件
- ✅ **实时预览**: 编辑后自动热更新
- ✅ **文件操作**: 
  - 右键文件/文件夹 → 新建、删除
  - 顶部工具栏快速新建
  - 自动刷新文件树（每 2 秒）
  - 支持 `npm run build` 后自动显示 dist 目录

## 默认模板

内置了一个简单的 Vite + React 项目模板：

- `package.json` - 项目配置
- `index.html` - HTML 入口
- `vite.config.js` - Vite 配置
- `src/main.jsx` - React 入口
- `src/App.jsx` - 主组件（带计数器示例）
- `src/App.css` - 组件样式
- `src/index.css` - 全局样式

## 浏览器要求

WebContainer 需要以下浏览器特性：

- SharedArrayBuffer 支持
- Cross-Origin Isolation (COOP/COEP)
- 现代浏览器（Chrome 84+, Edge 84+, Safari 15.2+）

## 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 注意事项

1. **首次加载较慢**: WebContainer 需要下载和初始化，首次加载可能需要几秒钟
2. **npm install 时间**: 依赖安装需要时间，请耐心等待终端输出
3. **浏览器兼容性**: 确保使用支持 SharedArrayBuffer 的现代浏览器
4. **HTTPS 要求**: 生产环境部署需要 HTTPS 和正确的 COOP/COEP 头

## License

MIT
