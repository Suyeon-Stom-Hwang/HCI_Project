import _ from "lodash";
import { Setting } from "../../Contexts";
import { parse } from "./Parse";
import prompts from "./Prompts";

async function TranslateSetting(setting: Setting | null) {

  let word_num: number;


  if(setting === null) return "";
 
  const random_keywords = _.sampleSize(setting.additional_keywords, 3).map((hk) => hk.keyword);
 
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
  console.log(random_keywords);

  const keyword_list = setting.keywords.concat(random_keywords);
  const translate_keyword = "Translate the following keywords in Korean into English. Do not answer anything else than the keywords. Seperate the keywords with a single comma(,). " + keyword_list.join(", ");
  const translated_keywords = await prompts(translate_keyword);

  const prompt = "Generate a "+ word_num + "-word " + setting.format + "which has lexile level " + setting.li.toString() + "and title flanked by < and >. The text should be about the following keywords: " + translated_keywords + "."

  const prompt_result = await prompts(prompt);
  return parse(prompt_result);
}

export default TranslateSetting;