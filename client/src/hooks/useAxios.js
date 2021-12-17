import { useState, useEffect } from "react";

export default function useAxios(api) {
  const [data, setData] = useState();
  const [msg, setMsg] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!api) return;

    api
      .then(({ data: { data, message } }) => {
        setData(data);
        setMsg(message);
      })
      .then(() => setLoading(false))
      .catch((err) => setError(err.response.status));
  }, []);

  return { data, msg, error, loading };
}
