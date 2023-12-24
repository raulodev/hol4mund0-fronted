import { AiFillHeart } from "react-icons/ai";
import { BsFillLightningChargeFill, BsPenFill } from "react-icons/bs";
import useArticleStats from "@/hooks/useArticleStats";

export function Stats({ articles }) {
  const { likes, views, count } = useArticleStats(articles);

  return (
    <div className="stats shadow mt-28 stats-vertical md:stats-horizontal">
      <div className="stat">
        <div className="stat-figure text-black">
          <BsPenFill className="text-3xl" />
        </div>
        <div className="stat-title">Posts</div>
        <div className="stat-value">{count}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-red-500">
          <AiFillHeart className="text-3xl" />
        </div>
        <div className="stat-title">Likes</div>
        <div className="stat-value">{likes}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-black">
          <BsFillLightningChargeFill className="text-3xl" />
        </div>
        <div className="stat-title">Visitas</div>
        <div className="stat-value">{views}</div>
      </div>
    </div>
  );
}
