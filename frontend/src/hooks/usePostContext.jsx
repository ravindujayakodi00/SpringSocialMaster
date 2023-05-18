import { PostContext } from "../context/PostContext";
import { useContext } from "react";

export const usePostsContext = () => {
    const context = useContext(PostContext);

    if (!context) {
        throw Error(
            "usePostContext must be used within PostContextProvider"
        );
    }

    return context;
}