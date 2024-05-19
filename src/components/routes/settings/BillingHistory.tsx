import NoBillingHistory from "@/components/routes/settings/NoBillingHistory";
import BillingTable from "@/components/routes/settings/BillingTable";

const BillingHistory = () => {
    return (
        <div className={"mt-10"}>
            <p className={"text-md text-primary font-semibold"}>Billing history</p>

            {/*<NoBillingHistory />*/}
            <BillingTable />

        </div>
    );
};

export default BillingHistory;