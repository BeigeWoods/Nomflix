import { moviesApi, tvApi } from "api";
import { useState, useEffect } from "react";

const DetialContainer = (props) => {
  const {
    location: { pathname },
  } = props;
  const [state, setState] = useState({
    result: null,
    error: null,
    loading: true,
    isMovie: pathname.includes("/movie/"),
  });
  const getData = async () => {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let { result, isMovie } = state;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      setState({ ...state, error: "Can't find anything." });
    } finally {
      setState({ ...state, loading: false, result });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return state;
};

export default DetialContainer;
