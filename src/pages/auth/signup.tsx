import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from 'react';
import { useRouter } from "next/router";
import { appwrite } from "config/appwriteConfig";
import { ID } from "appwrite";

import { PageHead } from "@/components";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const signup = async (e: FormEvent<EventTarget>) => {
        e.preventDefault();
        try {
            await appwrite.account.create(ID.unique(), email, password, name);
            await appwrite.account.createEmailSession(email, password);

            await appwrite.account.createVerification("http://localhost:3000/home");
            alert("Verification email has been sent!");
            router.push("../home");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <PageHead title={'ADUN Social'} page_name="Sign Up" />
            <main className="px-5 md:lg:px-32 bg-gradient-to-b light-gradient dark:dark-gradient">
                <section className="container h-screen mx-auto flex">
                    <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
                        <h1 className="text-6xl font-bold primary-text-color">Sign Up</h1>
                        <p className="mt-4 primary-text-color">
                            Already have an account?{" "}
                            <Link href="../auth" className="cursor-pointer underline">
                                Login
                            </Link>
                        </p>
                        <form onSubmit={signup}>
                            <label className="block mt-6 primary-text-color">Name</label>
                            <input
                                className="signup-form-input"
                                placeholder="Name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label className="block mt-6 primary-text-color">Email</label>
                            <input
                                className="signup-form-input"
                                placeholder="Email"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="block mt-6 primary-text-color">Password</label>
                            <input
                                className="signup-form-input"
                                placeholder="Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={!name || !email || !password}
                                    className="mx-auto mt-4 py-4 px-14 font-semibold uppercase rounded-md shadow-md primary-bg-color 
                                    secondary-text-color
                                    focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SignUp;