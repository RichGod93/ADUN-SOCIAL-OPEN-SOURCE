import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from 'react';
import { appwrite } from "config/appwriteConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PageHead } from "@/components";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const forgotPassword = async () => {
        try {
            await appwrite.account.createRecovery(email, "http://localhost:3000/auth/resetpassword");
            toast.success('Email has been sent');
        } catch (error: any) {
            toast.error(`${error.message}`);
        }
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
                            <Link href="../auth" className="cursor-pointer underline">
                                Login
                            </Link>
                        </p>
                        <form className="flex flex-col" onSubmit={forgotPassword}>
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