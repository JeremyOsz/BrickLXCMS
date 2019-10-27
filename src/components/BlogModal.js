import React from "react";
import FalseModal from "./FalseModal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const PostCopy = styled.div`
  padding: 2rem;
`;

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  galleryImages,
  tags,
  title,
  helmet
}) => {
  const toggleDescription = e => {
    let slideClicked = e.target.parentElement.parentElement.classList;
    slideClicked.contains("clicked")
      ? slideClicked.remove("clicked")
      : slideClicked.add("clicked");
  };
  const PostContent = contentComponent || Content;
  const images = galleryImages
    ? galleryImages.map(img => {
        return {
          original: img.image.childImageSharp.fluid.src,
          thumbnail: img.image.childImageSharp.fluid.src,
          description: img.caption
        };
      })
    : [
        ({
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
        })
      ];

  return (
    <FalseModal className="falseModal content">
      <ImageGallery
        className={"image-gallery"}
        items={images}
        showPlayButton={false}
        autoPlay={false}
        onClick={toggleDescription}
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
  );
};

const BlogModal = ({ title, fullpost, type, image }) => (
  <>
    {type === "CMS" ? (
      <BlogPostTemplate
        content={fullpost.html}
        contentComponent={HTMLContent}
        description={fullpost.frontmatter.description}
        galleryImages={fullpost.frontmatter.galleryImages}
        helmet={
          <Helmet titleTemplate="%s | Proj">
            <title>{`${title}`}</title>
            <meta
              name="description"
              content={`${fullpost.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={fullpost.frontmatter.tags}
        title={title}
      />
    ) : (
      <FalseModal className="falseModal content">
        <ImageGallery
          className={"image-gallery"}
          items={image}
          showPlayButton={false}
          autoPlay={false}
        />
        {/* </Modal> */}
      </FalseModal>
    )}
  </>
);

export default BlogModal;

// export default ({ src }) => (
//   <StaticQuery
//     query={graphql`
//       query BlogPostModalByID($src: String!) {
//         markdownRemark(id: { eq: $src }) {
//           id
//           html
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             title
//             description
//             tags
//             galleryImages {
//               image {
//                 childImageSharp {
//                   fluid(maxWidth: 1226, quality: 92) {
//                     ...GatsbyImageSharpFluid
//                   }
//                 }
//               }
//               caption
//             }
//           }
//         }
//       }
//     `}
//     render={data => <BlogModal data={data} />}
//   />
// );
