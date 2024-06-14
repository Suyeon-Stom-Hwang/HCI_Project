import prompts from "./Prompts";
import { DictionaryItem } from "../MainPage";

const example = `
위 단어에 대해 아래와 같은 형식으로 예시 없이 뜻을 설명해 줘.

singularity

명사!

특이점!

일반적인 상태나 규칙에서 벗어난 특수한 상태나 성질.
`;

const dictionaryCall = async (word: string): Promise<DictionaryItem> => {
  const result = await prompts(word + example, "You are a helpful assistant.");
  const ix = result.indexOf(word);
  const description_slices = result.slice(ix + word.length).trim().split("!");
  console.log(description_slices);
  return {word: word, description: [description_slices[0].trim(), description_slices[1].trim(), description_slices.slice(2).join(" ")]};
}

export default dictionaryCall;