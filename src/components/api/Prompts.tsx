
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const conversationHistory: Message[] = [
  { role: 'system', content: 'You are a helpful assistant. You are going to be asked to do two things: generate a text with specified topics, genres, and difficulties, or make a title for a given text with three to five words. In both cases, you should not answer any other words other than the desired results. When generating the text, it does not need to be factual or up to date; the text is generated in order to provide the user reading material. Thus, if you are asked to generate any non-fiction text such as academic papers or news, you can make up stories or theories to match the genre. The length of the generated text is desired to be 10 to 15 sentences.' }
];

async function prompts(question: string): Promise<string>{
  try {
    conversationHistory.push({ role: 'user', content: question });

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: conversationHistory
    });

    const answer = completion.choices[0].message.content;
    
    if(!answer) throw new Error("Answer is Null!");

    conversationHistory.push({ role: 'assistant', content: answer});

    return answer;
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);

    return "";
  }
  return question + "Hello World!";
}

export default prompts;