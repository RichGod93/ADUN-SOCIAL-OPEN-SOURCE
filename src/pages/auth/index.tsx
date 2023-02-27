import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from 'react';
import { useRouter } from "next/router";
import { PageHead } from "@/components";
import { useRecoilState } from "recoil";
import { appwrite, userState } from "config/appwriteConfig";
import { User } from "config/types";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter();

    const login = async (e: FormEvent<EventTarget>) => {
        e.preventDefault();
        try {
            setUser(await appwrite.account.createEmailSession(email, password) as unknown as User);
            router.push("../home");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <PageHead title={'ADUN Social'} page_name="Login" />
            <main className="px-5 md:lg:px-32 bg-gradient-to-b light-gradient dark:dark-gradient">
                <section className="container h-screen mx-auto flex">
                    <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
                        <h1 className="text-6xl primary-text-color font-bold">Login</h1>
                        <p className="mt-4 primary-text-color">Don't have an account?{" "}
                            <Link href="../../auth/signup" className="cursor-pointer underline">
                                Sign Up
                            </Link>
                        </p>
                        <form className="flex flex-col" onSubmit={login}>
                            <label className="block mt-6 primary-text-color">Email</label>
                            <input
                                className="login-form-input"
                                placeholder="Email"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="block mt-6 primary-text-color">Password</label>
                            <input
                                className="login-form-input"
                                placeholder="Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="mt-4 self-end">
                                <Link href="#" className="primary-text-color cursor-pointer underline">
                                    Forgot password?
                                </Link>
                            </div>


                            <div className="mt-5">
                                <button
                                    type="submit"
                                    disabled={!email || !password}
                                    className="mx-auto mt-4 py-4 px-14 font-semibold uppercase rounded-md shadow-md primary-bg-color 
                                    secondary-text-color
                                    focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login;