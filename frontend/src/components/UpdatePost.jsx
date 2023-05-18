import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const UpdatePost = ({ id }) => {
  const postId = useParams().id;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);
  const [post, setPost] = useState({});
  const [postImageUrl, setPostImageUrl] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyChNSP6TgfRcPkl0ycp8-GPyBJrTbNrfQA",
    authDomain: "tastegram-231ce.firebaseapp.com",
    databaseURL:
      "https://tastegram-231ce-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tastegram-231ce",
    storageBucket: "tastegram-231ce.appspot.com",
    messagingSenderId: "577637970756",
    appId: "1:577637970756:web:d994586df7240fefbb5d11",
    measurementId: "G-9L76NBD39T",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  useEffect(() => {
    // Fetch the post from MongoDB
    async function fetchPost() {
      const response = await fetch(`http://localhost:8080/api/posts/${postId}`);
      const data = await response.json();
      setPost(data);
      setCaption(data.postCaption);
      setPostImageUrl(data.postImageUrl);
    }
    fetchPost();
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
    e.target.value = null;
  };

  const handleFileDelete = (fileName) => {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== fileName));
  };

  const handlePostUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingPost(true);

    try {
      if (selectedFiles.length === 0) {
        console.log("Please select an image");
        return;
      }

      const storage = getStorage();
      const postImage = selectedFiles[0];
      const storageRef = ref(storage, `images/${postImage.name}`);
      const snapshot = await uploadBytes(storageRef, postImage);
      const postImageUrl = await getDownloadURL(snapshot.ref);

      const updatedPost = {
        postCaption: caption,
        postImageUrl: postImageUrl,
      };

      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (response.ok) {
        console.log("Post updated successfully!");
        // Redirect to the post detail page
        window.location.href = "/";
      } else {
        console.log("Failed to update post!");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to update post!");
    } finally {
      setIsUpdatingPost(false);
    }
  };

  return (
    <div className="updatepost mt-6 text-center">
      <h1 className="text-5xl">Update Post</h1>
      <form onSubmit={(e) => handlePostUpdate(e)}>
        <div className="updateform rounded-lg">
          <div>
            {postImageUrl && (
              <img
                className="mt-4 opacity-40 rounded-sm"
                src={postImageUrl}
                alt="Post Image"
              />
            )}
            <div>
              <label
                htmlFor="upload"
                className="block text-base font-medium text-gray-700 hover:text-gray-800 mt-4 ml-4"
              >
                <div className="flex items-center space-x-2">
                  <BsFillPlusCircleFill className="text-purple-500" />
                  <span>Add Image</span>
                </div>
              </label>

              {/* preview here */}
              <div className="flex">
                {selectedFiles.map((file) => (
                  <div key={file.name} className="flex items-center mt-2 ml-4">
                    <div className="w-20 h-20 relative rounded-md overflow-hidden flex">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="top-0 left-0 w-full h-full object-cover border-2 border-gray-200 border-rounded-md rounded-md mb-4"
                      />
                      <button
                        className="absolute top-0 mx-auto p-1 bg-red-500 text-xs text-gray-200 rounded-full hover:bg-red-600 transition duration-200 opacity-75 hover:opacity-90 w-5"
                        onClick={() => handleFileDelete(file.name)}
                      >
                        <RxCrossCircled />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <input
                type="file"
                accept="image/*"
                id="upload"
                className="sr-only"
                onChange={handleFileSelect}
                multiple
              />
            </div>

            <input
              className="p-2 py-4 rounded-xl w-full border border-gray-200 text-gray-700  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mt-4 ml-2"
              type="text"
              placeholder={caption}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="justify-between">
            <Link
              to="/"
              className="mt-4 mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Cancel
            </Link>
            <button
              type="submit"
              onClick={handleOpen}
              className="mt-4 mr-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Update
            </button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <p className="flex-none">Please wait..</p>
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
