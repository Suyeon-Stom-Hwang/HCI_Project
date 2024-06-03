import { ReactNode, createContext, useContext, useState } from "react";

const generateId = () => {
  let counter = 1;
  return function () {
    return counter++;
  }
};

const generateSettingId = generateId();

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

export type SettingContextData = {
  settings: Setting[];
  getSettingById: (id: number) => Setting | null;
  addSetting: (setting: SettingInput) => Setting | null;
};

const SettingContext = createContext<SettingContextData>({
  settings: [],
  getSettingById: () => null,
  addSetting: () => null
});

export function SettingProvider({ children }: { children: ReactNode }) {
  const [ settings, setSettings ] = useState<Setting[]>([]);
  const getSettingById = (id: number) => {
    return settings.find((setting: Setting) => setting.id === id) || null;
  };
  const addSetting = (setting: SettingInput) => {
    const newSetting = {id: generateSettingId(), name: setting.name, keywords: setting.keywords, format: setting.format, li: setting.li, custom: setting.custom};
    setSettings([newSetting, ...settings]);
    return newSetting;
  };

  return (
    <SettingContext.Provider
      value={{
        settings,
        getSettingById,
        addSetting
      }}
    >
      {children}
    </SettingContext.Provider>
  )
}

export const useSettingContext = () => useContext(SettingContext);