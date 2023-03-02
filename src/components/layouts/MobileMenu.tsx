import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { appwrite } from "config/appwriteConfig";
import { useRouter } from "next/router";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const links = [
        { name: "Home", to: "#", id: 1 },
        { name: "Chat", to: "#", id: 2 },
        { name: "Profile", to: "#", id: 3 },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logout = async (e: FormEvent<EventTarget>) => {
        e.preventDefault();
        try {
            await appwrite.account.deleteSession('current');
            router.push("../auth/");
        } catch (error: any) {
            toast.error(`${error.message}`);
        }

    };

    return (
        <div className="relative lg:hidden">
            <button
                className="px-4 py-1 secondary-text-color primary-bg-color rounded-sm"
                onClick={toggleMenu}
            >
                <Bars3Icon className="icon-small secondary-text-color" />
            </button>
            <motion.div
                className="absolute right-0 mt-2 w-40 primary-bg-color shadow-lg z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
            >
                {links.map(({ name, to, id }) => (
                    <a
                        key={id}
                        href={to}
                        className="block px-4 py-2 text-sm secondary-text-color hover:primary-text-color hover:secondary-bg-color"
                    >
                        {name}
                    </a>
                ))}
                <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-sm secondary-text-color hover:primary-text-color text-left hover:secondary-bg-color"
                >
                    Logout 👋
                </button>
            </motion.div>
        </div>
    );
};

export default MobileMenu;
