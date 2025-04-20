import { openai } from '../utils/openai-client.js';

export async function generateCode(taskDescription) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: '你是一个资深前端工程师' },
      { role: 'user', content: `请帮我用 JavaScript 实现以下功能：\n${taskDescription}` },
    ],
  });

  console.log('生成的代码：\n', response.choices[0].message.content.trim());
}