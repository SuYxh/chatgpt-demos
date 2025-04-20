// 自动根据任务类型推荐 ChatGPT API 参数的小工具
// 使用 Node.js + ESM

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const taskPresets = {
  '文案创作': {
    model: 'gpt-4o',
    temperature: 0.9,
    presence_penalty: 0.7,
    frequency_penalty: 0.3,
    max_tokens: 1000,
  },
  '技术文档': {
    model: 'gpt-4',
    temperature: 0.3,
    presence_penalty: 0.1,
    frequency_penalty: 0.2,
    max_tokens: 1500,
  },
  '智能客服': {
    model: 'gpt-3.5-turbo',
    temperature: 0.4,
    presence_penalty: 0.1,
    frequency_penalty: 0.3,
    max_tokens: 800,
  },
  '长文总结': {
    model: 'gpt-4o',
    temperature: 0.3,
    presence_penalty: 0.1,
    frequency_penalty: 0.1,
    max_tokens: 3000,
  },
  '创意故事': {
    model: 'gpt-4o',
    temperature: 1.2,
    presence_penalty: 1.0,
    frequency_penalty: 0.2,
    max_tokens: 3000,
  },
  '法律文案': {
    model: 'gpt-4',
    temperature: 0.2,
    presence_penalty: 0.0,
    frequency_penalty: 0.0,
    max_tokens: 2000,
  },
  '代码生成': {
    model: 'gpt-4o',
    temperature: 0.2,
    presence_penalty: 0.0,
    frequency_penalty: 0.2,
    max_tokens: 1500,
  },
  '思维导图': {
    model: 'gpt-4o',
    temperature: 1.3,
    presence_penalty: 1.2,
    frequency_penalty: 0.1,
    max_tokens: 2000,
  },
};

function showOptions() {
  console.log('\n请选择任务类型：');
  Object.keys(taskPresets).forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
  console.log('0. 退出');
}

function recommendParams(taskName) {
  const config = taskPresets[taskName];
  if (!config) {
    console.log('❌ 无效选择！');
    return;
  }
  console.log(`\n✅ 推荐配置：`);
  console.log(JSON.stringify(config, null, 2));
}

function main() {
  showOptions();
  rl.question('\n输入任务编号: ', (answer) => {
    const index = parseInt(answer.trim(), 10);
    const tasks = Object.keys(taskPresets);

    if (index === 0) {
      console.log('👋 再见！');
      rl.close();
      return;
    }

    if (index >= 1 && index <= tasks.length) {
      recommendParams(tasks[index - 1]);
    } else {
      console.log('❌ 请输入有效的编号！');
    }

    rl.close();
  });
}

main();
