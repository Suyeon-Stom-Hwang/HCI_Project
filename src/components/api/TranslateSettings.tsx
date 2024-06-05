import { Setting } from "../../Contexts";
import prompts from "./Prompts";

function TranslateSetting(setting: Setting | null) {
  if(setting === null) return "";
  const prompt = "Generate an hypothetical" + setting.format + "which has lexile level" + setting.li.toString() + "and ends. The text should contain the following words: " + setting.keywords.join(", ") + ". The keywords may be in different languages, but use the English translations for generation.";
  return prompts(prompt);
}

export default TranslateSetting;