import React from "react";
import "./App.scss";
import Home from "./components/home";
import Post from "./components/post";
import PostDetails from "./components/postDetails";

import { BrowserRouter, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/posts/:userId" component={Post} />
          <Route path="/postdetails/:postId" component={PostDetails} />
          <div className="center">
            <Link to="/">Home</Link>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
