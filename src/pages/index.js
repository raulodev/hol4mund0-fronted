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

  const jokes = [
    "El blog donde encontrarás la guía definitiva de aburrimiento y somnolencia garantizada.",
    "Bienvenidos a nuestro blog, donde el aburrimiento es nuestro mejor aliado... o enemigo.",
    "¿En busca de emociones fuertes? Aquí encontrarás artículos tan emocionantes como ver crecer la hierba.",
    "Nuestro blog es como una montaña rusa... solo que sin montaña y sin rusas.",
    "Advertencia: leer demasiado este blog puede causar agotamiento mental y adicción a los bostezos.",
    "Si buscas respuestas profundas y filosóficas, estás en el lugar equivocado. Aquí encontrarás preguntas aún más confusas.",
    "Te invitamos a nuestro blog de consejos prácticos para olvidar todo lo que te enseñaron en la escuela. ¡Desaprender es el nuevo aprender!",
  ]



  return (
    <>
      <PageHead />
      <main className="flex flex-col items-center min-h-screen">
        <NavBar accessToken={accessToken} />

        <div className="h-screen flex flex-col items-center justify-center text-center gap-4">
          <h1 className="lg:text-2xl font-black">Bienvenido a</h1>
          <h1 className="text-7xl lg:text-8xl font-black">Hol4 Mund0</h1>
          <h2 className="font-medium italic">{jokes[Math.floor(Math.random() * jokes.length)]}</h2>
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
