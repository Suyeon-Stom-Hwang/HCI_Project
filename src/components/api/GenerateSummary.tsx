import prompts from "./Prompts";

const generateSummary = (text: string) => {
  return prompts("Summarize the following text into a three to five words: " + text);
}

export default generateSummary;