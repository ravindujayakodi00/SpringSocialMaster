import React, { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="home mt-2">
      <CreatePost />
      {[...posts].reverse().map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
  
};

export default Home;
