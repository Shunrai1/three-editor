# 🍃 数字孪生 - 低代码 - 组态编辑器 🍁

## 📋 项目说明

### 🔧 技术架构

- **前端框架**: Vue 3 + Vite + Element Plus
- **3D 渲染引擎**: Three.js (核心库: three-editor-cores) - 用于编辑器核心功能
- **代码编辑器**: CodeMirror 6 - 在线代码编辑运行
- **数据存储**: IndexedDB (本地浏览器存储)
- **部署方式**: 纯静态前端项目，部署在 GitHub Pages
- **是否有后端**: ❌ 无后端，所有资源通过静态文件服务访问

### ✨ 前端功能模块

#### 1. 🎨 三维低代码编辑器 (/editor)

- **左侧资源面板**：
  - 🏗️ 3D 模型库管理（GLB/FBX/OBJ 格式）
  - 🌌 天空盒/环境贴图管理
  - 🔤 3D 文字/字体资源
  - 🖼️ 图片/贴图资源
  - 🎬 视频纹理资源
- **中央场景编辑区**：
  - 实时 3D 场景渲染
  - 模型拖拽放置
  - 场景交互操作
- **右侧属性面板**：
  - 对象属性编辑
  - 变换控制（位置/旋转/缩放）
  - 材质参数配置
- **功能特性**：
  - 场景数据本地保存/加载（IndexedDB）
  - 场景导出/导入（JSON 格式）
  - 动画编辑（GSAP/曲线动画）
  - 事件系统

#### 2. 💻 在线代码运行 (/codeMirror)

- CodeMirror 编辑器集成
- JavaScript 代码实时预览
- Three.js 代码在线编写和运行

#### 3. 📚 功能案例展示 (/example)

- **Three.js 案例**：着色器学习、模型加载、动画效果

---

## 📁 项目结构

```
three-editor-dev/
├── src/                    # 源代码目录
│   ├── editor/            # 三维编辑器核心模块
│   │   ├── left/          # 左侧资源面板组件
│   │   ├── scene.vue      # 场景渲染组件
│   │   ├── leftPanel.vue  # 左侧面板容器
│   │   ├── rightPanel.vue # 右侧属性面板
│   │   ├── indexDb.js     # IndexedDB数据存储
│   │   └── config.js      # 资源配置（可配置本地/远程资源路径）
│   ├── codeMirror/        # 在线代码编辑器模块
│   ├── example/           # 案例展示页面
│   ├── codes/             # 案例代码库
│   │   ├── threejs/       # Three.js案例
│   │   └── threeEditor/   # 编辑器使用案例
│   ├── router/            # 路由配置
│   └── main.js            # 应用入口
├── dist/                   # 生产环境打包输出
├── docs/                   # VitePress文档站点
├── public/                 # 静态资源文件
│   └── files/             # 编辑器资源库
│       ├── resource/      # 3D模型文件
│       ├── scene/         # 天空盒/环境贴图
│       ├── editorJson/    # 预设场景配置
│       ├── font/          # 字体文件
│       ├── channels/      # 通道贴图
│       └── video/         # 视频资源
└── vite.config.js         # Vite构建配置

```

## 🛠️ 本地开发

### 环境要求

- Node.js 18+ （推荐 20.9.0）
- pnpm（推荐）或 npm

### 安装依赖

```bash
pnpm install
# 或
npm install
```

### 启动开发服务器

```bash
pnpm start
# 或
npm run start
```

访问 http://localhost:7070

### 构建生产版本

```bash
pnpm build
# 或
npm run build
```

### 配置本地资源

若想连接自己本地资源，目录结构需与 `public/files/` 目录结构一致，在 `src/editor/config.js` 中配置：

```javascript
localStorage.setItem(
  "dev_local_server_url",
  "http://localhost:7070/three-editor/files"
);
```
