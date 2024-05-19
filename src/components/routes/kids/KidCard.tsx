import React, {useState} from 'react';
import {
    AddMoneyIcon,
    AssignDoCardIcon,
    AssignTaskIcon,
    DollarIcon,
    ProfileIcon, RemoveKidIcon,
    ThreeDotIcon, WithdrawIcon
} from "@/components/shared/Svg";
import FormModal from "@/components/shared/FormModal";
import AddMoney from "@/components/routes/kids/modal/AddMoney";
import Task from "@/components/routes/kids/modal/Task";
import DoCard from "@/components/routes/kids/modal/DoCard";
import RemoveKid from "@/components/routes/kids/modal/RemoveKid";
import Link from "next/link";

const styles = ""
const KidCard = ({item}: {item: any}) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showModal, setShowModal] = useState({points: false, doCard: false, task: false, removeKid: false});

    const isModalOpen = showModal.points || showModal.doCard || showModal.task || showModal.removeKid;

    const handleOpenModal = (modalType: string) => {
        setShowModal((prevState) => ({...prevState, [modalType]: true}));
        setShowDropdown(false);
    }
    const handleCloseModal = (modalType: string) => {
        setShowModal((prevState) => ({
            ...prevState,
            [modalType]: false,
        }));
    };

    return (
        <>
            <div style={{boxShadow: "0px 8px 24px 0px rgba(17, 17, 17, 0.11)"}} className={"relative bg-[#F7F7F7] rounded-xl w-full lg:w-[18%] lg:max-w-[250px] group"}>
                {/*<div className={"bg-[#E8E5FA] group-hover:opacity-70 transition-all duration-300 h-40 flex items-end rounded-xl overflow-hidden"}>*/}
                {/*    <img src={item.img} className={"w-[80%] mx-auto block object-cover"} alt=""/>*/}
                {/*</div>*/}
                <div className={"group-hover:opacity-70 w-full transition-all duration-300 h-40 rounded-xl overflow-hidden"}>
                    <img src={item.img} className={"w-full h-full block object-cover"} alt=""/>
                </div>
                <div className={"py-2 px-2 lg:px-3"}>
                    <p className={"text-[#515151] font-semibold"}>{item.name}</p>
                    <div className={"mt-3 flex-center-between text-[10px] lg:text-xs"}>
                        <p className={"text-primary"}>Bal: <span
                            className={"text-[#868686]"}>{item?.balance?.toLocaleString("en-US")} pts</span>
                        </p>
                        <p className={"flex-center gap-1"}><span>{DollarIcon}</span> <span
                            className={"text-[#868686]"}>{item?.points?.toLocaleString("en-US")} pts</span></p>
                    </div>
                </div>

                <button onClick={() => setShowDropdown(prevState => !prevState)}
                        className={"opacity-100 lg:opacity-0 transition duration-300 lg:group-hover:opacity-100 absolute top-1 right-1"}>{ThreeDotIcon}</button>
                <div
                    className={`${showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"} text-xs p-0.5 transition-all duration-300 bg-white rounded-lg absolute top-8 right-3 w-[80%] max-w-[200px]`}>
                    <Link href={`/kids/${item?.id}`}
                          className={"p-1.5 text-primary flex-center gap-1"}><span>{ProfileIcon}</span> View
                        Profile</Link>
                    <button onClick={() => handleOpenModal("points")}
                            className={"p-1.5 text-primary flex-center gap-1"}><span>{AddMoneyIcon}</span> Add Points
                    </button>
                    <button onClick={() => handleOpenModal("task")}
                            className={"p-1.5 text-primary flex-center gap-1"}><span>{AssignTaskIcon}</span> Assign Task
                    </button>
                    <button onClick={() => handleOpenModal("doCard")}
                            className={"p-1.5 text-primary flex-center gap-1"}><span>{AssignDoCardIcon}</span> Assign Do
                        Card
                    </button>
                    <p className={"border-b border-[#ECECEC]"}/>
                    <button onClick={() => handleOpenModal("removeKid")}
                            className={"p-1.5 text-primary flex-center gap-1"}><span>{RemoveKidIcon}</span> Remove Kid
                    </button>
                </div>
            </div>
            <FormModal isOpen={isModalOpen}
                       style={`lg:w-[450px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl ${showModal?.removeKid && "rounded-b-3xl mb-8 w-[90%] mx-auto"}`}>
                {showModal.points && <AddMoney closeModal={() => handleCloseModal("points")}/>}
                {showModal.task && <Task closeModal={() => handleCloseModal("task")}/>}
                {showModal.doCard && <DoCard closeModal={() => handleCloseModal("doCard")}/>}
                {showModal.removeKid && <RemoveKid closeModal={() => handleCloseModal("removeKid")}/>}
            </FormModal>
        </>
    );
}

export default KidCard;