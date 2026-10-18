import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../authContext";

export default function Logout() {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    console.log("logging out ...");

    useEffect(() => {

        logoutUser();

        // Redirect to login
        navigate("/login", { replace: true });
    }, [navigate]);

    return null;
}
