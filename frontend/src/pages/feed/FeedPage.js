import { Navigate } from "react-router-dom";
import { FeedView } from "./FeedView"

export const FeedPage = () => {
    const token = window.localStorage.getItem("userInfo");

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <FeedView />
    )
}