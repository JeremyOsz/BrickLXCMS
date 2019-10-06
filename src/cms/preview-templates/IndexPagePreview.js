import React from "react";
import PropTypes from "prop-types";
import { IndexPageTemplate } from "../../templates/index-page";
import styled from "styled-components";

const Background = styled.div`
  background-size: cover;
  background-position: bottom-right;
  height: 100vh;
  width: auto;
  display: block;
`;

const PreviewStyles = styled.div`
  .frame-content {
    height: 100vh;
  }
  position: absolute;
  top: 20%;
  left: 20%;
  @media (max-width: 1023px) {
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

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    return (
      <PreviewStyles>
        <IndexPageTemplate
          image={data.image}
          title={data.title}
          heading={data.heading}
          subheading={data.subheading}
        />
      </PreviewStyles>
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default IndexPagePreview;
