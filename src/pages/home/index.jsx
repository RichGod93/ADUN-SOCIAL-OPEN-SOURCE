import { CreatePost, HomeLayout, PageHead } from "@/components";
import { appwrite } from "../../../config/firebaseConfig";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
    const router = useRouter();

    const verifyUser = (userId, secret) => {
        appwrite.account
            .updateVerification(userId, secret)
            .then(() => {
                toast.success("Account verified");
                router.push("../home");
            })
            .catch((error) => {
                toast.error(`${error.message}`);
                console.log(error);
            });
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("userId");
        const secret = urlParams.get("secret");

        if (userId && secret) {
            verifyUser(userId, secret);
        }
    }, []);

    async function getStatus() {
        const data = await appwrite.account.get();

        if (data.status == true) {
            console.log("true");
        } else {
            console.log("false");
        }
    }

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
