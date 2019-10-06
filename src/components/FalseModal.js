import styled from "styled-components";

const FalseModal = styled.div`
  height: 92vh;
  overflow: auto;
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

  .image-gallery-slide {
    max-height: 80vh;
    :hover .image-gallery-description {
      visibility: visible;
    }
    .image-gallery-description {
      left: 0;
      bottom: 0;
      right: 0;
      min-height: 100px;
      visibility: hidden;
    }
    :hover .image-gallery-description {
      visibility: visible;
    }
    &.clicked .image-gallery-description {
      visibility: visible;
    }
  }
  .fullscreen {
    .image-gallery-slide {
      max-height: 100vh;
      &.clicked .image-gallery-description {
        visibility: visible;
      }
      :hover .image-gallery-description {
        visibility: visible;
      }
    }
  }
`;

export default FalseModal;
