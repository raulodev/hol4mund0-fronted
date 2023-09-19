import { useEffect, useState } from "react";
import useFetch from "./useFetch";

function useArticle(api) {
  const { data : article , isLoading, isError  } = useFetch(api);
  const { data : comments, mutate: updateComments , isLoading : isLoadingComments } = useFetch(article?.comments);
  const [tags, setTags] = useState([]);



  useEffect(() => {
    if (article) {
      setTags(JSON.parse(article.tags));
    }
  }, [api]);

  return { isLoading , isError , isLoadingComments  , article , tags , comments , updateComments};
}

export default useArticle;
