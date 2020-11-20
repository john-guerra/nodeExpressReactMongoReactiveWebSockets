import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res.posts));
  };

  const startSocket = () => {
    console.log("Connecting to ws");

    const wsc = new WebSocket(process.env.EXPRESS_URL || "ws://localhost:3001");

    wsc.onopen = () => {
      wsc.onmessage = (evt) => {
        console.log("Got request to update", evt.data);
        // get posts everytime there is a change in the db
        getPosts();
      };
    };
  };

  // Get posts the first time
  useEffect(() => {
    getPosts();

    startSocket();
  }, []);

  const renderPosts = () => posts.map((p, i) => <div key={i}>{p.text}</div>);

  console.log("Render App", posts);

  return (
    <div className="App">
      <h1>React with WebSockets</h1>

      <h2>Posts</h2>
      {renderPosts()}
    </div>
  );
}

export default App;
