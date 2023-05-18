import { BsFillPlusCircleFill } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CreatePost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
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

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
    e.target.value = null;
  };

  const handleFileDelete = (fileName) => {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== fileName));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingPost(true);

    try {
      const storage = getStorage();
      const postImage = selectedFiles[0];
      const storageRef = ref(storage, `images/${postImage.name}`);
      const snapshot = await uploadBytes(storageRef, postImage);
      const postImageUrl = await getDownloadURL(snapshot.ref);

      const formData = new FormData();
      formData.append("postCaption", caption);
      formData.append("postImageUrl", postImageUrl);

      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setPostCreated(true);
        setSelectedFiles([]);
        setCaption("");
        console.log("Post created successfully!");
        // refresh page
        window.location.reload();
      } else {
        console.log("Failed to create post!");
      }
    } catch (error) {
      console.log(error);
      console.log("Failed to create post!");
    } finally {
      setIsCreatingPost(false);
      console.log("Post created successfully!");
    }
  };

  return (
    <div className="createpost rounded-xl dark:bg-slate-800 text-white">
      <form onSubmit={handleSubmit}>
        <input
          className="p-2 py-4 rounded-xl w-full border border-gray-200 dark:bg-gray-200 text-gray-700  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="text"
          placeholder="Add Caption to Your Awesome Food"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className="flex justify-between">
          <div>
            <label
              htmlFor="upload"
              className="block text-base font-medium text-gray-700 hover:text-gray-800 mt-4 ml-4"
            >
              <div className="flex items-center space-x-2">
                <BsFillPlusCircleFill className="text-purple-500" />
                <span className="dark:text-white text-slate-700">Add Image</span>
              </div>
            </label>
            <div className="flex">
              {selectedFiles.map((file) => (
                <div key={file.name} className="flex items-center mt-2 ml-4">
                  <div className="w-20 h-20 relative rounded-md overflow-hidden flex">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="top-0 left-0 w-full h-full object-cover border-2 border-gray-200 border-rounded-md rounded-md"
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

          <div>
            <button
              className="mt-3 mr-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded-full"
              onClick={handleOpen}
            >
              POST
            </button>

            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <p className="flex-none ">Please wait..</p>
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
