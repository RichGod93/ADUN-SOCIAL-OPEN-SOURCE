import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import { appwrite } from "../../../config/firebaseConfig";
import 'react-toastify/dist/ReactToastify.css';

import { PageHead } from "@/components";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const router = useRouter();

    const changePassword = async (event) => {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('userId');
        const secret = urlParams.get('secret');

        if (newPassword == repeatedPassword) {
            await appwrite.account.updateRecovery(
                userId,
                secret,
                newPassword,
                repeatedPassword
            );
            toast.success("Password Reset!");
            router.push('../auth');
        } else {
            toast.error("Check passwords to ensure they match.");
        };
    };



    return (
        <>
            <PageHead title={'ADUN Social'} page_name="Reset Password" />
            <main className="px-5 md:lg:px-32 bg-gradient-to-b light-gradient dark:dark-gradient">
                <section className="container h-screen mx-auto flex">
                    <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
                        <h1 className="text-6xl primary-text-color font-bold">Reset Password</h1>
                        <form className="flex flex-col" onSubmit={changePassword}>
                            <label className="block mt-6 primary-text-color">Enter your new password:</label>
                            <input
                                className="login-form-input"
                                placeholder="New password"
                                type="password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <label className="block mt-6 primary-text-color">Repeat your new password:</label>
                            <input
                                className="login-form-input"
                                placeholder="Repeat password"
                                type="password"
                                onChange={(e) => setRepeatedPassword(e.target.value)}
                            />
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    disabled={!newPassword || !repeatedPassword}
                                    className="mx-auto mt-4 py-4 px-14 font-semibold uppercase rounded-md shadow-md primary-bg-color 
                                    secondary-text-color
                                    focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed">
                                    Change Password
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

export default ResetPassword;