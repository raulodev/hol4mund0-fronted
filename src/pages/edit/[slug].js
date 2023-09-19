import { Post } from "@/components/Post";
import { serverApi } from "@/services/api-client";
import { getToken } from "next-auth/jwt"

export async function getServerSideProps(context) {
  const req = context.req;
  let accessToken = false;
  const token = await getToken({ req })

  if (token) {
    accessToken = token.accessToken
  }


  let data;
  try {
    const { slug } = context.params;
    const res = await serverApi.get(`/article/edit/${slug}/`);
    data = await res.data;

  } catch (error) {
    if (res.status == 404) {
      return {
        notFound: true,
      };
    }

  }

  return {
    props: {
      data,
      accessToken,
    },
  };
}

function EditArticle({ data, accessToken }) {
  return <Post data={data} accessToken={accessToken} />;
}

export default EditArticle;
