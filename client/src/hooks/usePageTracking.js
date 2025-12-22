import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, logPageView } from "../utils/analytics";

const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        initGA();
    }, []);

    useEffect(() => {
        logPageView();
    }, [location]);
};

export default usePageTracking;
