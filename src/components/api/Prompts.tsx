
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

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

async function generateImage(prompt: string): Promise<string> {
  
  const maxPromptLength = 300; // Define a maximum length for the prompt

  // Trim the prompt if it exceeds the maximum length
  if (prompt.length > maxPromptLength) {
    prompt = prompt.substring(0, maxPromptLength);
  }
  
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "256x256"
    });

    console.log('OpenAI Image Generation Response:', response);

    if (!response || !response.data || response.data.length === 0) {
      throw new Error("No image generated!");
    }

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error("No URL found for generated image");
    }

    return imageUrl;
  } catch (error) {
    console.error('Error generating image with OpenAI:', error);
    return "";
  }
}

export { prompts, generateImage };
