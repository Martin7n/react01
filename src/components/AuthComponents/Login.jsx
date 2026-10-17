export default function Login() {

   
    // const [state, setState] = React.useState("login");
    // const [name, setName] = React.useState("");
    // const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");




    return (

            <>
            <h1>Login</h1>


                        <section className="bg-gray-50 dark:bg-gray-900">
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                                                    Flowbite
                                    </a>
                                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                                            Sign in to your account
                                                    </h1>
                                                    <form className="space-y-4 md:space-y-6" action="#">
                                                            <div>
                                                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                                                            </div>
                                                            <div>
                                                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                    <div className="flex items-start">
                                                                            <div className="flex items-center h-5">
                                                                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                                                            </div>
                                                                            <div className="ml-3 text-sm">
                                                                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                                                            </div>
                                                                    </div>
                                                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                                            </div>
                                                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                                    Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                                            </p>
                                                    </form>
                                            </div>
                                    </div>
                            </div>
                    </section>













            </>









    )
            // <form className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            //     <p className="text-2xl font-medium m-auto">
            //         <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            //     </p>
            //     {state === "register" && (
            //         <div className="w-full">
            //             <p>Name</p>
            //             <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
            //         </div>
            //     )}
            //     <div className="w-full ">
            //         <p>Email</p>
            //         <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            //     </div>
            //     <div className="w-full ">
            //         <p>Password</p>
            //         <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            //     </div>
            //     {state === "register" ? (
            //         <p>
            //             Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
            //         </p>
            //     ) : (
            //         <p>
            //             Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
            //         </p>
            //     )}
            //     <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
            //         {state === "register" ? "Create Account" : "Login"}
            //     </button>
            // </form>
    
};
