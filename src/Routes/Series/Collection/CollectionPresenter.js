import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Message from "Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  background-attachment: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;

const Content = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;

const Series = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  grid-gap: 20px;
  margin-bottom: 20px;
`;

const Poster = styled.img`
  width: 100px;
  height: 140px;
`;

const Info = styled.div``;

const Title = styled.h3`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin-bottom: 10px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Intro = styled.p`
  opacity: 0.7;
`;

const CollectionPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      <Container>
        <Helmet>
          <title>{result.name} | Nomflix</title>
        </Helmet>
        {result.backdrop_path && (
          <Backdrop
            bgImage={`https://image.tmdb.org/t/p/w300${result.backdrop_path}`}
          />
        )}
        <Content>
          {result.parts.length > 0 &&
            result.parts.map((data) => (
              <>
                <Series key={data.id}>
                  <Poster
                    src={
                      data.poster_path || data.poster_path !== null
                        ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
                        : require("../../../assets/noPosterSmall.png").default
                    }
                  />
                  <Info>
                    <Title>{data.title}</Title>
                    <ItemContainer>
                      {data.release_date && (
                        <Item>{data.release_date.substring(0, 4)}</Item>
                      )}
                      {data.vote_average > 0 && (
                        <>
                          <Divider>•</Divider>
                          <Item>⭐ {data.vote_average}/10</Item>
                        </>
                      )}
                    </ItemContainer>
                    <Intro>{data.overview}</Intro>
                  </Info>
                </Series>
              </>
            ))}
        </Content>
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    </>
  );

CollectionPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default CollectionPresenter;
