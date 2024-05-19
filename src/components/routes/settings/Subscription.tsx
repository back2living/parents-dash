import NoBillingHistory from "@/components/routes/settings/NoBillingHistory";
import BillingHistory from "@/components/routes/settings/BillingHistory";

const Subscription = () => {
    return (
        <div className={"lg:w-[44.5%] max-w-[500px]"}>
            <p className={"text-md text-primary font-semibold"}>Current subscription</p>
            <div className={"p-4 bg-primary mt-4 rounded-2xl"}>
                <div className={"flex-center-between"}>
                    <div>
                        <div className={"flex-center gap-2"}>
                            <p className={"text-primary font-semibold"}>Starter</p>
                            <p className={"bg-[#E0E0E0] text-[8px] py-1 px-2 rounded-xl text-secondary"}>Free</p>
                        </div>
                        <p className={"text-secondary text-xs"}>$0/month</p>
                    </div>
                    <button className={"primary-btn w-fit text-sm"}>Upgrade to Basic</button>
                </div>

                <div className={"mt-6 flex-column gap-4"}>
                    <div className={"flex-center gap-10 text-sm"}>
                        <p className={"w-[120px] text-primary font-semibold"}>Next payment</p>
                        <p className={"text-secondary flex-1"}>You don’t have an active subscription. Check out the <span className={"text-orange font-medium"}>plans</span> to unlock new features</p>
                    </div>

                    <div className={"flex-center gap-10 text-sm"}>
                        <p className={"w-[120px] text-primary font-semibold"}>Payment method</p>
                        <p className={"text-secondary flex-1"}>No payment method saved</p>
                    </div>

                    <div className={"flex-center gap-10 text-sm"}>
                        <p className={"w-[120px] text-primary font-semibold"}>Billing cycle</p>
                        <p className={"text-secondary flex-1"}>Free plan</p>
                    </div>

                </div>

            </div>

            {/*<NoBillingHistory />*/}
            {/*<BillingHistory />*/}
        </div>
    );
};

export default Subscription;