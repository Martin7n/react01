import { useState } from "react";
import { Link, useNavigate } from "react-router";
import authApi from "../../api/authApi";
import login_cleaner from "../../helpers/login_cleaner";
import { useAuth } from "../../context/authContext";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formError, setFormError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const loginSubmitHandler = async (formData) => {
        setFormError(null);
        setIsSubmitting(true);

        const email = formData.get("email");
        const password = formData.get("password");

        const validation = login_cleaner(email, password);
        if (!validation.isValid) {
            setFormError(validation.error);
            return;
        }

        const { email: cleanEmail, password: cleanPwd } = validation.data;

        try {
            const result = await authApi.login({ email, password });

            if (result && result.success) {
                loginUser(result.data);
                // alert("Login successful! ");
                console.log(
                    "Login successful via REST API successfully!",
                    result.data,
                );
                navigate("/");
                return;
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-black">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <Link
                                to="/"
                                className="flex items-center space-x-3 rtl:space-x-reverse group bg-black"
                            >
                                <svg
                                    className="h-9 w-9 text-blue-500 group-hover:text-blue-400 transition-colors"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://w3.org"
                                >
                                    <path
                                        d="M50 5L85 20V55C85 76.5 50 95 50 95C50 95 15 76.5 15 55V20L50 5Z"
                                        fill="currentColor"
                                        fillOpacity="0.1"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15 20L50 5L85 20"
                                        stroke="#ffffff"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M35 32H65L45 72"
                                        stroke="#ffffff"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <span className="self-center text-xl text-white font-black tracking-wider uppercase font-mono">
                                    Seven{" "}
                                    <span className="text-blue-500">Tech</span>
                                </span>
                            </Link>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form
                                action={loginSubmitHandler}
                                className="space-y-4 md:space-y-6"
                            >
                                {formError && (
                                    <div className="p-3 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-700 dark:text-red-400 font-medium">
                                        {formError}
                                    </div>
                                )}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link
                                        to="/forgotten"
                                        className="text-sm  font-medium text-black hover:underline dark:text-primary-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    // type="submit"
                                    className="w-full text-green bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <Link
                                        to="/register"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
