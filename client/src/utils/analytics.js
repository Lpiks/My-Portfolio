import ReactGA from "react-ga4";

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
    // 1. Safety Check: If the ID is missing, don't initialize (Prevents the crash)
    if (!MEASUREMENT_ID) {
        console.warn("Google Analytics ID missing. Check your .env file for VITE_GA_MEASUREMENT_ID.");
        return;
    }

    // 2. Check Admin Privacy Setting
    const isTrackingDisabled = localStorage.getItem("isAdminTrackingDisabled") === "true";

    if (!isTrackingDisabled) {
        ReactGA.initialize(MEASUREMENT_ID);

    }
};

export const logPageView = () => {
    if (!MEASUREMENT_ID) return;

    const isTrackingDisabled = localStorage.getItem("isAdminTrackingDisabled") === "true";
    if (!isTrackingDisabled) {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
};

export const logEvent = (category, action, label) => {
    if (!MEASUREMENT_ID) return;

    const isTrackingDisabled = localStorage.getItem("isAdminTrackingDisabled") === "true";
    if (!isTrackingDisabled) {
        ReactGA.event({
            category,
            action,
            label,
        });
    }
};