import React from 'react';
import PasswordInput from "@/components/shared/PasswordInput";

const Security = () => {
    return (
        <div className={"max-w-[450px]"}>
            <p className={"text-md text-primary font-semibold"}>Change password</p>

            <div className={"mt-10"}>
                <PasswordInput label={"Current password"}/>
                <div className="border border-[#F7F7F7] my-10"/>
                <div className={"flex-column gap-6"}>
                    <PasswordInput label={"Create new password"}/>
                    <PasswordInput label={"Confirm password"}/>
                </div>

                <button className={"primary-btn mt-6"}>Change password</button>
            </div>
        </div>
    );
};

export default Security;