import { Navigate } from "react-router-dom";
import { SportsView } from "./SportsView"

export const SportsPage = () => {
    const token = window.localStorage.getItem("userInfo");

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <SportsView />
    )
}