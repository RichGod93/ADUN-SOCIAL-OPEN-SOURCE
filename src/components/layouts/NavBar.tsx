import { FormEvent } from 'react';
import Logo from '../landingPage/Logo';
import { HomeIcon, ChatBubbleLeftRightIcon, UserIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { appwrite } from 'config/appwriteConfig';
import { useRouter } from 'next/router';

import MobileMenu from './MobileMenu';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NavBar = () => {
    const router = useRouter();

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
        <nav className="w-full flex items-center justify-between py-2">
            <div className=""><Logo /></div>

            <ul className="hidden md:flex md:flex-1 lg:flex lg:flex-1 items-center justify-center lg:space-x-10">
                <li className="py-3 px-5 cursor-pointer hover:border-b-2 hover:primary-border-color">
                    <HomeIcon className="icon-small primary-text-color" />
                </li>
                <li className="py-3 px-5 cursor-pointer hover:border-b-2 hover:primary-border-color">
                    <ChatBubbleLeftRightIcon className="icon-small primary-text-color" />
                </li>
                <li className="py-3 px-5 cursor-pointer hover:border-b-2 hover:primary-border-color">
                    <UserIcon className="icon-small primary-text-color" />
                </li>
            </ul>

            <div className="flex items-center space-x-1">
                <UserCircleIcon className="hidden md:block lg:block icon-medium primary-text-color" />
                <button
                    onClick={logout}
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