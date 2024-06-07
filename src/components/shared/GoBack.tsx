import {useRouter} from "next/router";

const GoBack = () => {
    const router = useRouter();
    const handleGoToPreviousPage = () => router.back();

    return (
        <div>
            Go back.
        </div>
    );
};

export default GoBack;