import React from "react";

interface State {
  postData: any;
  commentData: any;
  hideComment: boolean;
  page: number;
  userId: string;
}

interface Props {
  match: any;
  history: any;
  location: any;
}

class PostDetails extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      postData: null,
      commentData: null,
      hideComment: true,
      page: 1,
      userId: ""
    };
  }

  public componentDidMount() {
    const { location } = this.props;
    this.getpost();

    const userId =
      location && location.search
        ? decodeURI(location.search.split("=")[1])
        : "";
    this.setState({
      userId
    });
  }

  private getpost = async () => {
    const { match } = this.props;
    const { postId } = match.params;
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(postData => {
        this.setState({
          postData
        });
      });
  };

  private getComment = async () => {
    const { match } = this.props;
    const { page } = this.state;
    const { postId } = match.params;
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments?_page=${page}&_limit=10`
    )
      .then(res => res.json())
      .then(commentData => {
        this.setState({
          commentData,
          hideComment: false
        });
      });
  };

  private deletePost = async () => {
    const { match, history } = this.props;
    const { userId } = this.state;
    const { postId } = match.params;

    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.ok) {
        history.push(`/posts/${userId}`);
      }
    });
  };

  private hideComment = () => {
    this.setState({
      hideComment: true
    });
  };

  private handlePagination = (e: any) => {
    const { page } = this.state;
    const dataId = e.target.getAttribute("data-id");
    const maxPage = 500 / 5; // 500 is max no of objects and 5 is per page limit
    if (dataId === "next" && page < maxPage) {
      this.setState(
        {
          page: page + 1
        },
        this.getComment
      );
    } else if (dataId === "previous" && page > 0) {
      this.setState(
        {
          page: page - 1
        },
        this.getComment
      );
    }
  };

  render() {
    const { postData, commentData, hideComment, page } = this.state;
    const maxPage = 500 / 5;
    return (
      <div className="container">
        <h2 className="center">Post Details</h2>
        {postData ? (
          <div className="shadow">
            <section>
              <div className="pd-title">{postData.title}</div>
              <div>{postData.body}</div>
            </section>

            <div className="pd-btn-container">
              {hideComment ? (
                <button onClick={this.getComment}>Show Comments</button>
              ) : (
                <button onClick={this.hideComment}>Hide Comments</button>
              )}
              <button onClick={this.deletePost}>Delete Post</button>
            </div>

            {commentData ? (
              hideComment ? null : (
                <section>
                  <h4>Comments</h4>
                  <ul className="shadow">
                    {commentData.map((comment: any, i: number) => {
                      return <li key={i}>{comment.name}</li>;
                    })}
                  </ul>

                  <div className="pagination-btn-container">
                    <button className={page < 2 ? 'disabled' : ''} data-id="previous" onClick={this.handlePagination}>
                      Previous
                    </button>
                    <button className={page >= maxPage ? 'disabled' : ''} data-id="next" onClick={this.handlePagination}>
                      Next
                    </button>
                  </div>
                </section>
              )
            ) : null}
          </div>
        ) : (
          <div className="center">Loading...</div>
        )}
      </div>
    );
  }
}

export default PostDetails;
