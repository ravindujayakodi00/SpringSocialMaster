import { CommentContext } from "../context/CommentContext";
import { useContext } from "react";

export const useCommentsContext = () => {
    const context = useContext(CommentContext);

    if (!context) {
        throw Error(
            "useCommentContext must be used within CommentContextProvider"
        );
    }

    return context;
}