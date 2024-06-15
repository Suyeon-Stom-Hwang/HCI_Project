import './css/Sidebar.css'

import newSetting from "../assets/newSetting.svg"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useContexts } from "@/Contexts";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ReactNode } from 'react';

interface SettingBlockProps {
  image: string;
  isSelected: boolean
  children: ReactNode;
}

interface SidebarProps {
  isSettings: boolean;
}

interface HistoryBlockProps {
  index: number;
  text: string;
  isSelected: boolean;
}

function HistoryBlock({index, text, isSelected=true}: HistoryBlockProps) {
  let className = 'historyBlock';
  if (isSelected) {
    className += ' historyBlockSelected'; 
  }

  return (
    <div className={className} id={index.toString()}>
      {text}
    </div>
  )
}

function SettingBlock({image, isSelected, children}: SettingBlockProps) {
  let className = 'settingBlock ';
  if (isSelected) {
    className += 'settingBlockSelected';
  }

  return (
    <div className={className}>
      <div className='settingBlockIcon'><img src={image}/></div>
      <div className='settingBlockText textTitle'>{children}</div>
    </div>
  )
}

const Sidebar = ({isSettings}: SidebarProps) => {
  const { setSetting, currentSetting, getHistoryById, setMainText } = useContexts();
  const navigate = useNavigate();

  const handleSettingClick = (id: number) => () => {
    setSetting(id);
    navigate("/");
  }

  const handleHistoryClick = (id: number) => () => {
    const history = getHistoryById(id);
    if(history !== null) {
      setMainText({title: history.title, sentences: history.text});
    }
  }
  
  let historyBlock = (<div></div>)
  let blockHeight = '832px'
  const { settings, histories } = useContexts();

  if (isSettings == false) {
    blockHeight = '400px'
    historyBlock = (
      <div>
        <div className='sideBarTitle textViewTitle'>History</div>
        <ScrollArea className="h-[432px] w-[400px] p-[20px]">
          <div>
            {
              histories.map((history) => {
                const isSelected = false;
                
                return (<div onClick={handleHistoryClick(history.id)} key={"clickdiv-"+history.id.toString()}>
                  <HistoryBlock text={history.title.replace("<", "").replace(">", "")} index={history.id} isSelected={isSelected} key={history.id}/>
                </div>);
              })
            }
          </div>
        </ScrollArea>
      </div>
    )
  }

  const selectedSetting = currentSetting();
  const isNewSettingSelected = useLocation().pathname == "/settings/0";

  return (
    <>
      <div className='sectionBorderOnlyBottom'>
        <div className='sideBarTitle textViewTitle'>Setting</div>
        {
          <ScrollArea className={"h-[" + blockHeight + "] w-[400px]"}>
          <Link to={"/settings/0"}>
            <SettingBlock isSelected={isNewSettingSelected} image={newSetting}>Add new setting</SettingBlock>
          </Link>
            {
              settings.map((setting) => {
                const isSelected = (selectedSetting?.id === setting.id);

                return (
                <div onClick={handleSettingClick(setting.id)} key={"clickdiv-"+setting.name}>
                  <SettingBlock isSelected={!isNewSettingSelected && isSelected} image="">{setting.name}</SettingBlock>
                </div>
                )
              })
            }
          </ScrollArea>
        }
      </div>
      {historyBlock}
    </>
  )
}

export default Sidebar;