import React, { Fragment } from "react";
import { Link } from "react-router-dom";

interface State {
  apiData: any;
}

class Home extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      apiData: null
    };
  }

  public componentDidMount() {
    this.getData();
  }

  public getData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(apiData => {
        this.setState({
          apiData
        });
      });
  };

  render() {
    const { apiData } = this.state;
    return (
      <Fragment>
        {apiData ? (
          <div className="container">
            <h2 className="center">Welcome to the awesome app!</h2>
            <table className="shadow">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Blog Post</th>
                </tr>
              </thead>
              <tbody>
                {apiData.map((data: any, i: number) => {
                  return (
                    <tr key={i}>
                      <td>{data.name}</td>
                      <td>{data.company.name}</td>
                      <td>
                        <Link to={`/posts/${data.id}?author=${data.name}`}>
                          {data.company.bs}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h4 className="center">
              Click on any blog post to see more posts from the author
            </h4>
          </div>
        ) : (
          <div className="center">Loading...</div>
        )}
      </Fragment>
    );
  }
}

export default Home;
