import Logo from "../Logo";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
    return (
        <div
            className="h-screen flex flex-col px-5 md:px-32 lg:px-32 "
        >
            <div className="self-start pt-3 lg:pt-5"><Logo /></div>
            <div className="flex md:lg:flex-1 items-center justify-center mt-32 md:lg:mt-0">
                <motion.div className="space-y-3 flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        default: {
                            duration: 0.2,
                            ease: [0, 0.71, 0.2, 1.01]
                        },
                        scale: {
                            type: "spring",
                            damping: 7,
                            stiffness: 100,
                            restDelta: 0.001
                        }
                    }}
                >
                    <div className="space-y-3">
                        <p className="font-semibold text-sm text-center primary-text-color uppercase">
                            24 hour access
                        </p>
                        <p className="font-extrabold text-6xl md:lg:text-7xl text-center primary-text-color uppercase">
                            stay updated<br />share your thoughts
                        </p>

                    </div>
                    <div>
                        <p className="text-center primary-text-color">
                            Change the way you utilize your time and the internet with this <br /> easy-to-use social network.
                        </p>
                    </div>

                    <div className="flex flex-col items-center space-y-2 primary-text-color">
                        {/* Button */}
                        <Link href="../auth">
                            <motion.button
                                className="primary-bg-color secondary-text-color font-bold text-xs mt-2 py-3 px-4 rounded-sm flex items-center justify-between uppercase"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                Get Started
                            </motion.button>
                        </Link>

                        <p>or</p>

                        <Link href="../auth/login" className="font-bold">
                            Log In
                        </Link>
                    </div>


                </motion.div>
            </div>

        </div>
    );
};

export default Hero;