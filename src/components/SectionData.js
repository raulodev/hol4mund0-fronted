import { Card } from "./Card";

export const SectionData = ({ articles, className, manage, handlerdeletePost, accessToken }) => {
  return (
    <div className={className ? className : "mt-10"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((art) => (
          <Card
            key={art.id}
            manage={manage}
            id={art.id}
            url={art.url}
            author_id={art.author_id}
            author_username={art.author_username}
            author_first_name={art.author_first_name}
            author_image={art.author_preview_profile_image}
            title={art.title}
            image={art.preview_cover_image}
            content={art.content}
            created_at={art.created_at}
            updated_at={art.updated_at}
            tags={art.tags}
            slug={art.slug}
            likes={art.count_likes}
            views={art.views}
            is_draft={art.is_draft}
            handlerdeletePost={handlerdeletePost}
            accessToken={accessToken}
          />
        ))}
      </div>
    </div>
  );
};
