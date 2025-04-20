// services/audio-to-text.js
import { openai } from '../utils/openai-client.js';
import fs from 'fs';

export async function transcribeAudio(audioPath) {
  const response = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioPath),
    model: 'whisper-1'
  });

  console.log('音频转文字结果：', response.text);
}
