// 新版入口 index.js - CLI 菜单版 ✨+ 彩色输出 + 动画 + 执行时间统计
import { understandIntent } from './services/nlu-understanding.js';
import { generateShortStory } from './services/nlg-writing.js';
import { continueConversation } from './services/dialogue-memory.js';
import { summarizeText } from './services/summarization.js';
import { generateCode } from './services/code-generation.js';
import { functionCallingExample } from './services/function-calling.js';
import { analyzeImage } from './services/vision-image-understanding.js';
import { transcribeAudio } from './services/audio-to-text.js';
import readline from 'readline';
import chalk from 'chalk';
import ora from 'ora';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function withLoading(task) {
  const spinner = ora('⏳ 执行中...').start();
  const start = Date.now();

  try {
    await task();
    const end = Date.now();
    spinner.succeed(chalk.green(`✅ 完成，用时 ${(end - start) / 1000}s\n`));
  } catch (error) {
    spinner.fail(chalk.red(`❌ 执行失败: ${error.message}`));
  }
}

async function main() {
  console.log(chalk.cyan(`\n🧠 ChatGPT 能力演示菜单：\n`));
  console.log(chalk.yellow(`1. 自然语言理解（意图识别）`));
  console.log(chalk.yellow(`2. 自然语言生成（短篇故事）`));
  console.log(chalk.yellow(`3. 多轮对话记忆`));
  console.log(chalk.yellow(`4. 信息总结`));
  console.log(chalk.yellow(`5. 代码生成`));
  console.log(chalk.yellow(`6. Function Calling 调用`));
  console.log(chalk.yellow(`7. 图片理解 (Vision)`));
  console.log(chalk.yellow(`8. 音频转文字 (Whisper)`));
  console.log(chalk.red(`0. 退出`));

  rl.question(chalk.cyan('\n请选择功能编号：'), async (answer) => {
    switch (answer.trim()) {
      case '1':
        await withLoading(() => understandIntent('我想预定五一飞往杭州的航班'));
        break;
      case '2':
        await withLoading(() => generateShortStory('写一个关于勇敢小狗的温暖故事'));
        break;
      case '3': {
        let history = [];
        await withLoading(async () => {
          history = await continueConversation(history, '你好');
          history = await continueConversation(history, '你喜欢什么食物？');
          history = await continueConversation(history, '我之前的问题是什么？');
        });
        break;
      }
      case '4':
        await withLoading(() => summarizeText('ChatGPT 是由美国人工智能研究公司OpenAI开发的一款基于大规模语言模型的对话生成系统，属于 GPT系列的重要应用之一。自 2022 年 11 月正式发布以来，它凭借强大的自然语言处理能力和交互性，迅速成为全球关注的焦点。ChatGPT基于 Transformer 架构构建，一种擅长处理序列数据（如文本）的深度学习模型，通过 “自注意力机制” 捕捉文本中的长距离依赖关系，能高效处理上下文语义。其训练数据涵盖互联网级别的海量文本（书籍、网页、对话等），早期版本（如 GPT-3）参数量达数百亿级，后续版本（如 GPT-4）进一步提升至万亿级，显著增强了逻辑推理、多模态理解等能力。'));
        break;
      case '5':
        await withLoading(() => generateCode('使用 js 写一个快排函数'));
        break;
      case '6':
        await withLoading(() => functionCallingExample());
        break;
      case '7':
        await withLoading(() => analyzeImage('./pic.jpg', '图片中有什么？'));
        break;
      case '8':
        await withLoading(() => transcribeAudio('./54321.mp3'));
        break;
      case '0':
        console.log(chalk.green('👋 再见！'));
        rl.close();
        return;
      default:
        console.log(chalk.red('❌ 无效输入，请输入数字 0-8'));
        break;
    }

    rl.close();
  });
}

main();
