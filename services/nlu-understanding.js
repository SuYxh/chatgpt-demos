import { openai } from '../utils/openai-client.js';

// 预定义意图列表，供模型参考
const INTENT_CATEGORIES = [
  "订票",
  "取消订单",
  "查询航班",
  "酒店预订",
  "天气查询",
  "投诉反馈",
  "闲聊",
  "其他"
];

export async function understandIntent(userInput) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: `你是一个意图识别引擎，需要根据用户的输入，从以下意图中选择最匹配的一项返回：

${INTENT_CATEGORIES.map((c, i) => `${i + 1}. ${c}`).join('\n')}

只返回最匹配的意图名称，其他任何内容都不要输出。` },
      { role: 'user', content: userInput },
    ],
  });

  console.log('识别结果：', response.choices[0].message.content.trim());
}