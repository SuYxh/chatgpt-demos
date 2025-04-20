# ChatGPT Demos

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 项目简介

这是一个基于 Node.js 和 OpenAI API 构建的 ChatGPT 演示项目。它展示了如何利用 OpenAI 的强大功能来实现多种 AI 应用，包括自然语言处理、代码生成、对话管理、图像理解和语音转文本等。

本项目旨在提供一个清晰、易于理解的示例，帮助开发者快速学习 OpenAI API 的调用方式，或将其作为二次开发的基础。

## ✨ 功能特点

本项目集成了 OpenAI 的多种核心能力：

- **🤖 智能对话 (Chat Completion):** 基于 `gpt-3.5-turbo` 或 `gpt-4` 等模型进行流畅的自然语言交互。 (`services/nlg-writing.js`)
- **🧠 多轮对话记忆 (Contextual Dialogue):** 能够记住之前的对话内容，进行有上下文的交流。 (`services/dialogue-memory.js`)
- **💡 自然语言理解 (NLU):** 理解用户意图，提取关键信息。 (`services/nlu-understanding.js`)
- **📝 文本摘要与信息提取 (Summarization & Extraction):** 快速总结长文本或提取特定信息。 (`services/summarization.js`)
- **💻 代码生成与理解 (Code Generation & Understanding):** 根据需求生成代码片段或解释现有代码。 (`services/code-generation.js`)
- **🖼️ 图像生成 (Image Generation - DALL·E):** 根据文本描述生成图像。 (需要确认具体实现文件)
- **👁️ 图像理解 (Vision - GPT-4 Vision):** 理解并描述图片内容。 (`services/vision-image-understanding.js`)
- **🗣️ 语音转文本 (Speech to Text - Whisper):** 将音频文件转换为文字。 (`services/audio-to-text.js`)
- **🔧 函数调用 (Function Calling):** 让模型能够调用外部工具或 API（例如查询天气）。 (`services/function-calling.js`)
- **🧩 模块化设计:** 代码结构清晰，各功能模块独立，方便扩展和维护。
- **⚡ 快速上手:** 提供简单的安装和运行步骤，可在本地快速部署测试。

## 🛠️ 技术栈

- **后端:** Node.js
- **核心 AI 服务:** OpenAI API (ChatGPT, DALL·E, Whisper, Function Calling)
- **包管理器:** npm

## 📁 项目结构

```
.
├── .env.example            # 环境变量示例文件
├── .gitignore              # Git 忽略配置
├── README.md               # 项目说明文档
├── index.js                # 项目入口文件
├── package-lock.json       # 依赖版本锁定
├── package.json            # 项目依赖与脚本配置
├── services/               # 核心 AI 功能模块
│   ├── audio-to-text.js
│   ├── code-generation.js
│   ├── dialogue-memory.js
│   ├── function-calling.js
│   ├── nlg-writing.js
│   ├── nlu-understanding.js
│   ├── summarization.js
│   └── vision-image-understanding.js
└── utils/                  # 工具类函数
    ├── openai-client.js    # OpenAI API 客户端封装
    └── params-select.js    # (推测) 参数选择相关工具
```

## 📦 安装与运行

请确保你的开发环境已安装 Node.js (推荐 v18 或更高版本) 和 npm。

### 1. 克隆项目

```bash
git clone https://github.com/your-repo/chatgpt-demos.git # 请替换为你的仓库地址
cd chatgpt-demos
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

- 复制 `.env.example` 文件并重命名为 `.env`：
  ```bash
  cp .env.example .env
  ```
- 编辑 `.env` 文件，填入必要的 API 密钥：

  ```dotenv
  # .env 文件内容
  OPENAI_API_KEY=sk-YourOpenAI_API_Key_Here # 必需：你的 OpenAI API 密钥
  QWEATHER_API_KEY=YourQWeather_API_Key_Here # 可选：和风天气 API 密钥 (用于 Function Calling 示例)
  ```
  *   `OPENAI_API_KEY`: **必需**。请前往 [OpenAI Platform](https://platform.openai.com/api-keys) 获取。
  *   `QWEATHER_API_KEY`: **可选**。如果你想测试 Function Calling 调用天气查询功能，请前往 [和风天气开放平台](https://dev.qweather.com/) 注册并获取。

### 4. 启动项目

```bash
node index.js
```

程序启动后，你将看到交互提示，根据提示输入内容即可与 AI 进行互动，体验不同的功能。

## ⚙️ 环境变量说明

- `OPENAI_API_KEY`: 用于访问 OpenAI 服务的 API 密钥。**必须配置**。
- `QWEATHER_API_KEY`: 和风天气的 API 密钥，用于 Function Calling 功能中的天气查询示例。**可选配置**。

## 🤝 贡献指南

欢迎对本项目做出贡献！如果你有任何改进建议或发现了 Bug，请：

1.  Fork 本仓库
2.  创建新的特性分支 (`git checkout -b feature/AmazingFeature`)
3.  提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  将分支推送到你的 Fork (`git push origin feature/AmazingFeature`)
5.  提交 Pull Request

请确保代码风格一致，并尽可能添加注释或说明。

## 📄 License

本项目采用 [MIT License](LICENSE) 授权。 （如果还没有 LICENSE 文件，建议添加一个）

## 📌 注意事项

- 本项目主要用于学习和演示目的，请遵守 OpenAI 的使用政策，合理使用 API。
- 确保你的 OpenAI 账户有足够的额度 (Quota) 来支持 API 调用。
- API Key 属于敏感信息，请妥善保管，切勿泄露或直接提交到版本控制系统。

---

*如有问题，欢迎提出 Issue。*