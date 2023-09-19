import { Post } from "@/components/Post";
import { getToken } from "next-auth/jwt"

export async function getServerSideProps(context) {
  const req = context.req;
  let accessToken = false;
  const token = await getToken({ req })

  if (token) {
    accessToken = token.accessToken
  }

  return {
    props: {
      accessToken,
    },
  };
}

function NewArticle({ accessToken }) {
  return <Post accessToken={accessToken} />;
}

export default NewArticle;
