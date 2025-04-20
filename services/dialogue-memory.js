import { openai } from '../utils/openai-client.js';

export async function continueConversation(history, userInput) {
  const messages = [
    ...history,
    { role: 'user', content: userInput },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: messages,
  });

  console.log('AI 回答：', response.choices[0].message.content.trim());
  return messages.concat({ role: 'assistant', content: response.choices[0].message.content.trim() });
}
