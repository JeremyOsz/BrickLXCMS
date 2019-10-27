/* eslint-disable react/prefer-stateless-function */
import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import styled from "styled-components";
import Blog from "./Tile";
import fetch from "node-fetch";
import BlogModal from "./BlogModal";
import Modal from "react-modal";

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
Modal.setAppElement("#___gatsby");
class BlogRoll extends React.Component {
  constructor() {
    super();

    this.state = {
      modalData: "https://www.w3schools.com",
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

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
              slug: post.fields.slug,
              fullpost: post
            };
          })
        : null
    });
  }
  getInstaPosts() {
    const API_KEY = process.env.GATSBY_APIKEY_Instagram; // Get API Key from env variables

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
              image: image.carousel_media
                ? image.carousel_media.map(i => {
                    return {
                      original: i.images.standard_resolution.url,
                      thumbnail: i.images.thumbnail.url,
                      description: image.caption ? image.caption.text : null
                    };
                  })
                : [
                    {
                      original: image.images.standard_resolution.url,
                      thumbnail: image.images.thumbnail.url,
                      description: image.caption ? image.caption.text : null
                    }
                  ],
              thumbnail: image.images.standard_resolution,
              alt: date,
              title: date,
              date: date,
              slug: image.link
            };
          })
        });
      })
      .catch(e => console.error(new Error(e)));
  }
  handleClick(e, link) {
    e.preventDefault();
    this.setState({
      modalData: link
    });
    this.openModal();
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
      <BlogRollStyled id="BlogRoll">
        {OrderedPosts.map(post => {
          return (
            <>
              <Blog key={post.id}>
                <div>
                  {post.type === "CMS" ? (
                    <Link
                      onClick={e => this.handleClick(e, post)}
                      to={post.slug}
                    >
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.image,
                          alt: `featured image thumbnail for post ${post.alt}`
                        }}
                      />
                      <h1>{post.title}</h1>
                    </Link>
                  ) : (
                    <a onClick={e => this.handleClick(e, post)} to={post.slug}>
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.thumbnail.url,
                          alt: `featured image thumbnail for post ${post.alt}`
                        }}
                      />
                      <h1>{post.title.toString().slice(0, 10) + "..."}</h1>
                    </a>
                  )}
                </div>
              </Blog>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Example Modal"
                className="Modal"
                overlayClassName="Overlay"
              >
                <BlogModal {...this.state.modalData}></BlogModal>
              </Modal>
            </>
          );
        })}
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
              html
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                description
                tags
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                galleryImages {
                  image {
                    childImageSharp {
                      fluid(maxWidth: 1226, quality: 92) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  caption
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
