import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const FalseModal = styled.div`
  height: 92vh;
  overflow: hidden;
  width: 95%;
  background-color: rgba(255, 255, 255, 0.2);
  margin-left: 2rem;
  box-shadow: -2px 4px 60px -2px #ff000050;
  border-radius: 5px;

  .image-gallery-left-nav,
  .image-gallery-right-nav {
    font-size: 2em;
  }
  .image-gallery-fullscreen-button:hover::before,
  .image-gallery-play-button:hover::before,
  .image-gallery-left-nav:hover::before,
  .image-gallery-right-nav:hover::before {
    color: red;
  }
`;

const PostCopy = styled.div`
  padding: 2rem;
`;

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/"
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/"
  }
];

export const ProjPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <FalseModal class="falseModal">
            <ImageGallery
              items={images}
              showPlayButton={false}
              autoPlay={false}
            />
            <div></div>
            <PostCopy>
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <p>{description}</p>
              <PostContent content={content} />
              {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </PostCopy>

            {/* </Modal> */}
          </FalseModal>
        </div>
      </div>
    </section>
  );
};

ProjPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const ProjPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ProjPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Proj">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

ProjPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default ProjPost;

export const pageQuery = graphql`
  query ProjPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
