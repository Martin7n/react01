import Footer from "./Footer";
import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
    return (
        <>
            <div className="flex flex-col min-h-screen pt-20">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}
