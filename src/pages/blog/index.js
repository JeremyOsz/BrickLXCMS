import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import Header from "../../components/Header";

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout page="news">
        {/* <div>
          <Header className="has-text-weight-bold is-size-1">News</Header>
        </div> */}
        <div className="content">
          <BlogRoll />
        </div>
      </Layout>
    );
  }
}
