import Link from "next/link";

interface ICardProps {
    count: number;
    img: string;
    text: string;
    textColor: string;
    link?: {name: string, path: string, textColor: string};
}

const Card = ({count, text, img, link, textColor}: ICardProps) => {
    return (
        <div className={"relative w-full sm:min-h-[200px] lg:w-[23%] h-[200px] lg:min-h-[164px] p-6"}>
            <img className={"absolute w-full h-full inset-0 object-cover lg:object-center rounded-[20px]"} src={`/assets/images/${img}`} alt=""/>

            <div style={{color: textColor}} className={"relative text-white font-bold"}>
                <p className={"text-[32px]"}>{count}</p>
                <p>{text}</p>

                {link?.name && <Link style={{color: link.textColor}} href={link.path} className={`mt-4 card-btn card-btn-shadow `}>{link.name}</Link>}
            </div>
        </div>
    )
}

export default Card;