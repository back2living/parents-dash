import {useState} from "react";
import {
    AddMoneyIcon,
    AssignDoCardIcon,
    DollarIcon,
    ProfileIcon, RemoveKidIcon,
    ThreeDotIcon,
} from "@/components/shared/Svg";
import FormModal from "@/components/shared/FormModal";
import AddMoney from "@/components/routes/kids/modal/AddMoney";
import RemoveKid from "@/components/routes/kids/modal/RemoveKid";
import Link from "next/link";
import {IKid} from "@/hooks/useKids";
import Image from "next/image";
import {useSetCurrentKid} from "@/store/kid/kidStore";
import {useClickOutside} from "@/hooks/useClickoutside";
import {useRouter} from "next/router";

const KidCard = ({kid}: {kid: IKid}) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showModal, setShowModal] = useState({points: false, removeKid: false});

    const isModalOpen = showModal.points || showModal.removeKid;

    const handleOpenModal = (modalType: string) => {
        setCurrentKid(kid);
        setShowModal((prevState) => ({...prevState, [modalType]: true}));
        setShowDropdown(false);
    }
    const handleCloseModal = (modalType: string) => {
        setShowModal((prevState) => ({
            ...prevState,
            [modalType]: false,
        }));
    };

    const router = useRouter();

    const handleGoToKidProfile = async () => {
        setCurrentKid(kid);
        await router.push(`/kids/${kid?._id}`);
    };

    const setCurrentKid = useSetCurrentKid();
    const ref = useClickOutside<HTMLDivElement>(() => setShowDropdown(false));

    return (
        <>
            <div onClick={handleGoToKidProfile} className={"kid-card group"}>
                <div className={"group-hover:opacity-70 w-full transition-all duration-300 h-40 rounded-xl overflow-hidden block"}>
                    <Image width={400} height={200} src={kid?.avatar as string} className={"w-full h-full block object-cover"} alt=""/>
                </div>

                <div className={"py-2 px-2 lg:px-3"}>
                    <p className={"text-[#515151] font-semibold"}>{kid?.firstName} {kid?.lastName}</p>
                    <div className={"mt-3 flex-center-between text-[10px] lg:text-xs"}>
                        <p className={"text-primary"}>Bal: <span
                            className={"text-[#868686]"}>{kid?.points?.toLocaleString("en-US")} pts</span>
                        </p>
                        <p className={"flex-center gap-1"}><span>{DollarIcon}</span> <span
                            className={"text-[#868686]"}>{kid?.points?.toLocaleString("en-US")} pts</span></p>
                    </div>
                </div>

                <button onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(prevState => !prevState);
                    setCurrentKid(kid);
                }} className={`kid-info-btn ${showDropdown && "pointer-events-none"}`}>{ThreeDotIcon}</button>
                <div onClick={(e) => e.stopPropagation()} ref={ref} className={`${showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"} kid-info-dropdown`}>
                    <Link onClick={() => setCurrentKid(kid)} href={`/kids/${kid?._id}`}
                          className={"p-1.5 text-primary flex-center gap-1"}><span>{ProfileIcon}</span> View
                        Profile</Link>
                    <button onClick={() => handleOpenModal("points")}
                            className={"p-1.5 text-primary flex-center gap-1"}><span>{AddMoneyIcon}</span> Add Points
                    </button>
                    <Link onClick={() => setCurrentKid(kid)} href={`/kids/${kid?._id}/issue-do-cards`}
                          className={"p-1.5 text-primary flex-center gap-1"}><span>{AssignDoCardIcon}</span> Issue Do Card
                    </Link>
                    <p className={"border-b border-[#ECECEC]"}/>
                    <button onClick={() => handleOpenModal("removeKid")}
                            className={"p-1.5 flex-center gap-1 text-orange"}><span>{RemoveKidIcon}</span> Remove Kid
                    </button>
                </div>
            </div>
            <FormModal isOpen={isModalOpen} style={`lg:w-[550px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl ${showModal?.removeKid && "rounded-b-3xl mb-8 w-[90%] mx-auto"}`}>
                {showModal.points && <AddMoney closeModal={() => handleCloseModal("points")}/>}
                {showModal.removeKid && <RemoveKid closeModal={() => handleCloseModal("removeKid")}/>}
            </FormModal>
        </>
    );
}

export default KidCard;