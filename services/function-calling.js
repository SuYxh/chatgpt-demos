import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { openai } from '../utils/openai-client.js';

dotenv.config();

const QWEATHER_API_KEY = process.env.QWEATHER_API_KEY; // 和风天气 API Key


async function get_weather({ location }) {
  try {
    // 使用 GeoAPI 获取城市的 Location ID
    // 对应开发文档 https://dev.qweather.com/docs/api/geoapi/
    const geoUrl = `https://n336x6y9yf.re.qweatherapi.com/geo/v2/city/lookup?location=${encodeURIComponent(location)}&key=${QWEATHER_API_KEY}`;
    const geoRes = await fetch(geoUrl, { timeout: 5000 });
    if (!geoRes.ok) {
      throw new Error(`GeoAPI请求失败: ${geoRes.status} ${geoRes.statusText}`);
    }

    const geoData = await geoRes.json();
    if (geoData.code !== '200' || !geoData.location || geoData.location.length === 0) {
      return `抱歉，找不到 ${location} 的天气信息`;
    }

    const locationId = geoData.location[0].id;
    console.log('locationId ->', locationId);

    // 使用 Location ID 获取实时天气数据
    // 对应开发文档： https://dev.qweather.com/docs/api/weather/weather-daily-forecast/
    const weatherUrl = `https://n336x6y9yf.re.qweatherapi.com/v7/weather/3d?location=${locationId}&key=${QWEATHER_API_KEY}`;
    const weatherRes = await fetch(weatherUrl, { timeout: 5000 });
    if (!weatherRes.ok) {
      throw new Error(`天气API请求失败: ${weatherRes.status} ${weatherRes.statusText}`);
    }

    const weatherData = await weatherRes.json();
    // console.log('weatherData ->', weatherData); // 打印 weatherData 以进行调试，确保正确获取了天气数据

    if (weatherData.code !== '200') {
      return `获取 ${location} 的天气信息失败，错误码：${weatherData.code}`;
    }

    return weatherData.daily[1];
  } catch (error) {
    console.error('天气查询出错:', error);
    return `获取 ${location} 的天气信息时发生错误：${error.message}`;
  }
}

export async function functionCallingExample() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: '你可以调用用户定义的函数。' },
      { role: 'user', content: '明天北京天气怎么样？' },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "获取城市天气",
          parameters: {
            type: "object",
            properties: {
              location: {
                type: "string",
                description: "城市名称，比如：北京"
              }
            },
            required: ["location"]
          }
        }
      }
    ],
    tool_choice: "auto" // 让模型自动决定是否调用函数
  });

  const message = response.choices[0].message;

  if (message.tool_calls && message.tool_calls.length > 0) {
    const toolCall = message.tool_calls[0];
    console.log('检测到需要函数调用：', JSON.stringify(toolCall, null, 2));

    if (toolCall.function && toolCall.function.name === 'get_weather') {
      const args = JSON.parse(toolCall.function.arguments);
      const result = await get_weather(args);

      // console.log(`\n函数 get_weather 执行结果:`, result);

      // 这里增加一段新的逻辑：把 result 交给模型总结
      const finalResponse = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: '你是一个天气播报员，负责把天气信息转成自然流畅的人类语言。' },
          { role: 'user', content: `帮我根据以下天气数据，总结成一段话：${JSON.stringify(result)}` }
        ],
      });

      const finalMessage = finalResponse.choices[0].message.content;
      console.log('\n最终模型回复：', finalMessage);

    } else {
      console.log(`未识别的函数调用：${toolCall.function?.name}`);
    }
  } else {
    console.log('没有触发函数调用。模型回复内容：', message.content);
  }
}

