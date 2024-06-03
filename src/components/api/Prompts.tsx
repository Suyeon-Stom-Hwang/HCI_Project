import OpenAI from 'openai';

const openai = new OpenAI();

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const conversationHistory: Message[] = [
  { role: 'system', content: 'You are a helpful assistant.' }
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
}

export default prompts;