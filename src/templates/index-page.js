import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";

const Background = styled.div`
  background-size: cover;
  background-position: bottom-right;
  height: 100vh;
  width: auto;
  display: block;
  background-image: ${props =>
    `url("
      ${
        props.image.childImageSharp
          ? props.image.childImageSharp.fluid.src
          : props.image
      }
    ")`};
`;

const HeroText = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  @media (max-width: 1024px) {
    font-size: 0.85rem;
    top: 20%;
    left: 10%;
    width: 80%;
  }
  h1 {
    letter-spacing: 8px;
    font-weight: 500 !important;
    font-size: 4rem !important;
    line-height: 1;
  }
  h2 {
    color: red;
    letter-spacing: 5.25px;
    font-size: 1.5rem;
  }
  h3 {
    font-weight: 400 !important;
    font-size: 1.75rem !important;
    letter-spacing: 4.5px;
  }
`;

export const IndexPageTemplate = ({ image, title, subheading, heading }) => (
  <div>
    <Background image={image} className="margin-top-0">
      <HeroText>
        <h2>{title}</h2>
        <h1 className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen">
          {heading}
        </h1>
        <h3 className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
          {subheading}
        </h3>
      </HeroText>
    </Background>
  </div>
);

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout page="index">
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        heading
        subheading
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
