import { openai } from '../utils/openai-client.js';

export async function summarizeText(text) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: '你是一个专业的文档摘要助手' },
      { role: 'user', content: `请帮我总结以下内容：\n${text}` },
    ],
  });

  console.log('摘要内容：', response.choices[0].message.content.trim());
}