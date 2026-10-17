import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
    const navigate = useNavigate();

    console.log("logging out ...");

    useEffect(() => {
        localStorage.removeItem("token");

        // Redirect to login
        navigate("/login", { replace: true });
    }, [navigate]);

    return null;
}
