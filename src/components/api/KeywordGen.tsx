import prompts from "./Prompts";

const keywordGen = async (keywords: string[]) => {
  const prompt = "다음 키워드들과 연관된 키워드를 10개 뽑아 줘: " + keywords.join(", ") + ". 출력은 키워드만 쉼표(,)로 구분해서 줘.";
  const res = await prompts(prompt, "You are a helpful assistant.");
  const hidden_keywords = res.split(",").map((hk) => hk.trim());
  return hidden_keywords;
}

export default keywordGen;