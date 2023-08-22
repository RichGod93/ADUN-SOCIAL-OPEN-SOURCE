import Logo from "../Logo";
import {
    HomeIcon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";

import MobileMenu from "./MobileMenu";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AppContextProvider";
import { useRouter } from "next/router";
import Link from "next/link";
import { collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebaseConfig";

const NavBar = () => {
    const { logout } = useAuth();
    const userState = collection(db, "state");
    const router = useRouter();

    const handleLogout = async () => {
        try {
            logout;
            router.push("../auth");
            await updateDoc(doc(userState, auth.currentUser.uid), {
                isOnline: false,
            });
        } catch {
            toast.error("Failed to log out");
        }

    };

    return (
        <nav className="w-full flex items-center justify-between py-2">
            <div className="">
                <Logo />
            </div>

            <ul className="hidden md:flex md:flex-1 lg:flex lg:flex-1 items-center justify-center lg:space-x-10">
                <Link
                    href="../home"
                    className="py-3 px-5 cursor-pointer hover:border-b-2 hover:primary-border-color"
                >
                    <HomeIcon className="icon-small primary-text-color" />
                </Link>
                <li className="py-3 px-5 cursor-pointer hover:border-b-2 hover:primary-border-color">
                    <ChatBubbleLeftRightIcon className="icon-small primary-text-color" />
                </li>
                <Link
                    href="../home/profile"
                    className="py-3 px-5 cursor-pointer hover:border-b-2 hover:primary-border-color"
                >
                    <UserIcon className="icon-small primary-text-color" />
                </Link>
            </ul>

            <div className="flex items-center space-x-1">
                <UserCircleIcon className="hidden md:block lg:block icon-medium primary-text-color" />
                <button
                    onClick={handleLogout}
                    className="hidden md:block lg:block w-full px-4 py-2 text-sm secondary-text-color primary-bg-color"
                >
                    Logout 👋
                </button>
                <MobileMenu />
            </div>
        </nav>
    );
};

export default NavBar;
