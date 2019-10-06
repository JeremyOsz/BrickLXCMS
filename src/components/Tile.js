import styled from "styled-components";

const Tile = styled.div`
    display: block;
    position: relative;
    object-fit: cover;
    margin: 1rem 1%;
    border-radius: .5rem;
    overflow: hidden;
    width: 14.65%;
    padding-top: 14.65%;
    bottom: 0;  
      transition: all 0.15s ease;
    @media (max-width: 1550px) {
      width: 18%;
    padding-top: 18%;
    }
    @media (max-width: 1150px) {
      width: 23%;
      padding-top: 23%;
    }
    @media (max-width: 720px) {
        width: 41%;
        padding-top: 41%;
        margin: 1rem 4%;font-size: 1.5em;
    }

    :hover{
      box-shadow: 0px 0px 29px 10px #da000087;
      bottom: 3px; 
    }
  > div {
    position: absolute !important;
    top:0;
    left: 0;
    right:0;
    bottom:0;
    h1{
      display: inline-block;
      width: max-content;
      position: absolute;
      bottom: 1rem;
      left: 0;
      right: 0;
      margin: auto;
      padding: 0 5px;
      background: rgba(0, 0, 0, 0.5);
      max-width: 90%;
      text-align: center;
      @media (max-width: 1025px) {
        
        font-size: 1.5rem;
    }
    }
    a{
        height: 100%;
    width: 100%;
    display: block;
    }
    .gatsby-image-wrapper{
      height:100%;
      width:100%;
    }
  }
}`;

export default Tile;
