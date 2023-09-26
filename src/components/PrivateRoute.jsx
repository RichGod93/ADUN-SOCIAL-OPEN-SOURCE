// components/PrivateRoute.js
import { useAuth } from "@/context/AppContextProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";


const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const {currentUser} = useAuth()

  useEffect(() => {
    if (!currentUser) {
      // If the user is not authenticated, redirect to the login page
      router.push("/auth/login");
    }
  }, [currentUser, router]);

  // Render the children (the protected content) if authenticated
  return currentUser ? children : null;
};

export default PrivateRoute;
