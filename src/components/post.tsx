import React from "react";
import { Link } from "react-router-dom";

interface State {
  posts: any;
  author: string;
}

interface Props {
  match: any;
  location: any;
}

class Post extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: null,
      author: ""
    };
  }

  public componentDidMount() {
    const { location } = this.props;
    this.getposts();

    const author =
      location && location.search
        ? decodeURI(location.search.split("=")[1])
        : "";
    this.setState({
      author
    });
  }

  public getposts = async () => {
    const { match } = this.props;
    const { userId } = match.params;
    await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}&skip=0&limit=10`
    )
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts
        });
      });
  };

  render() {
    const { posts, author } = this.state;
    const { match } = this.props;
    const { userId } = match.params;
    return (
      <div className="container">
        <h2 className="center">More posts from '{author}'</h2>
        {posts ? (
          <section>
            <ul className="shadow">
              {posts.map((post: any, i: number) => {
                return (
                  <li key={i}>
                    <Link to={`/postdetails/${post.id}?userId=${userId}`}>
                      {post.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <h4 className="center">Click on post to see details</h4>
          </section>
        ) : (
          <div className="center">Loading...</div>
        )}
      </div>
    );
  }
}

export default Post;
