import { Setting } from "../../Contexts";
import prompts from "./Prompts";

function TranslateSetting(setting: Setting | null) {
  return prompts(String(setting)); // TODO
}

export default TranslateSetting;