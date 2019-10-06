import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SiteWrapper from "../components/SiteWrapper";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { Link, graphql, StaticQuery } from "gatsby";
import styled from "styled-components";

import PropTypes from "prop-types";

const TemplateWrapper = ({ children, page }) => {
  // const { frontmatter } = data.markdownRemark;
  const { title, description } = useSiteMetadata();
  // console.log(globalBackground());
  return (
    <SiteWrapper>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <Navbar page={page} />
      {/* <AboutPage1 /> */}
      <PageContent>
        <IndexPageBackground />
        {children}
      </PageContent>
      {/* <Footer /> */}
    </SiteWrapper>
  );
};

export default TemplateWrapper;

const PageContent = styled.div`
  position: relative;
  height: 100vh;
  overflow-y: auto;
  /* @media (min-width: 1250px) {
    padding-top: 3.25rem;
  } */
  @media screen and (max-width: 1023px) {
    padding-top: 3.25rem;
  }
`;
const Background = styled.div`
  background: url(${props => (props.image ? props.image : "palevioletred")});
  background-position: bottom right;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const IndexPageBackground = () => {
  // const { frontmatter } = data.markdownRemark;

  return (
    <StaticQuery
      query={graphql`
        query IndexPageBackground {
          markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
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
      `}
      render={data => (
        <Background
          image={
            data.markdownRemark.frontmatter.image.childImageSharp.fluid.src
          }
        />
      )}
    />
  );
};

IndexPageBackground.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};
