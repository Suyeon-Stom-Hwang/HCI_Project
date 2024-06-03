interface DictionaryPopupProps {
  word: string;
  description: string;
}

export function DictionaryPopup({word, description}: DictionaryPopupProps) {
    return (
      <div className="dictionaryPopup">
        <div className="textSubTitle">{word}</div>
        <div className="textRegular">{description}</div>
      </div>
    )
  }