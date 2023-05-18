import * as React from "react";
import { useState, useEffect } from "react";
import {
  BsHeart,
  BsChat,
  BsThreeDots,
  BsHeartFill,
  BsChatFill,
} from "react-icons/bs";
import { MdIosShare } from "react-icons/md";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import image1 from "../assets/user.jpg";
import CommentSection from "./CommentSection";

const Post = ({ post }) => {
  const [open, setOpen] = React.useState(false);
  const [likesCount, setLikesCount] = useState(
    isNaN(post.likesCount) ? 0 : post.likesCount
  );

  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(post.commentIds.length);

  useEffect(() => {
    setCommentCount(post.commentIds.length);
  }, [post.commentIds]);

  useEffect(() => {
    const image = new Image();
    image.src = post.postImageUrl;
    image.onload = () => {
      setImageLoading(false);
    };
  }, [post.postImageUrl]);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      setLiked(false);
      setLikesCount(likesCount - 1);
    }
  };

  const handleComment = () => {
    if (!commented) {
      setCommented(true);
      setCommentsCount(commentsCount + 1);
    } else {
      setCommented(false);
      setCommentsCount(commentsCount - 1);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/${post.postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // delete post from UI
        console.log("Post deleted successfully!");
        // refresh page
        window.location.reload();
      } else {
        console.log(`Failed to delete post. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post mt-4 rounded-xl dark:bg-slate-800 dark:text-white">
      <div className="flex justify-between">
        <div className="flex">
          <div>
            <img
              className="rounded-full h-12 w-12 mt-2 ml-2"
              src={image1}
              alt=""
            />
          </div>
          <div>
            <h1 className="ml-4 mt-3">Ravindu Jayakodi</h1>
            <p className="ml-4 mt-1/2 text-xs text-gray-400">
              {new Date(post.createdDate).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center focus:outline-none"
          >
            <BsThreeDots className="mt-4 mr-4 text-gray-500 text-xl dark:text-white" />
          </button>
          {dropdownOpen && (
            <div className="absolute top-0 right-0 mt-12 mr-10 w-48 bg-white rounded-lg shadow-lg z-10 opacity-70">
              <Link
                to={`/update/${post.postId}`}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:rounded-lg text-center hover:text-gray-900"
              >
                Edit Post
              </Link>
              <button
                onClick={handleClickOpen}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 hover:rounded-lg hover:text-gray-900"
              >
                Delete Post
              </button>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle
                  id="alert-dialog-title"
                  className="text-center text-blue-900 dialog-text"
                >
                  {"Are you sure you want to delete this post?"}
                </DialogTitle>
                <DialogActions>
                  <button
                    className="mt-2 mr-1 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="mt-2 mr-4 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleDeletePost}
                    autoFocus
                  >
                    Delete
                  </button>
                </DialogActions>
              </Dialog>

              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
          )}
        </div>
      </div>

      <div>
        <img
          className="mt-4 rounded-sm"
          src={post.postImageUrl}
          alt="Post Image"
        />

        {imageLoading && (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        )}
      </div>
      <div>
        <p className="mt-4 ml-4 text-sm text-gray-700 dark:text-white">
          {post.postCaption}
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex">
          <button onClick={handleLike} className="flex items-center">
            {liked ? (
              <BsHeartFill className="mt-4 ml-4 text-red-500 text-xl" />
            ) : (
              <BsHeart className="mt-4 ml-4 text-red-500 stroke-current font-bold text-xl" />
            )}
            <span className="ml-2 mt-4 text-gray-500 dark:text-white">
              {likesCount}
            </span>
          </button>
          <button onClick={handleComment} className="flex items-center ml-4">
            <BsChat className="mt-4 ml-2 text-purple-500 stroke-current text-xl" />
            <span className="ml-2 mt-4 text-gray-500 dark:text-white">
              {commentCount}
            </span>
          </button>

          <button className="flex items-center ml-4">
            <MdIosShare className="mt-3 ml-2 text-gray-500 stroke-current text-2xl dark:text-white" />
          </button>
        </div>
      </div>

      <CommentSection post={post} />
    </div>
  );
};

export default Post;
