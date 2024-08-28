interface INoData {
    image: string;
    text: string;
}
const NoData = ({image, text}: INoData) => {
    return (
        <div className={"mt-6 bg-primary gap-4 flex-column items-center justify-center rounded-3xl h-[180px] lg:h-[200px]"}>
            <img src={image} className={"w-16 h-16 lg:w-20 lg:h-20"} alt=""/>
            <p className={"font-semibold text-primary"}>{text}</p>
        </div>
    );
};

export default NoData;