import { Setting } from "../../Contexts";
import prompts from "./Prompts";

function TranslateSetting(setting: Setting | null) {
  if(setting === null) return "";
  const prompt = "Generate an hypothetical" + setting.format + "about" + setting.keywords[0] + "which has lexile level" + setting.li.toString() + "and ends.";
  return prompts(prompt);
}

export default TranslateSetting;