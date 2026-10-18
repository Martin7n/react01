import { useState } from "react";
import { Link } from "react-router";
import authApi from "../api/authApi";
import reguser_simple_validator from "../../helpers/validator-helpers";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);

    const handleRegisterAction = async (formData) => {
        setFormError(null);
        setIsSubmitting(true);

        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm-password");
        const acceptTerms = formData.get("acceptTerms");

        const validation = reguser_simple_validator(
            email,
            password,
            confirmPassword,
        );
        if (!validation.isValid) {
            setFormError(validation.error);
            return;
        }

        const { email: finalEmail, password: finalPassword } = validation.data;

        console.log("Form clean! Ready to submit to database.", {
            finalEmail,
            finalPassword,
        });
        try {
            const result = await authApi.register({
                email: finalEmail,
                password: finalPassword,
            });

            if (result && result.success) {
                alert(
                    "Registration successful! Check your inbox for a verification link.",
                );
                console.log(
                    "Account created via REST API successfully!",
                    result.data,
                );
            }
        } catch (err) {
            setFormError("Registration setup error ");
            console.error(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Link
                            to="/"
                            className="flex items-center space-x-3 rtl:space-x-reverse group bg-black"
                        >
                            {/* Custom  Logo SVG */}
                            <svg
                                className="h-9 w-9 text-blue-500 group-hover:text-blue-400 transition-colors"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://w3.org"
                            >
                                {/* Athletic Crest / Shield Backdrop */}
                                <path
                                    d="M50 5L85 20V55C85 76.5 50 95 50 95C50 95 15 76.5 15 55V20L50 5Z"
                                    fill="currentColor"
                                    fillOpacity="0.1"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinejoin="round"
                                />
                                {/* Dynamic Lightning Accent */}
                                <path
                                    d="M15 20L50 5L85 20"
                                    stroke="#ffffff"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                {/* Bold Athletic Number 7 */}
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
                            Create an account
                        </h1>
                        <form
                            action={handleRegisterAction}
                            className="space-y-4 md:space-y-6"
                        >
                            {formError && (
                                <div className="p-3 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-700 dark:text-red-400 font-medium">
                                    ⚠️ {formError}
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{" "}
                                        <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#"
                                        >
                                            Acceptable ...
                                            {/* Terms and Conditions */}
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                disabled={isSubmitting}
                                // type="submit"
                                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {isSubmitting
                                    ? "Creating Account..."
                                    : "Register Account"}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
