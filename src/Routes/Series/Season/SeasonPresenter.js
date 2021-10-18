import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Message from "Components/Message";
import DetialContainer from "../../Detail/DetailContainer";

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
  z-index: -2;
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

const SeasonPresenter = (props) => {
  const { result, error, loading } = DetialContainer(props);
  return loading ? (
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
          <title>{result.original_name} | Nomflix</title>
        </Helmet>
        <Content>
          {result.backdrop_path && (
            <Backdrop
              bgImage={`https://image.tmdb.org/t/p/w300${result.backdrop_path}`}
            />
          )}
          {result.seasons.length > 0 &&
            result.seasons.map((data) => (
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
                    <Title>{data.name}</Title>
                    <ItemContainer>
                      {data.air_date && (
                        <Item>{data.air_date.substring(0, 4)}</Item>
                      )}
                      {data.episode_count && (
                        <>
                          <Divider>•</Divider>
                          <Item>episode {data.episode_count}</Item>
                        </>
                      )}
                    </ItemContainer>
                    <Intro>
                      {data.overview.length > 1000
                        ? `${data.overview.substring(0, 1000)}...`
                        : data.overview}
                    </Intro>
                  </Info>
                </Series>
              </>
            ))}
        </Content>
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    </>
  );
};

SeasonPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default SeasonPresenter;
