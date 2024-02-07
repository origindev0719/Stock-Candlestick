import { Navigate } from "react-router-dom";
import { CryptoView } from "./CryptoView"

export const CryptoPage = () => {
    const token = window.localStorage.getItem("userInfo");

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <CryptoView />
    )
}