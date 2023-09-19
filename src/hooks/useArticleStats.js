import { useState, useEffect } from 'react';

function useArticleStats(articles) {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const count = articles.length

  useEffect(() => {
    let totalViews = 0;
    let totalLikes = 0;

    articles.forEach((article) => {
      totalViews += article.views;
      totalLikes += article.count_likes;
      
    });

    setViews(totalViews);
    setLikes(totalLikes);
  }, [articles]);

  return { views, likes , count };
}

export default useArticleStats;