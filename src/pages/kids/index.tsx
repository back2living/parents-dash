import DashboardLayout from "@/layouts/DashboardLayout";
import NoKids from "@/components/routes/kids/NoKids";
import Kids from "@/components/routes/kids/Kids";

const KidsPage = () => {
    return (
        <DashboardLayout title={"KIDS"}>
            {/*<NoKids />*/}
            <Kids />
        </DashboardLayout>
    );
};

export default KidsPage;