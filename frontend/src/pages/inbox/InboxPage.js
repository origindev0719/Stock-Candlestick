import { Navigate, useLocation } from "react-router-dom";
import { InboxView } from "./InboxView"

export const InboxPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    const user = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;
    const token = window.localStorage.getItem("userInfo");

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <InboxView userId={userId} myId={user.id} user={user} />
    )
}