import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/sidebar.css";
import "./styles/post.css";
import "./index.css";
import { CommentContextProvider } from "./context/CommentContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CommentContextProvider>
      <App darkMode={true}/>
    </CommentContextProvider>
  </React.StrictMode>
);





