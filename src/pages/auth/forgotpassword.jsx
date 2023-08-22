import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PageHead } from "@/components";
import { useAuth } from "@/context/AppContextProvider";

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();

    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        forgotPassword(email)
            .then((response) => {
                toast.success("Password reset email sent, check your email");
                console.log(response);
            })
            .catch((error) => {
                toast.error("Password reset email not sent, try again");
                console.log(error);
            });
    };


    return (
        <>
            <PageHead title={'ADUN Social'} page_name="Forgot Password" />
            <main className="px-5 md:lg:px-32 bg-gradient-to-b light-gradient dark:dark-gradient">
                <section className="container h-screen mx-auto flex">
                    <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
                        <h1 className="text-6xl primary-text-color font-bold">Forgot Password?</h1>
                        <p className="mt-4 primary-text-color">
                            Please enter your email address.{" "}
                            <Link href="../auth/login" className="cursor-pointer underline">
                                Login
                            </Link>
                        </p>
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <label className="block mt-6 primary-text-color">Email</label>
                            <input
                                className="login-form-input"
                                placeholder="@example.com"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    disabled={!email}
                                    className="mx-auto mt-4 py-4 px-14 font-semibold uppercase rounded-md shadow-md primary-bg-color 
                                    secondary-text-color
                                    focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default ForgotPassword;