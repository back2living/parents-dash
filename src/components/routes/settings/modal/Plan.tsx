import React from 'react';
import ModalTop from "@/components/shared/ModalTop";
import {CircleCloseIcon} from "@/components/shared/Svg";

const Plan = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div>
            <ModalTop title={"Transaction Receipt"} Icon={CircleCloseIcon} closeModal={closeModal} />

            
        </div>
    );
};

export default Plan;