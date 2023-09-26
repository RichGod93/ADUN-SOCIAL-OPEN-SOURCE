import { CreatePost, Feed, HomeLayout, PageHead } from "@/components";
import PrivateRoute from "@/components/PrivateRoute";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = ({ posts }) => {
  const router = useRouter();

  return (
    <PrivateRoute>
      <PageHead title="ADUN Social" page_name="Home" />
      <HomeLayout>
        <div className="h-screen flex flex-col items-center">
          <div className="mt-3 space-y-5">
            {/* create post component */}
            <CreatePost />
            {/* news feed component */}
            <Feed posts={posts} />
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
    </PrivateRoute>
  );
};

export default HomePage;
