import { useEffect, useState } from 'react';

const useMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 1200px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };

    }, []);

    return isMobile;
};

export default useMobile;
