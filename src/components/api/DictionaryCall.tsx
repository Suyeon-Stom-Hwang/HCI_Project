import prompts from "./Prompts";
import { DictionaryItem } from "../MainPage";

const example = (word: string) => `
다음 단어에 대해 아래와 같은 형식으로 예시 없이 뜻을 설명해 줘: `+word+`. 품사, 뜻, 뜻에 대한 설명 순서로 적어주고, 품사와 뜻은 느낌표(!)로 구분해 줘. 입력은 답변에 포함하지 말아 줘.

입력: singularity

명사!

특이점!

일반적인 상태나 규칙에서 벗어난 특수한 상태나 성질.

입력: carnivorous

형용사!

육식의!

음식으로 고기를 먹는.
`;

const dictionaryCall = async (word: string): Promise<DictionaryItem> => {
  const result = await prompts(example(word), "You are a helpful assistant.");
  console.log(result);
  const description_slices = result.trim().split("!");
  return {word: word, description: [description_slices[0].trim(), description_slices[1].trim(), description_slices.slice(2).join(" ")]};
}

export default dictionaryCall;