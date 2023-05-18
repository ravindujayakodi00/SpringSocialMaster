import prashan from "../assets/prashan.jpeg";
import { useState, useEffect } from "react";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";

const CommentSection = ({ post }) => {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteClickOpen = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // delete post from UI
        console.log("Comment deleted successfully!");
        // refresh page
        window.location.reload();
      } else {
        console.log(
          `Failed to delete Comment. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error deleting Comment:", error);
    }
  };

  const handleUpdate = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ commentText }),
        }
      );

      if (response.ok) {
        // Update the comment in the posts state
        const updatedPosts = posts.map((p) => {
          const updatedComments = p.comments.map((comment) => {
            if (comment.commentId === commentId) {
              // Update the comment text
              return { ...comment, commentText };
            }
            return comment;
          });
          return { ...p, comments: updatedComments };
        });
        setPosts(updatedPosts);
        console.log("Comment updated successfully!");
        handleClose(); // Close the dialog
        // refresh page
        window.location.reload();
      } else {
        console.log(
          `Failed to update comment. Status code: ${response.status}`
        );
      }
    } catch (error) {
      console.log("Error updating comment:", error);
      //refresh page
      window.location.reload();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the comment
    const newComment = {
      commentText,
      post: {
        postId: post.postId,
      },
    };
    fetch("http://localhost:8080/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedPosts = posts.map((p) => {
          if (p.postId === post.postId) {
            p.comments.push(data);
          }
          return p;
        });
        setPosts(updatedPosts);
        setCommentText("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="comment-input">
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="px-2 py-1 mt-4 rounded-xl w-full border border-gray-200 text-gray-700  focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
          <div className="grid justify-items-end">
            <button
              type="submit"
              className="mr-6 mt-2 text-purple-400 hover:text-purple-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      {post.commentIds.map((comment) => (
        <div className="flex mb-2" key={comment.commentId}>
          <div className="flex">
            <div>
              <img
                className="rounded-full h-8 w-8 mt-2 ml-2"
                src={prashan}
                alt=""
              />
            </div>
            <div className="w-32">
              <h1 className="ml-2 mt-2 text-xs">Username</h1>
              <p className="ml-2 mt-1/2 text-xxs text-gray-400 pr-2">
                {moment(comment.createdDate).fromNow()}
              </p>
            </div>
          </div>

          <div className="comment-text items-baseline">
            <p className="mt-2 ml-6 text-xs font-extralight text-gray-700">
              {comment.commentText}
            </p>
            <button
              onClick={handleDeleteClickOpen}
              className="ml-6 mt-0 text-xxs text-gray-400 hover:text-gray-600"
            >
              Delete
            </button>

            <Dialog open={openDelete} onClose={handleClose}>
              <DialogTitle>
                Are you sure you want to delete this comment
              </DialogTitle>
              <DialogActions>
                <div className="items-center flex-none">
                  <button
                    className="mt-2 mr-1 w-24 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleCloseDelete}
                  >
                    Cancel
                  </button>
                  <button
                    className="mt-2 ml-2 mr-4 w-24 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleDelete(comment.commentId)}
                    autoFocus
                  >
                    Delete
                  </button>
                </div>
              </DialogActions>
            </Dialog>

            <button
              onClick={handleClickOpen}
              className="ml-2 text-xxs text-gray-400 hover:text-gray-600"
            >
              Update
            </button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit Your Comment</DialogTitle>
              <DialogContent>
                <input
                  className="px-2 py-1 mt-4 rounded-xl w-96 border border-gray-200 text-gray-700  focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  type="text"
                  placeholder="Edit your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <div className="items-center ml-4">
                  <button
                    className="mt-2 mr-1 w-24 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="mt-2 ml-2 mr-4 w-24 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleUpdate(comment.commentId)}
                    autoFocus
                  >
                    Edit
                  </button>
                </div>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
