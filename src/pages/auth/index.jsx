import { PageHead } from "@/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const selectUserType = () => {
    return (
        <>
            <PageHead title={"ADUN Social"} page_name="User Type" />
            <main className="px-5 md:lg:px-32 bg-gradient-to-b light-gradient dark:dark-gradient">
                <section className="container h-screen mx-auto flex items-center justify-center">
                    <div className="flex-grow flex flex-col items-center justify-center max-w-xl p-6 secondary-bg-color space-y-5 shadow-lg rounded-lg">
                        <h1 className="text-6xl primary-text-color font-bold">
                            Sign Up As
                        </h1>
                        <div className="flex flex-wrap items-center justify-center w-full space-x-5">
                            <Link href="../auth/staffsignup">
                                <div className="lg:w-48 lg:h-48 md:w-40 md:h-40 w-36 h-36 flex flex-col items-center justify-center rounded-full primary-bg-color shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                                    <Image
                                        src="/static/teacher.png"
                                        width={100}
                                        height={100}
                                        alt="teacher icon"
                                    />
                                    <p>Staff</p>
                                </div>
                            </Link>

                            <Link href="../auth/studentsignup">
                                <div className="lg:w-48 lg:h-48 md:w-40 md:h-40 w-36 h-36 flex flex-col items-center justify-center rounded-full primary-bg-color shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
                                    <Image
                                        src="/static/student.png"
                                        width={100}
                                        height={100}
                                        alt="student icon"
                                    />
                                    <p>Student</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                </section>
            </main>
        </>
    );
};

export default selectUserType;
