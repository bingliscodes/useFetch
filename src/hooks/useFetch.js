import { useState, useEffect, useCallback } from "react";

const cache = {};

async function sendFetchRequest(url) {
  const response = await fetch(url);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request"
    );
  }

  return resData;
}

function useFetchWithCache(url, cacheKey, timeout) {
  /*
  Function should make a fetch request to the URL 
  It will cache the requests for X seconds
  If the network call is made within that time again, it should give the cached data
  */

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      const currentTime = Date.now();

      const cachedEntry = cache[cacheKey];
      const isCacheValid =
        cachedEntry && currentTime - cachedEntry.timestamp < timeout * 1000;

      if (isCacheValid) {
        setData(cachedEntry.data);
        console.log(
          "Most recent request was made within timeout window. Returning data from cache"
        );
        return;
      }

      setIsLoading(true);
      console.log(
        "No cache requests within timeout window. Making fetch request..."
      );

      try {
        const resData = await sendFetchRequest(url);
        setData(resData);
        cache[cacheKey] = {
          data: resData,
          timestamp: currentTime,
        };
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, cacheKey, timeout]
  );

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}

export default useFetchWithCache;
