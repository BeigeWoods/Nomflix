import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import { collectionApi } from "api";

class CollectionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const parsedId = parseInt(id);
    try {
      const { data: result } = await collectionApi.detail(parsedId);
      this.setState({ result });
    } catch {
      this.setState({
        error: "Can't find movie information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return (
      <CollectionPresenter result={result} error={error} loading={loading} />
    );
  }
}

export default CollectionContainer;
