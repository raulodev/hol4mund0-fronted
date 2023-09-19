import { useState, useEffect } from "react";

function useData(obj) {
  const [data, setData] = useState();

  useEffect(() => {
    if (obj) {
      setData(obj);
    }
  }, [obj]);

  return { data, setData };
}

export default useData;
