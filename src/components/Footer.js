import styled from "styled-components";

export default function Footer({ movieTitle, moviePoster, ...otherProps }) {
  return (
    <FooterStyle>
      {movieTitle === undefined && moviePoster === undefined ? undefined : (
        <>
          <FooterFigure>
            <img src={moviePoster} alt="movie poster" />
          </FooterFigure>
          <div>
            <p>{movieTitle}</p>
            <p>{otherProps.date}</p>
          </div>
        </>
      )}
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 117px;
  padding: 14px 10px;
  background-color: #dfe6ed;
  border-top: 1px solid #9eadba;

  p {
    color: #293845;
    font-size: 25px;
  }
`;

const FooterFigure = styled.figure`
  width: 64px;
  height: 89px;
  margin-bottom: 0;
  margin-right: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 11px;

  img {
    width: 48px;
    height: 72px;
  }
`;
