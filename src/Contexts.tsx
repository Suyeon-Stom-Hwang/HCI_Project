import { ReactNode, createContext, useContext, useState } from "react";

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

export type History = {
  text: string;
  summary: string;
  id: number;
}

export type HistoryInput = {
  text: string;
  summary: string;
}

export type SettingContextData = {
  settings: Setting[];
  currentSetting: () => Setting | null;
  getSettingById: (id: number) => Setting | null;
  addSetting: (setting: SettingInput) => Setting | null;
  changeSetting: (setting: SettingInput, id: number) => Setting | null;
  setSetting: (id: number) => Setting | null;
};

const SettingContext = createContext<SettingContextData>({
  settings: [],
  currentSetting: () => null,
  getSettingById: () => null,
  addSetting: () => null,
  changeSetting: () => null,
  setSetting: () =>  null
});

export type HistoryContextData = {
  histories: History[];
  
}

export function SettingProvider({ children }: { children: ReactNode }) {
  const [ settings, setSettings ] = useState<Setting[]>([]);
  const [ currentId, setCurrentId ] = useState(0);
  const getSettingById = (id: number) => {
    return settings.find((setting: Setting) => setting.id === id) || null;
  };
  const addSetting = (setting: SettingInput) => {
    const newSetting = {id: generateSettingId(), name: setting.name, keywords: setting.keywords, format: setting.format, li: setting.li, custom: setting.custom};
    setSettings([newSetting, ...settings]);
    return newSetting;
  };
  const changeSetting = (setting: SettingInput, id: number) => {
    if(!getSettingById(id)) return null;
    const newSetting = {id: id, name: setting.name, keywords: setting.keywords, format: setting.format, li: setting.li, custom: setting.custom};
    setSettings([newSetting, ...settings.filter((setting) => setting.id !== id)]);
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

  return (
    <SettingContext.Provider
      value={{
        settings,
        currentSetting,
        getSettingById,
        addSetting,
        changeSetting,
        setSetting
      }}
    >
      {children}
    </SettingContext.Provider>
  )
}

export const useSettingContext = () => useContext(SettingContext);