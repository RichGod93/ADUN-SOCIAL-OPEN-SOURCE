import NavBar from "./NavBar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeLayout = ({ children }) => {
    return (
        <div className="h-full px-5 md:lg:px-10 flex flex-col bg-gradient-to-b light-gradient dark:dark-gradient">
            <NavBar />
            <div>{children}</div>

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
        </div>
    );
};

export default HomeLayout;