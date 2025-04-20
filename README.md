# ChatGPT Demos

一个基于 Node.js 开发的示例项目，演示如何通过调用 OpenAI 提供的 API 接口实现，支持快速本地部署与测试，适合学习 OpenAI API 调用流程或作为项目开发参考。



## ✨ 功能特点

- ✅ 使用 OpenAI 官方 API 进行聊天问答
- ✅ 聊天功能（Chat Completion）
- ✅ 多轮对话管理（Contextual Dialogue）
- ✅ 信息检索与总结（Summarization & Extraction）
- ✅ 代码理解与生成（Code Understanding & Generation）
- ✅ 支持生成图片（Image Generation）
- ✅ 支持音频文件转文本 （Speech to Text, Whisper）
- ✅ 函数调用（ Function Call）
- ✅ 代码模块清晰，便于二次开发
- ✅ 简单易上手，快速本地测试



## 📦 安装与运行

### 1. 克隆项目

```bash
git clone https://github.com/SuYxh/chatgpt-demos.git
cd chatgpt-demos
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

- 复制 `.env.example` 文件为 `.env`
- 填写你的 OpenAI API 密钥

```bash
cp .env.example .env
```

编辑 `.env`，配置如下内容：

```bash
OPENAI_API_KEY=你的OpenAI密钥
QWEATHER_API_KEY=你的和风天气密钥（可选）
```

### 4. 运行项目

```bash
node index.js
```

终端会显示请求示例和调用结果。



## 🏗️ 项目结构

```bash
├── .env.example         # 环境变量示例
├── .gitignore
├── README.md             # 项目说明文件
├── index.js              # 入口文件，示例调用各个功能
├── package.json          # 项目依赖定义
├── package-lock.json
├── services/             # 封装的服务模块
│   ├── chat.js           # 聊天功能服务
│   ├── image.js          # 图片生成功能服务
│   └── speech.js         # 音频转文本功能服务
├── utils/                # 工具类函数
│   └── request.js        # 封装的 HTTP 请求工具
├── pic.jpg               # 测试用图片（用于生成图片示例）
├── 54321.mp3             # 测试用音频（用于语音转文字示例）
```



## 🛠️ 环境变量说明（`.env`）

| 变量名             | 说明                                    | 是否必填 |
| ------------------ | --------------------------------------- | -------- |
| `OPENAI_API_KEY`   | OpenAI 平台申请的 API 密钥              | 必填     |
| `QWEATHER_API_KEY` | 和风天气平台的 API 密钥（仅部分示例用） | 可选     |



## 📋 示例功能调用

确保你的运行环境支持 ES Modules，比如：

- Node.js 版本 ≥ 14
- `package.json` 中声明了 `"type": "module"`

### 聊天功能（Chat Completion）

```js
import { chat } from './services/chat.js';

const response = await chat('你好，介绍一下你自己');
console.log(response);
```

### 图片生成功能（Image Generation）

```js
import { generateImage } from './services/image.js';

const imageUrl = await generateImage('画一只可爱的猫');
console.log(imageUrl);
```

### 音频转文字功能（Speech to Text）

```js
import { transcribeAudio } from './services/speech.js';

const text = await transcribeAudio('./54321.mp3');
console.log(text);
```



## 📚 依赖说明

- `axios`：用于发送 HTTP 请求
- `form-data`：处理文件上传
- `dotenv`：读取 `.env` 配置
- 其他标准 Node.js 内置模块

## 📌 注意事项

- 本项目仅用于学习和测试，请合理使用 OpenAI API，避免频繁无意义请求导致账号被封。
- 请确保你的 OpenAI API Key 有足够的配额（Quota）。



## 📄 License

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源。


 如果你喜欢这个项目，欢迎点个 ⭐ Star ！