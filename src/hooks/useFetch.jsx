import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [nextPage, setNextPage] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      json = null;
      setError(err.message);
    } finally {
      setData(json.results);
      setLoading(false);
      if (json.next) setNextPage(json.next);
      return { response, json };
    }
  }, []);

  return { data, loading, error, request, nextPage };
};

export default useFetch;
