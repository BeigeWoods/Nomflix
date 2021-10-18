import React from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Collection from "Routes/Series/Collection";
import Season from "Routes/Series/Season";
import Message from "Components/Message";
import DetialContainer from "./DetailContainer";

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
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  display: grid;
  grid-template-columns: 487px auto;
  grid-gap: 30px;
`;

const Cover = styled.div`
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-size: contain;
  background-repeat: no-repeat;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 100%;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: bold;
`;

const Homepage = styled.a`
  &:hover {
    color: #d2dae2;
  }
`;

const ItemContainer = styled.div`
  margin: 20px 0 15px;
  line-height: 1.5;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  margin-bottom: 20px;
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 100%;
`;

const IMDbLink = styled.a`
  font-size: 11px;
  font-weight: bold;
  padding: 1px 3px;
  background-color: #f1c40f;
  color: black;
  border-radius: 3px;
`;

const Trailer = styled.iframe`
  margin-bottom: 20px;
  width: 560px;
  height: 315px;
`;

const SeriesBox = styled.div`
  background-color: ${(props) => (props.current ? "#0a3d62" : "#0e5182")};
  width: 230px;
  padding: 10px 8px 13px 8px;
  text-align: center;
  border-radius: 10px;
`;

const SeriesLink = styled(Link)`
  padding-top: 5px;
  font-size: 20px;
`;

const LogoBox = styled.div`
  margin-bottom: 10px;
`;

const Logo = styled.div`
  display: inline-block;
  line-height: 3;
`;

const Companies = styled.img`
  width: auto;
  height: 25px;
  margin-right: 15px;
`;

const DetailPresenter = (props) => {
  const { result, error, loading, isMovie } = DetialContainer(props);
  const {
    location: { pathname },
  } = props;
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
          <title>
            {isMovie ? result.original_title : result.original_name} | Nomflix
          </title>
        </Helmet>
        {result.backdrop_path && (
          <Backdrop
            bgImage={`https://image.tmdb.org/t/p/w300${result.backdrop_path}`}
          />
        )}
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/w300${result.poster_path}`
                : require("../../assets/noPosterSmall.png").default
            }
          />
          <Data>
            {result.homepage && (
              <>
                <Homepage
                  href={result.homepage}
                  target="_blank"
                  title="Go to Homepage"
                >
                  <Title>
                    {isMovie ? result.original_title : result.original_name}
                  </Title>
                </Homepage>
              </>
            )}
            <ItemContainer>
              <Item>
                {isMovie
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date &&
                    result.first_air_date.substring(0, 4)}
              </Item>
              {
                <>
                  <Divider>•</Divider>
                  <Item>
                    {isMovie
                      ? result.runtime !== null &&
                        result.runtime !== 0 &&
                        result.runtime
                      : result.episode_run_time[0] !== null &&
                        result.episode_run_time[0] !== 0 &&
                        result.episode_run_time.length > 0 &&
                        result.episode_run_time[0]}{" "}
                    min
                  </Item>
                </>
              }
              {result.genres.length > 0 && (
                <>
                  <Divider>•</Divider>
                  <Item>
                    {result.genres.map((genre, index) =>
                      index === result.genres.length - 1
                        ? genre.name
                        : `${genre.name} / `
                    )}
                  </Item>
                </>
              )}
              {result.production_countries.length > 0 && (
                <>
                  <Divider>•</Divider>
                  <Item>
                    {result.production_countries.length > 0 &&
                      result.production_countries.map((country, index) =>
                        index === result.production_countries.length - 1
                          ? country.name
                          : `${country.name} / `
                      )}
                  </Item>
                </>
              )}
              {result.imdb_id && (
                <>
                  <Divider>•</Divider>
                  <IMDbLink
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target="_blank"
                    title="Go to IMDb"
                  >
                    IMDb
                  </IMDbLink>
                </>
              )}
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            {result.videos.results.length > 0 && (
              <Trailer
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
              />
            )}
            <LogoBox>
              <Logo>
                {result.production_companies &&
                  result.production_companies
                    .filter((company) => company.logo_path !== null)
                    .map((company) => (
                      <Companies
                        key={company.id}
                        src={`https://image.tmdb.org/t/p/w300${company.logo_path}`}
                      />
                    ))}
              </Logo>
            </LogoBox>
            {isMovie
              ? result.belongs_to_collection && (
                  <SeriesBox current={pathname.includes("/collection")}>
                    <SeriesLink
                      to={`/movie/${result.belongs_to_collection.id}/collection`}
                    >
                      See more Collections ↓
                    </SeriesLink>
                  </SeriesBox>
                )
              : result.seasons.length > 1 && (
                  <SeriesBox current={pathname.includes("/season")}>
                    <SeriesLink to={`/show/${result.id}/season`}>
                      See more Seasons ↓
                    </SeriesLink>
                  </SeriesBox>
                )}
          </Data>
        </Content>
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
      <Route path="/movie/:id/collection" component={Collection} />
      <Route path="/show/:id/season" component={Season} />
    </>
  );
};

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovie: PropTypes.bool.isRequired,
};

export default DetailPresenter;
