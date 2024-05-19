import {BigDollarIcon, WalletIcon} from "@/components/shared/Svg";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";
import AddMoney from "@/components/routes/kids/modal/AddMoney";

const balanceStyle = "border-2 border-[#ECECEC] bg-white rounded-xl p-4 flex gap-4 flex-1"
const Allowance = () => {
    const [showPointModal, setShowPointModal] = useState<boolean>(false);
    return (
        <div>
            <div className={"border-t border-2 border-[#ECECEC] my-6 "}/>
            <div>
                <div className={"flex-center-between mb-4"}>
                    <p className={"text-md text-primary font-semibold"}>Allowance</p>
                    <button onClick={() => setShowPointModal(true)} className={"text-sm text-orange font-semibold underline"}>Add allowance</button>
                </div>

                <div className={"flex-center gap-6"}>
                    <div className={balanceStyle}>
                        <span>{WalletIcon}</span>
                        <div>
                            <p className={"text-sm text-secondary"}>Balance</p>
                            <p className={"text-primary font-semibold"}>5,000 pts</p>
                        </div>
                    </div>
                    <div className={balanceStyle}>
                        <span>{BigDollarIcon}</span>
                        <div>
                            <p className={"text-sm text-secondary"}>Spent</p>
                            <p className={"text-primary font-semibold"}>500 pts</p>
                        </div>
                    </div>
                </div>
            </div>

            <FormModal isOpen={showPointModal} style={"lg:w-[450px] max-h-full rounded-t-3xl overflow-y-auto lg:mb-0"}>
                <AddMoney closeModal={() => setShowPointModal(false)}/>
            </FormModal>
        </div>
    );
};

export default Allowance;