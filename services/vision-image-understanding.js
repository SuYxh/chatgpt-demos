// services/vision-image-understanding.js
import { openai } from '../utils/openai-client.js';
import fs from 'fs';

export async function analyzeImage(imagePath, question) {
  const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
  const dataUrl = `data:image/jpeg;base64,${imageBase64}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: '你是一个专业图像分析助手' },
      {
        role: 'user',
        content: [
          { type: 'text', text: question },
          { type: 'image_url', image_url: { url: dataUrl } }
        ],
      },
    ],
  });

  console.log('图片分析结果：', response.choices[0].message.content.trim());
}
