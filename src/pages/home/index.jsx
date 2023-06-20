import { CreatePost, HomeLayout, PageHead } from "@/components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
    const router = useRouter();

    return (
        <>
            <PageHead title="ADUN Social" page_name="Home" />
            <HomeLayout>
                <div className="flex flex-col items-center">
                    <div className="mt-3">
                        <CreatePost />
                    </div>
                </div>
            </HomeLayout>

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

export default HomePage;
