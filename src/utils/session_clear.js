export default function session_clear(setUserStateCallback = null) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_profile");
    if (setUserStateCallback && typeof setUserStateCallback === "function") {
        setUserStateCallback(null);
    }
}
