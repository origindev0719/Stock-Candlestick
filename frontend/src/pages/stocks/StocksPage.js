import { Navigate } from "react-router-dom";
import { StocksView } from "./StocksView"

export const StocksPage = () => {
    const token = window.localStorage.getItem("userInfo");

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <StocksView />
    )
}