import useUser from "@/hooks/useUser";
import useFetch from "@/hooks/useFetch";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageHead } from "@/components/WebHeader";
import { SectionData } from "@/components/SectionData";
import { SkeletonSectionData } from "@/components/Skeleton";
import { PageError } from "@/components/PageError";
import { Stats } from "@/components/Stats";
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

function Edit({ accessToken }) {
  const { isError, user } = useUser(accessToken);
  const { data: articles, isLoading, mutate } = useFetch(user?.articles);

  const handlerdeletePost = () => {
    mutate();
  };

  return (
    <>
      <PageHead title="Panel - Hol4 Mund0" />
      <main className="flex flex-col items-center min-h-screen">
        <NavBar accessToken={accessToken} />

        {isLoading && <SkeletonSectionData className="mt-24" />}
        {isError && <PageError message={isError.message} />}
        {articles && !isError && (
          <>
            <Stats articles={articles} />
            <SectionData
              articles={articles}
              className="mt-20"
              manage={true}
              handlerdeletePost={handlerdeletePost}
              accessToken={accessToken}
            />
          </>
        )}
        <Footer />
      </main>
    </>
  );
}

export default Edit;
