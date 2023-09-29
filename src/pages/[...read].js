import { useState } from "react";
import Image from "next/image";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getToken } from "next-auth/jwt"
import markdownToTxt from "markdown-to-txt";
import { PageHead } from "@/components/WebHeader";
import { NavBar } from "@/components/NavBar";
import { MarkdownRender } from "@/components/MarkdownRender";
import { SectionComment } from "@/components/SectionComment";
import { AuthRequired } from "@/components/Alert";
import { serverApi } from "@/services/api-client";
import useFetch from "@/hooks/useFetch";
import useAxios from "@/hooks/useAxios";
import useGetUserId from "@/hooks/useGetUserId";


export async function getServerSideProps(context) {

  const req = context.req;
  let accessToken = false;
  const token = await getToken({ req })

  if (token) {
    accessToken = token.accessToken
  }


  const { read } = context.params;
  const [author_username, slug] = read;

  let data

  try {
    const res = await serverApi.get(`/article/read/${author_username}/${slug}/`);
    data = await res.data;

  } catch (error) {
    return {
      notFound: true,

    }
  }


  const article = data.id;
  const author = data.author_first_name
    ? data.author_first_name
    : data.author_username;
  const author_image = data.author_preview_profile_image;
  const title = data.title;
  const content = data.content;
  const created_at = data.created_at;
  const updated_at = data.updated_at;
  const cover = data.preview_cover_image;
  const url_comments = data.comments;
  const url_likes = data.likes;
  const string_tags = data.tags;
  const is_draft = data.is_draft;
  const description_page = markdownToTxt(content)

  return {
    props: {
      article,
      author,
      author_image,
      title,
      content,
      created_at,
      updated_at,
      cover,
      url_comments,
      url_likes,
      string_tags,
      accessToken,
      is_draft,
      description_page
    },
  };
}
function Page({
  article,
  author,
  author_image,
  title,
  content,
  created_at,
  updated_at,
  cover,
  url_comments,
  url_likes,
  string_tags,
  accessToken,
  is_draft,
  description_page
}) {
  const [showModal, setShowModal] = useState(false)
  const [tags] = useState(() => JSON.parse(string_tags));
  const { user_id } = useGetUserId(accessToken);
  const { data, isLoading, mutate } = useFetch(url_comments);
  const { data: likes, mutate: updateLikes } = useFetch(url_likes);
  const { post, error } = useAxios();

  function handlerMutate() {
    mutate();
  }

  async function handlerLike() {

    if (!accessToken) {
      setShowModal(true)
      return
    }
    const formData = new FormData();
    formData.append("article", article);
    await post("/like/", formData, accessToken);
    if (error?.response.status == 401) {
      return
    }
    updateLikes()
  }

  return (
    <>
      <PageHead title={title} image={cover} description={description_page} />
      <main className="min-h-screen">
        <NavBar accessToken={accessToken} />
        {/* Ocultar contenido si es un borrador */}
        {is_draft ?
          <HiddenContent /> :
          <div className="flex justify-center pt-20 lg:pt-32">
            <div className="w-full px-4 sm:w-[30rem] sm:px-0 md:w-[38rem] lg:w-[45rem] flex flex-col gap-5">
              {/* cover */}
              <div className="h-40 overflow-hidden lg:h-80">
                <Image
                  className="object-cover w-full h-full"
                  src={cover}
                  width={700}
                  height={200}
                  alt="cover"
                />
              </div>
              {/* titulo */}
              <div className="text-3xl font-black break-words lg:text-4xl">
                {title}
              </div>
              {/* información del autor */}
              <div className="flex gap-4">
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <Image
                    className="object-cover h-full"
                    src={author_image}
                    width={400}
                    height={400}
                    alt="image profile"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-bold">{author}</div>
                  <div className="text-base font-light">{created_at}</div>
                </div>
              </div>
              {/* tags */}
              <div className="flex flex-wrap gap-2">
                {tags?.map((el) => (
                  <span
                    key={el.value}
                    className="p-1 text-gray-600 bg-gray-100 w-max"
                  >
                    {el.label}
                  </span>
                ))}
              </div>

              {/* contenido */}
              <MarkdownRender markdown={content} />
              {/* share section*/}
              <section className="flex items-center mt-10 space-x-5">
                <FacebookShareButton
                  url={typeof window !== "undefined" && window.location.href}
                >
                  <FacebookIcon size={28} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={typeof window !== "undefined" && window.location.href}
                >
                  <TwitterIcon size={28} round={true} />
                </TwitterShareButton>
                <TelegramShareButton
                  url={typeof window !== "undefined" && window.location.href}
                >
                  <TelegramIcon size={28} round={true} />
                </TelegramShareButton>
                <LinkedinShareButton
                  url={typeof window !== "undefined" && window.location.href}
                >
                  <LinkedinIcon size={28} round={true} />
                </LinkedinShareButton>
                {/* Me gusta */}

                <button className="btn btn-sm" onClick={accessToken ? handlerLike : () => setShowModal(true)}>
                  {likes?.length >= 1 && likes.length}
                  {likes?.includes(user_id) ? (
                    <AiFillHeart className="text-error text-2xl" />
                  ) : (
                    <AiOutlineHeart className="text-back text-2xl" />
                  )}
                  Me gusta
                </button>

              </section>
              {/* section comment */}
              {!isLoading && (
                <SectionComment
                  comments={data}
                  article={article}
                  onMutate={handlerMutate}
                  current_user_id={user_id}
                  accessToken={accessToken}
                />
              )}
            </div>
          </div>
        }
        <AuthRequired showModal={showModal} onShowModal={setShowModal} />
      </main>
    </>
  );
}


const HiddenContent = () => {

  return <div className="h-screen flex justify-center items-center">
    <h1 className="text-lg w-full px-4 sm:w-[30rem]  text-center">
      El autor de esta publicación la ha marcado <span className="underline font-semibold">como borrador</span> por lo tanto su contenido no es visible
    </h1>
  </div>
}

export default Page;
