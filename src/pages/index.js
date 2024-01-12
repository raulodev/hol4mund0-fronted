import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageHead } from "@/components/WebHeader";
import { SectionData } from "@/components/SectionData";
import { Pagination } from "@/components/Pagination";
import { SkeletonSectionData } from "@/components/Skeleton";
import { PageError } from "@/components/PageError";
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

export default function Home({ accessToken }) {

  const [pageIndex, setPageIndex] = useState(1);
  const { data, isError, isLoading } = useFetch(`/all/articles/?page=${pageIndex}`);





  return (
    <>
      <PageHead />
      <main className="flex flex-col items-center min-h-screen">
        <NavBar accessToken={accessToken} />

        <div className="h-screen flex flex-col items-center justify-center text-center gap-4">
          <h1 className="text-2xl font-black">Bienvenido a</h1>
          <h1 className="text-6xl md:text-8xl font-black">Hol4 Mund0</h1>
        </div>
        <div>
          <h1 className="text-4xl font-black mt-24 text-colored text-center">Publicaciones Recientes</h1>
        </div>
        {isLoading && <SkeletonSectionData />}
        {isError && <PageError message={isError.message} code={isError.code} />}

        {data && !isError && (
          <div>
            <SectionData articles={data.results} accessToken={accessToken} />
            <Pagination data={data} onPageIndex={setPageIndex} pageIndex={pageIndex} />
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}
