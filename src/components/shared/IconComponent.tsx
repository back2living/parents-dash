import EmojiPicker from "emoji-picker-react";
import {Dispatch, SetStateAction, useState} from "react";

type IconComponentType = {
    setEmoji: Dispatch<SetStateAction<string>>;
    emoji: string;
}
const IconComponent = ({setEmoji,  emoji}: IconComponentType) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <label className={"auth-label text-primary"} htmlFor="">Category Icon</label>
            <button onClick={() => setIsOpen(!isOpen)} className={"auth-input text-secondary"}>{!emoji ? "Select Icon" : emoji}</button>
            <EmojiPicker className={"mt-1.5"} onEmojiClick={(e) => {
                setEmoji(e.emoji)
                setIsOpen(false);
            }} open={isOpen}/>
        </div>
    );
};

export default IconComponent;