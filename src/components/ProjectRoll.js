/* eslint-disable react/prefer-stateless-function */
import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import styled from "styled-components";
import Project from "./Tile";

const ProjectRollStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  @media (min-width: 1025px) {
    padding: 4rem 1rem;
  }
`;

class ProjRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <ProjectRollStyled>
        {posts &&
          posts.map(({ node: post }) => (
            <Project key={post.id}>
              <div>
                <Link to={post.fields.slug}>
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.featuredimage,
                      alt: `featured image thumbnail for post ${post.title}`
                    }}
                  />
                  <h1>
                    {post.frontmatter.title}
                    {console.log(data)}
                  </h1>
                </Link>
              </div>
            </Project>
          ))}
      </ProjectRollStyled>
    );
  }
}

ProjRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query ProjRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "project" } } }
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
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 420, quality: 80) {
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
    render={(data, count) => <ProjRoll data={data} count={count} />}
  />
);
