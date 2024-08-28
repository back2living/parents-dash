import {useRouter} from "next/router";

const BackIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9.57 5.93018L3.5 12.0002L9.57 18.0702" stroke="#A1A1A1" strokeWidth="3" strokeMiterlimit="10"
          strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.4999 12H3.66992" stroke="#A1A1A1" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round"
          strokeLinejoin="round"/>
</svg>

const GoBack = () => {
    const router = useRouter();
    const handleGoToPreviousPage = () => router.back();

    return (
        <button onClick={handleGoToPreviousPage} className={"flex-center gap-2"}>
            <span>{BackIcon}</span>
            <span className={"text-secondary lg:text-md font-semibold"}>Go back</span>
        </button>
    );
};

export default GoBack;