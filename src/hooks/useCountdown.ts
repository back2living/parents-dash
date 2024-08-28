import { useEffect, useState } from "react";

interface UseCountdown {
    secondsLeft: number;
    start: (seconds: number) => void;
}

export default function useCountdown(): UseCountdown {
    const [secondsLeft, setSecondsLeft] = useState<number>(0);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const timeout = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [secondsLeft]);

    function start(seconds: number) {
        setSecondsLeft(seconds);
    }

    return { secondsLeft, start };
}
