import { Navigate, useParams } from "react-router-dom";
import { DashboardView } from "./DashboardView";
import { OnboardingView } from "./components/OnboardingView";

export const DashboardPage = () => {
    const { id: userId } = useParams();
    const token = window.localStorage.getItem("userInfo");
    const user = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

    if (!token) {
        return <Navigate to="/" />;
    }

    // Check if the interests array is empty
    if (user?.interests && user?.interests?.length === 0) {
        return <OnboardingView userId={user.id} />;
    }

    return <DashboardView userId={userId} />;
}
