import prompts from "./Prompts";

const keywordGen = async (keywords: string[], redraw?: boolean, badkey?: string) => {
  const prompt = (redraw && badkey) ? "다음 키워드들과 연관된 키워드를 한 개 뽑아 줘: " + keywords.join(", ") + ". 대신, " + badkey + "와는 덜 연관되도록 해 줘. 출력은 키워드만 줘. "
  : "다음 키워드들과 연관된 키워드를 10개 뽑아 줘: " + keywords.join(", ") + ". 출력은 키워드만 쉼표(,)로 구분해서 줘.";
  const res = await prompts(prompt, "You are a helpful assistant.");
  const hidden_keywords = res.split(",").map((hk) => hk.trim());
  return hidden_keywords;
}

export default keywordGen;