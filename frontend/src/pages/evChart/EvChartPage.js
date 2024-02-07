import { Navigate } from "react-router-dom";
import { EvChartView } from "./evChartView";

export const EvChartPage = () => {
    const token = window.localStorage.getItem("userInfo");

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <EvChartView />
    )
}