import {useRouter} from "next/router";

export const useKidProfileRoute = (currentKidId: string, setKidActiveTab: (tab: string) => void) => {
    const router = useRouter();
    return async () => {
        await router.push(`/kids/${currentKidId}`);
        setKidActiveTab("do-cards");
    };
};