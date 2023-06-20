import React from "react";
import Posts from "./Posts";

export default function Feed({ posts }) {
    return (
        <div className="pb-10 flex flex-col items-center overflow-y-scroll scrollbar-hide">
            <div className="">
                {/* Posts */}
                <Posts posts={posts} />
            </div>
        </div>
    );
}
