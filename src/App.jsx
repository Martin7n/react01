import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import About from "./components/StaticComponents/About";
import Catalog from "./components/MainComponents/Catalog";
import Login from "./components/AuthComponents/Login";
import Register from "./components/AuthComponents/Register";
import Logout from "./components/AuthComponents/Logout";
import Layout from "./components/SharedComponents/Layout";
import { AuthProvider } from "./context/authContext";
import CategoryPage from "./components/MainComponents/CategoryPage";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route
                                path="/catalog/:id"
                                element={<CategoryPage />}
                            />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
