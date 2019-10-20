/* eslint-disable react/prefer-stateless-function */
import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import styled from "styled-components";
import Blog from "./Tile";
import fetch from "cross-fetch";

const BlogRollStyled = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 1rem 1.5rem;
  background: #968e8e52;
  border-radius: 0px;
  box-shadow: -2px 4px 60px -2px #ff000066;
  @media (min-width: 1025px) {
    margin: 3rem 3rem;
    padding: 2rem 2rem;
  }
`;

class BlogRoll extends React.Component {
  generateBlogRoll() {
    const instagramPosts = this.state.instagram_posts
      ? this.state.instagram_posts
      : [];
    const cmsPosts = this.state.cms_posts ? this.state.cms_posts : [];
    const AllPosts = [...cmsPosts, ...instagramPosts];

    const OrderedPosts = AllPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

    return OrderedPosts;
  }
  getCMSPosts() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    this.setState({
      cms_posts: posts
        ? posts.map(({ node: post }) => {
            let date = new Date(post.frontmatter.date);
            return {
              type: "CMS",
              id: post.id,
              image: post.frontmatter.featuredimage,
              alt: `featured image thumbnail for post ${post.title}`,
              title: post.frontmatter.title,
              date: date,
              slug: post.fields.slug
            };
          })
        : null
    });
  }
  getInstaPosts() {
    const API_KEY = process.env.APIKEY_Instagram; // Get API Key from env variables

    // Fetch from Instagram using API key and Count
    fetch(
      `https://api.instagram.com/v1/users/self/media/recent/?access_token=${API_KEY}`
    )
      .then(response => response.json())
      .then(myJSON => {
        this.setState({
          instagram_posts: myJSON.data.map(image => {
            let date = new Date(image.created_time * 1000);
            return {
              type: "instagram",
              id: image.id,
              image: image.images.standard_resolution.url,
              alt: date,
              title: date,
              date: date,
              slug: image.link
            };
          })
        });
      })
      .catch(e => console.log(e));
  }
  componentWillMount() {
    this.getInstaPosts();
    this.getCMSPosts();
  }
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const OrderedPosts = this.generateBlogRoll();

    return (
      <BlogRollStyled>
        {OrderedPosts.map(post => {
          return (
            <Blog key={post.id}>
              <div>
                {console.log(post)}
                {post.type === "CMS" ? (
                  <Link to={post.slug}>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.image,
                        alt: `featured image thumbnail for post ${post.alt}`
                      }}
                    />
                    <h1>{post.title}</h1>
                  </Link>
                ) : (
                  <a href={post.slug}>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.image,
                        alt: `featured image thumbnail for post ${post.alt}`
                      }}
                    />
                    <h1>{post.title.toString().slice(0, 10) + "..."}</h1>
                  </a>
                )}
              </div>
            </Blog>
          );
        })}
        {/* <Blog key={post.id}>
                <div>
                  <Link to={post.slug}>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.image.childImageSharp
                          ? post.image.childImageSharp.fluid.src
                          : post.image,
                        alt: `featured image thumbnail for post ${post.alt}`
                      }}
                    />
                    <h1>{post.title}</h1>
                  </Link>
                </div>
              </Blog> */}
      </BlogRollStyled>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
