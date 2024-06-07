import {CircleCloseIcon, CopyIcon, MastercardIcon} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";

const Receipt = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div className={"h-full"}>
            <ModalTop title={"Transaction Receipt"} Icon={CircleCloseIcon} closeModal={closeModal} />

            <div className={"modal-content lg:receipt-height flex-column lg:justify-between"}>
                <div className="text-sm flex-column gap-6">
                    <div className={"flex-center gap-8"}>
                        <p className={"text-primary font-semibold w-[120px]"}>Date</p>
                        <p className={"text-secondary flex-1"}>Mar 25,2023</p>
                    </div>
                    <div className={"flex-center gap-8"}>
                        <p className={"text-primary font-semibold w-[120px]"}>Order Number</p>
                        <p className={"text-secondary flex-1 flex-center gap-2"}>8227262592jdk37jsh626 <button>{CopyIcon}</button>
                        </p>
                    </div>
                    <div className={"flex gap-8"}>
                        <p className={"text-primary font-semibold w-[120px]"}>Payment method</p>
                        <p className={"text-secondary flex-1 flex-center gap-0.5"}>{MastercardIcon} Mastercard ending in
                            7000</p>
                    </div>
                    <div className={"flex-center gap-10"}>
                        <p className={"text-primary font-semibold w-[120px]"}>Retailer</p>
                        <p className={"text-secondary flex-1"}>Playground Co</p>
                    </div>
                    <div className={"flex gap-10"}>
                        <p className={"text-primary font-semibold w-[120px]"}>Product</p>
                        <p className={"text-secondary flex-1"}>2045, Silicon Valley, San Francisco, USA.</p>
                    </div>
                    <div className={"flex-center gap-10"}>
                        <p className={"text-primary font-semibold w-[120px]"}>VAT ID</p>
                        <p className={"text-secondary flex-1"}>7252671817 - 9872</p>
                    </div>
                    <div className={"flex-center gap-10"}>
                        <p className={"text-primary font-semibold w-[120px]"}>VAT (7.5%)</p>
                        <p className={"text-secondary flex-1"}>Playground Pro</p>
                    </div>
                    <div className={"flex-center gap-10"}>
                        <p className={"text-primary font-semibold w-[120px]"}>Total tax</p>
                        <p className={"text-secondary flex-1"}>$2.50</p>
                    </div>
                    <div className={"flex-center gap-10"}>
                        <p className={"text-primary font-semibold w-[120px]"}>Total </p>
                        <p className={"text-secondary flex-1"}>$2.50</p>
                    </div>
                </div>
                <button className={"primary-btn mt-6 lg:mt-0"}>Print Receipt</button>
            </div>
        </div>
    );
};

export default Receipt;