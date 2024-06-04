import prompts from "./Prompts";

const generateSummary = (text: string) => {
  return prompts("Give a title for the following text with three to five words: " + text);
}

export default generateSummary;