import { useState } from "react";
import { PageHead } from "@/components/WebHeader";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import { AiFillGithub } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";

function Login({ providers }) {

  const [loading, setLoading] = useState({
    twitter: false,
    github: false
  })


  const handlerSignIn = (provider_id) => {


    if (provider_id === "twitter")
      setLoading({ ...loading, twitter: !loading.twitter })
    else if (provider_id === "github")
      setLoading({ ...loading, github: !loading.github })

    signIn(provider_id)

  }

  return (
    <>
      <PageHead title="Acceder - Hol4 Mund0" />
      <main className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl normal-case btn btn-ghost text-colored">¡ Bievenido !</h1>
        <h4 className="normal-case font-medium">Accede a tu cuenta o crea una cuenta</h4>

        <div className="p-4 w-72 space-y-4">

          {Object.values(providers).map((provider) => (
            < div key={provider.name} >
              {
                provider.name == "GitHub" &&
                <button className="btn btn-outline btn-neutral sm:btn-sm w-full" onClick={() => handlerSignIn(provider.id)}>
                  <span className={
                    loading.github ? "loading loading-spinner" : "hidden"
                  }></span>
                  Accede con {provider.name}
                  <AiFillGithub className="text-xl" />
                </button>
              }
              {
                provider.name == "Twitter (Legacy)" &&
                <button className="btn btn-neutral sm:btn-sm w-full" onClick={() => handlerSignIn(provider.id)}>
                  <span className={
                    loading.twitter ? "loading loading-spinner" : "hidden"
                  }></span>
                  Accede con X
                  <BsTwitterX className="text-md" />
                </button>
              }
            </div>
          ))}
        </div>
      </main >
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  }
}

export default Login;
