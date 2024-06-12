
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});
/*
interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
*/
async function prompts(question: string): Promise<string>{
  try {

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a text generator which for English learner. Do not answer my question. Just generate reading text and use only English.' },
        { role: 'user', content: question }],
      max_tokens: 4095
    });

    const answer = completion.choices[0].message.content;
    
    if(!answer) throw new Error("Answer is Null!");

    return answer;
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);

    return "";
  }
  return question + "Hello World!";
}

export default prompts;