import Link from 'next/link';
import Logo from '../landingPage/Logo';
import { HomeIcon, ChatBubbleLeftRightIcon, UserIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import MobileMenu from './MobileMenu';
import { appwrite } from 'config/appwriteConfig';
import { useRouter } from 'next/router';


const NavBar = () => {
    const router = useRouter();


    const logout = async () => {
        await appwrite.account.deleteSession('current');
        window.localStorage.removeItem("jwt");
        window.localStorage.removeItem("jwt_expire");
        router.push("../auth/");
    };

    return (
        <nav className="w-full flex items-center justify-between py-2">
            <div className=""><Logo /></div>

            <ul className="hidden lg:flex lg:flex-1 items-center justify-center lg:space-x-10">
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
                <UserCircleIcon className="hidden lg:block icon-medium primary-text-color" />
                <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-sm secondary-text-color primary-bg-color"
                >
                    Logout 👋
                </button>
                <MobileMenu />
            </div>
        </nav>
    );
};

export default NavBar;