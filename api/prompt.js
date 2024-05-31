import OpenAI from 'openai';

const openai = new OpenAI();

let conversationHistory = [
  { "role": "system", "content": "You are a helpful assistant." }
];



async function prompts(question) {
  try {
    conversationHistory.push({ "role": "user", "content": question });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory
    });

    const answer = completion.choices[0].message.content;

    conversationHistory.push({ "role": "assistant", "content": answer });

    console.log(answer);
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
  }
}


let send_message = 'hello';
prompts(send_message);
