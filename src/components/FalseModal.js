import styled from "styled-components";

const FalseModal = styled.div`
  height: 92vh;
  overflow: auto;
  width: 95%;
  background-color: #333333;
  margin-left: 2rem;
  box-shadow: -2px 4px 60px -2px #ff000050;
  border-radius: 5px;
  @media (  -width: 1025px) {
    margin: auto;
  }

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
}
.image-gallery-thumbnail.active {
    border: 3px solid #f82b293d;
    border-radius: 3px;
    box-shadow: red;
    box-shadow: 0px 4px 20px -2px #ff000050;
}

  .image-gallery-slide {
    max-height: 80vh;
    cursor: pointer;
    :hover .image-gallery-description {
      opacity: 1;
    }
    .image-gallery-description {
      left: 0;
      bottom: 0;
      right: 0;
      min-height: 100px;
      opacity: 0;
      transition: 0.5s opacity ease-in;
    }
    :hover .image-gallery-description {
      opacity: 1;
    }
    &.clicked .image-gallery-description {
      opacity: 1;
    }
  }
  .fullscreen {
    .image-gallery-slide {
      max-height: 100vh;
      &.clicked .image-gallery-description {
        opacity: 1;
      }
      :hover .image-gallery-description {
        opacity: 1;
      }
    }
  }
`;

export default FalseModal;
