import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import { setDoc, doc, collection } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PageHead } from "@/components";
import { useAuth } from "@/context/AppContextProvider";
import { auth, db } from "../../../config/firebaseConfig";
import useMounted from "@/hooks/useMounted";

const SignUp = () => {
    const { signup } = useAuth();

    const [photo, setPhoto] = useState("/avatar.png");
    const [loading, setLoading] = useState(false);

    // Collection references
    const userBioData = collection(db, "bio_data");
    const userType = collection(db, "user_type");
    const userState = collection(db, "state");
    const userFacultyCol = collection(db, "faculties");
    const userDepartmentCol = collection(db, "departments");

    // This function removes the select options
    const removeAllSelectOptions = (selectBox) => {
        while (selectBox.options.length > 0) {
            selectBox.remove(0);
        }
    };

    // This function gets the document fields from the database and populates the select options
    async function getSelectOptions(colref, e, optionfield, targetselectid) {
        getDoc(
            doc(colref, e.target.options[e.target.selectedIndex].value.toLowerCase())
        ).then((doc) => {
            const dataArr = doc.data();
            let targetSelect = document.getElementById(targetselectid);
            removeAllSelectOptions(targetSelect);
            let newOption = new Option(`--Select ${targetselectid}--`, "");
            targetSelect.add(newOption);
            try {
                dataArr[optionfield].forEach((element) => {
                    newOption = new Option(element, element);
                    targetSelect.add(newOption);
                });
            } catch (error) {
                console.log(error.message);
            }
        });
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

    const mounted = useMounted();

    const [data, setData] = useState({
        first: "",
        last: "",
        matric: "",
        faculty: "",
        department: "",
        programme: "",
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const router = useRouter();

    const {
        first,
        last,
        matric,
        faculty,
        department,
        programme,
        email,
        password,
        error,
    } = data;

    function getAndSetNames() {
        updateProfile(auth.currentUser, {
            displayName: `${first} ${last}`,
        });
    }

    const handleFileInputChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleFileInputClick = async () => {
        const url = await upload(photo, auth.currentUser, setLoading);
        setPhotoURL(url);
        removeImage();
    };

    const removeImage = () => {
        setPhoto(null);
    };

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleStudentSelectChange = async (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        if (e.target.name === "faculty") {
            getSelectOptions(userFacultyCol, e, "departments", "Department");
        } else if (e.target.name === "department") {
            getSelectOptions(userDepartmentCol, e, "programmes", "Programme");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        setData({ ...data, error: null, loading: true });

        if (
            !first ||
            !last ||
            !matric ||
            !faculty ||
            !department ||
            !programme ||
            !email ||
            !password
        ) {
            toast.error("All fields are required");
        }

        setIsSubmitting(isSubmitting, true);

        await signup(email, password)
            .then(async () => {
                await setDoc(
                    doc(userBioData, auth.currentUser.uid),
                    {
                        uid: auth.currentUser.uid,
                        first,
                        last,
                        matric,
                        faculty,
                        department,
                        programme,
                        email,
                        createdAt: Timestamp.fromdate(new Date()),
                    },
                    setDoc(doc(userType, auth.currentUser.uid), { type: "student" }),
                    setDoc(doc(userState, auth.currentUser.uid), {
                        isOnline: true,
                    })
                );
                getAndSetNames();
                handleFileInputClick();

                toast.success("Verification email sent!");
                router.push("../home");
            })
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => {
                () => {
                    mounted.current && setIsSubmitting(false);
                };
            });
        setData({
            first: "",
            last: "",
            matric: "",
            faculty: "",
            department: "",
            programme: "",
            email: "",
            password: "",
            error: null,
            loading: false,
        });
    };

    return (
        <>
            <ToastContainer />
            <PageHead title={"ADUN Social"} page_name="Sign Up" />
            <main className="px-5 md:lg:px-32 bg-gradient-to-b light-gradient dark:dark-gradient">
                <section className="container h-full mx-auto flex">
                    <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
                        <h1 className="text-6xl font-bold primary-text-color">Sign Up</h1>
                        <p className="mt-4 primary-text-color">
                            Already have an account?{" "}
                            <Link href="../auth" className="cursor-pointer underline">
                                Login
                            </Link>
                        </p>
                        <form onSubmit={handleSignup}>
                            <label className="block mt-6 primary-text-color">
                                First name
                            </label>
                            <input
                                className="signup-form-input"
                                placeholder="First name"
                                type="text"
                                name="first"
                                id="first"
                                value={first}
                                onChange={handleInputChange}
                            />
                            <label className="block mt-6 primary-text-color">Last name</label>
                            <input
                                className="signup-form-input"
                                placeholder="Last name"
                                type="text"
                                name="last"
                                id="last"
                                value={last}
                                onChange={handleInputChange}
                            />
                            <label className="block mt-6 primary-text-color">
                                Profile picture
                            </label>
                            <div>
                                {" "}
                                <input
                                    className="signup-form-input"
                                    placeholder="Last name"
                                    type="file"
                                    name="profilePicture"
                                    id="last"
                                    value={last}
                                    onChange={handleFileInputChange}
                                />
                                {photo && (
                                    <div
                                        onClick={removeImage}
                                        className="cursor-pointer self-end"
                                    >
                                        <p className="text-xs text-red-500 text-center">
                                            Remove
                                            <br />
                                            Image
                                        </p>
                                    </div>
                                )}
                            </div>

                            <label className="block mt-6 primary-text-color">
                                Matric No.
                            </label>
                            <input
                                className="signup-form-input"
                                placeholder="Matric No."
                                name="matric"
                                type="text"
                                value={matric}
                                pattern="^[A-Z]{4}/[A-Z]{2,4}/\d{2}/\d{3}$"
                                onChange={handleInputChange}
                            />
                            <label className="block mt-6 primary-text-color">Email</label>
                            <input
                                className="signup-form-input"
                                placeholder="@example.com"
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
                            <p className="mt-4 primary-text-color">
                                Do not forget your password 🙏
                            </p>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={loading || !photo}
                                    className="mx-auto mt-4 py-4 px-14 font-semibold uppercase rounded-md shadow-md primary-bg-color 
                                    secondary-text-color
                                    focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
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

export default SignUp;
