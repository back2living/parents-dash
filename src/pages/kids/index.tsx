import DashboardLayout from "@/layouts/DashboardLayout";
import NoKids from "@/components/routes/kids/NoKids";
import Kids from "@/components/routes/kids/Kids";

const KidsPage = () => {
    return (
        <DashboardLayout title={"Kids"}>
            {/*<NoKids />*/}
            <Kids />
        </DashboardLayout>
    );
};

export default KidsPage;