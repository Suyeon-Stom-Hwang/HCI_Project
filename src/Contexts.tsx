import { ReactNode, createContext, useContext, useState } from "react";
import generateSummary from "./components/api/GenerateSummary";

const generateId = () => {
  let counter = 1;
  return function () {
    return counter++;
  }
};

const generateSettingId = generateId();
const generateHistoryId = generateId();

export type Setting = {
  name: string;
  keywords: string[];
  format: string;
  li: number;
  custom: boolean;
  id: number;
};

export type SettingInput = {
  name: string;
  keywords: string[];
  format: string;
  li: number;
  custom: boolean;
};

export type MainPage = {
  image: string;
  text: string;
}

export type History = {
  page: MainPage;
  summary: string;
  id: number;
}

export type HistoryInput = {
  page: MainPage;
  summary: string;
}

export type Format = {
  formatEN: string;
  formatKR: string;
}

export type ContextData = {
  settings: Setting[];
  currentSetting: () => Setting | null;
  getSettingById: (id: number) => Setting | null;
  addSetting: (setting: SettingInput) => Setting | null;
  changeSetting: (setting: SettingInput, id: number) => Setting | null;
  setSetting: (id: number) => Setting | null;
  removeKeyword: (idx: number, id?: number) => Setting | null;
  changeFormat: (format: string, id?: number) => Setting | null;
  getPredefinedFormats: () => Format[];
  
  histories: History[];
  addHistory: (history: HistoryInput) => History | null;
  addHistoryByPage: (page: MainPage) => Promise<History> | null;
  getHistoryById: (id: number) => History | null;
  splayHistory: (id: number) => History | null;

  mainPageText: MainPage;
  setMainText: (image: string, text: string) => MainPage | null;
};

const Context = createContext<ContextData>({
  settings: [],
  currentSetting: () => null,
  getSettingById: () => null,
  addSetting: () => null,
  changeSetting: () => null,
  setSetting: () =>  null,
  removeKeyword: () => null,
  changeFormat: () => null,
  getPredefinedFormats: () => [],
  histories: [],
  addHistory: () => null,
  addHistoryByPage: () => null,
  getHistoryById: () => null,
  splayHistory: () => null,
  mainPageText: {image: "", text: ""},
  setMainText: () => null
});

const defaultSetting: Setting = {
  name: "test",
  keywords: ["인공지능", "컴퓨터", "언어"],
  format: "news",
  li: 80,
  custom: false,
  id: 100
};

const formats: Format[] = [
  {formatEN: "news", formatKR: "뉴스"},
  {formatEN: "fiction", formatKR: "소설"},
  {formatEN: "academicPaper", formatKR: "논문"}
];

export function ContextProvider({ children }: { children: ReactNode }) {
  const [ settings, setSettings ] = useState<Setting[]>([defaultSetting]);
  const [ currentId, setCurrentId ] = useState(100);
  const [ histories, setHistories ] = useState<History[]>([]);
  const [ mainPageText, setMainPageText ] = useState<MainPage>({image: "", text: ""});
  const getSettingById = (id: number) => {
    return settings.find((setting: Setting) => setting.id === id) || null;
  };
  const addSetting = (setting: SettingInput) => {
    const newSetting = {id: generateSettingId(), name: setting.name, keywords: setting.keywords, format: setting.format, li: setting.li, custom: setting.custom};
    setSettings([newSetting, ...settings]);
    setCurrentId(newSetting.id);
    return newSetting;
  };
  const changeSetting = (setting: SettingInput, id: number) => {
    if(!getSettingById(id)) return null;
    const newSetting = {id: id, name: setting.name, keywords: setting.keywords, format: setting.format, li: setting.li, custom: setting.custom};
    setSettings([newSetting, ...settings.filter((setting) => setting.id !== id)]);
    setCurrentId(id);
    return newSetting;
  }
  const setSetting = (id: number) => {
    if(!getSettingById(id)) return null;
    setCurrentId(id);
    return getSettingById(id);
  }
  const currentSetting = () => {
    const foundSetting = getSettingById(currentId);
    return foundSetting?foundSetting:null
  }
  const removeKeyword = (idx: number, id: number = currentId) => {
    const foundSetting = getSettingById(id);
    if(foundSetting === null) return null;
    if(foundSetting.keywords.length <= idx) return null;
    const newSetting = {
      name: foundSetting.name,
      format: foundSetting.format,
      li: foundSetting.li,
      custom: foundSetting.custom,
      keywords: foundSetting.keywords.filter((s, i) => i !== idx)
    }
    return changeSetting(newSetting, id);
  }
  const changeFormat = (format: string, id: number = currentId) => {
    const foundSetting = getSettingById(id);
    if(foundSetting === null) return null;
    const newSetting = {
      name: foundSetting.name,
      format: format,
      li: foundSetting.li,
      custom: foundSetting.custom,
      keywords: foundSetting.keywords,
    }
    return changeSetting(newSetting, id);
  }
  const getPredefinedFormats = () => formats;

  const addHistory = (history: HistoryInput) => {
    const newHistory = {id: generateHistoryId(), page: history.page, summary: history.summary};
    setHistories([newHistory, ...histories]);
    return newHistory;
  }
  const addHistoryByPage = async (page: MainPage) => {
    const summary = await generateSummary(page.text);
    return addHistory({page: page, summary: summary});
  }
  const getHistoryById = (id: number) => {
    return histories.find((history: History) => history.id === id) || null;
  }
  const splayHistory = (id: number) => {
    const topHistory = getHistoryById(id);
    if(topHistory === null) return null;
    setHistories([topHistory, ...histories.filter((history) => history.id !== topHistory.id)]);
    return topHistory;
  }

  const setMainText = (image: string, text: string) => {
    const newPage = {image: image, text: text};
    setMainPageText(newPage);
    return newPage;
  }

  return (
    <Context.Provider
      value={{
        settings,
        currentSetting,
        getSettingById,
        addSetting,
        changeSetting,
        setSetting,
        removeKeyword,
        changeFormat,
        getPredefinedFormats,
        histories,
        addHistory,
        addHistoryByPage,
        getHistoryById,
        splayHistory,
        mainPageText,
        setMainText
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContexts = () => useContext(Context);