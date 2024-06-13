import { Setting } from "../../Contexts";
import { prompts } from "./Prompts";

function TranslateSetting(setting: Setting | null) {

  let word_num: number;


  if(setting === null) return "";
 
 
  switch(setting.li) {
    case 100:
      word_num = 50;
      break;
    case 300:
      word_num = 150;
      break;  
    case 500:
      word_num = 300;
      break; 
    case 700:
      word_num = 400;
      break;
    case 900:
      word_num = 600;
      break;
    case 1100:
      word_num = 800;
      break;
    case 1500:
      word_num = 1000;
      break;
    default:
      word_num = 500;
  }

  const prompt = "Generate a "+ word_num + "-word " + setting.format + "which has lexile level " + setting.li.toString() + "and title flanked by <>. The text should contain the following words in English: " + setting.keywords.join(", ") + "."

  return prompts(prompt);
}

export default TranslateSetting;