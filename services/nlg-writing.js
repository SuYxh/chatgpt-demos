import { openai } from '../utils/openai-client.js';

export async function generateShortStory(prompt) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: '你是一个优秀的短篇故事作者,写的内容不超过 100 字' },
      { role: 'user', content: prompt },
    ],
  });

  console.log('生成的故事：', response.choices[0].message.content.trim());
}