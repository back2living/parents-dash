import DashboardLayout from "@/layouts/DashboardLayout";
import NoKids from "@/components/routes/kids/NoKids";
import Kids from "@/components/routes/kids/Kids";
import {useFetchKids} from "@/hooks/useKids";
import KidsLoader from "@/components/routes/kids/Loader";

const KidsPage = () => {
    const {isLoading, data} = useFetchKids();
    if (isLoading) return <KidsLoader />;

    return (
        <DashboardLayout title={"Kids"}>
            {data?.data?.length === 0 && <NoKids/>}
            {data?.data?.length > 0 && <Kids kids={data?.data}/>}
        </DashboardLayout>
    );
};

export default KidsPage;