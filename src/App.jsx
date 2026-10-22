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
import ArticleRead from "./components/MainComponents/Articles/ArticleRead";
import Forgoten from "./components/StaticComponents/Forgoten";
import NotFound from "./components/StaticComponents/404";
import ProtectedRoute from "./components/SharedComponents/ProtectedRoute";
import Dashboard from "./components/UserProfile/Dashboard";

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
                            <Route path="/forgotten" element={<Forgoten />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/catalog/:id"
                                element={<CategoryPage />}
                            />
                            <Route
                                path="/article/:id"
                                element={<ArticleRead />}
                            />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
