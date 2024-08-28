import {CloseIcon, SelectedCategoryIcon} from "@/components/shared/Svg";
import {IDoCard} from "@interfaces/DoCardInterfaces";
import {useUpdateDoCard} from "@hooks/useDocards";
import {useCurrentKid} from "@store/kid/kidStore";
import ModalTop from "@components/shared/ModalTop";
import {useState} from "react";
import {useDebounce} from "@hooks/useDebounce";
import axios from "axios";
import {IPexelImage} from "@components/routes/kids/kid/do-cards/DoCardGoalForm";
import {useQuery} from "@tanstack/react-query";
import Button from "@components/shared/Button";

const EditDoCardModal = ({doCard, closeModal}: {doCard: IDoCard; closeModal: () => void}) => {
    const currentKid = useCurrentKid();
    const [query, setQuery] = useState("shoe");
    const [purpose, setPurpose] = useState(doCard.purpose);
    const [points, setPoints] = useState(doCard.points);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<null | number>(null);
    const [selectedImage, setSelectedImage] = useState<null | IPexelImage>(null);

    const debouncedQuery = useDebounce(query, 250);
    const getPhotos = async () => {
        const {data} = await axios.get(`https://api.pexels.com/v1/search?query=${debouncedQuery?.toLowerCase()}&per_page=80`, {
            headers: {
                Authorization: "nzYGrTDyyXsS0bxfmLiSfWwDa4yZ4NnLKvzIJeItYq5LAhqZjqJrRghF"
            }
        });
        return data?.photos;
    }

    const {data, isPending} = useQuery({
        queryKey: ["getPixelPhotos", debouncedQuery],
        queryFn: getPhotos,
        enabled: !!debouncedQuery
    });

    const isValid = !!(purpose && points && (selectedImage || doCard.avatar));
    const {isPending: isUpdatePending, mutate} = useUpdateDoCard(closeModal);

    const handleSubmitDoCard = () => {
        mutate({
            doCardId: doCard?._id,
            isMandatory: false,
            type: "goal",
            kidId: currentKid?._id,
            points: +points,
            purpose,
            avatar: selectedImage?.src?.original || doCard.avatar
        });
    }

    return (
        <div>
            <ModalTop title={"Edit do-card goal"} Icon={CloseIcon} closeModal={closeModal} />
            <div className={"modal-content"}>
                <div className={"flex-column gap-6 mt-6"}>
                    <div>
                        <label className="auth-label">Purpose</label>
                        <input value={purpose} onChange={e => setPurpose(e.target.value)} className={"auth-input"} type="text" placeholder={"Buy a Shoe"}/>
                    </div>
                    <div>
                        <label className="auth-label">Image Keywords</label>
                        <input
                            value={query} onChange={e => setQuery(e.target.value)}
                            className={"auth-input text-xs"}
                            type="text"
                        />
                        <p className={"text-[#00D47E] font-bold text-xs mt-2 border border-dashed p-3 border-[#00D47E]"}>Please
                            use a keyword when searching the images. Examples include Bag, Shoes, Dress, Hat, Computer,
                            Phone, etc</p>

                    </div>

                    <div className={"w-full"}>
                        <label className="auth-label">Select Image</label>
                        {isPending && <div className={"rounded-3xl bg-primary p-1 flex-center overflow-x-auto gap-2"}>
                            {Array.from({length: 7})?.map(((_, index: number) => {
                                return <div key={index}
                                            className={`relative min-w-[150px] max-w-[200px] bg-gray-300 animate-pulse h-[120px] ${index === 0 && "rounded-l-3xl"}`}/>
                            }))}
                        </div>}

                        {!isPending && <div className={"rounded-3xl bg-primary p-1 flex-center overflow-x-auto gap-2"}>
                            {data?.map(((item: any, index: number, array: []) => {
                                const lastItemIndex = array?.length - 1;
                                const lastItem = lastItemIndex === index;
                                return <div onClick={() => {
                                    setSelectedImage(item);
                                    setSelectedCategoryIndex(index);
                                }} key={item.img} className="relative min-w-[150px] max-w-[200px] h-[120px]">
                                    {selectedCategoryIndex === index &&
                                        <span className={"absolute top-2 right-2"}>{SelectedCategoryIcon}</span>}
                                    <img
                                        className={`w-full h-full object-cover ${index === 0 ? "rounded-l-3xl" : lastItem ? "rounded-r-3xl" : ""}`}
                                        src={item.src?.medium} alt={item.alt}/>
                                </div>
                            }))}
                        </div>}
                    </div>
                    <div>
                        <label className="auth-label">Target Points</label>
                        <input
                            value={points}
                            onChange={e => setPoints(+e.target.value)}
                            className={"auth-input"}
                            type="text"
                            placeholder={"e.g 100"}
                        />
                    </div>
                </div>
                <div className={"flex gap-6 mt-10"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button isValid={isValid} isLoading={isUpdatePending} handleClick={handleSubmitDoCard} name={"Edit do-card goal"}/>
                </div>
            </div>
        </div>
    );
};

export default EditDoCardModal;