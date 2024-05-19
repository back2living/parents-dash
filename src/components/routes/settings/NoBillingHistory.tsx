import React from 'react';

const NoBillingHistory = () => {
    return (
        <div className={"mt-10"}>
            <div className={"flex-column gap-4 bg-primary h-[250px] items-center justify-center rounded-2xl mt-4"}>
                <img className={"w-20 h-20"} src="/assets/images/no-billing.svg" alt=""/>
                <p className={"text-primary font-semibold"}>No billing history</p>
            </div>
        </div>
    );
};

export default NoBillingHistory;