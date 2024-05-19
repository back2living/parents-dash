import InfoModal from "@/components/shared/InfoModal";
import {useState} from "react";
import Receipt from "@/components/routes/settings/modal/Receipt";

const GreenDotIcon = <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
    <circle cx="4" cy="4.5" r="3" fill="#CEF3F0" stroke="#09C2B2" stroke-width="2"/>
</svg>

const BillingTable = () => {
    const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
    return (
        <div>
            <div className={"mt-6 max-w-[700px]"}>
                <div className="table-head text-primary font-medium flex-center">
                    <p className={"w-[18.6%] max-w-[150px] px-4 py-1"}>Date issued</p>
                    <p className={"w-[25.4%] max-w-[200px] px-4 py-1"}>Description</p>
                    <p className={"w-[18.6%] max-w-[150px] px-4 py-1"}>Amount</p>
                    <p className={"w-[18.6%] max-w-[150px] px-4 py-1"}>Status</p>
                    <p className={"w-[18.6%] max-w-[150px] px-4 py-1"}>Receipt</p>
                </div>

                <div className={"flex-column gap-2 mt-4"}>
                    {Array.from({length: 4}).map((item, index) => <div key={index}
                                                                       className={"table-item font-medium flex-center p-4 bg-primary rounded-2xl text-secondary-dark"}>
                        <p className={"w-[122px] px-2 max-w-[150px]"}>8/10/23</p>
                        <p className={"w-[180px] px-2 max-w-[200px]"}>Playground Premium</p>
                        <p className={"w-[122px] px-2 max-w-[150px]"}>$30</p>
                        <p className={"w-[122px] px-2 max-w-[150px] flex-center gap-2 text-[#09C2B2]"}>{GreenDotIcon} Paid</p>
                        <button onClick={() => setShowReceiptModal(true)} className={"w-[122px] px-2 max-w-[150px] underline"}>View receipt</button>
                    </div>)}
                </div>
            </div>

            <InfoModal isOpen={showReceiptModal} style={"w-full lg:w-[400px] h-full overflow-y-auto"}>
                <Receipt closeModal={() => setShowReceiptModal(false)} />
            </InfoModal>
        </div>
    );
};

export default BillingTable;