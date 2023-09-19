import { PageHead } from "@/components/WebHeader";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import { AiFillGithub, AiFillFacebook, AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";

function Login({ providers }) {

  return (
    <>
      <PageHead title="Acceder" />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold uppercase">Únete</h1>
        <div className="p-4 w-72 space-y-4">

          {Object.values(providers).map((provider) => (

            < div key={provider.name} >
              {
                provider.name == "GitHub" &&
                <button className="btn btn-neutral sm:btn-sm w-full" onClick={() => signIn(provider.id)}>
                  Accede con {provider.name}
                  <AiFillGithub className="text-xl" />
                </button>
              }
              {
                provider.name == "Twitter (Legacy)" &&
                <button className="btn btn-primary sm:btn-sm w-full" onClick={() => signIn(provider.id)}>
                  Accede con Twitter
                  <AiFillTwitterCircle className="text-xl" />
                </button>
              }
              {
                provider.name == "Google" &&
                <button className="btn btn-error sm:btn-sm w-full" onClick={() => signIn(provider.id)}>
                  Accede con {provider.name}
                  <AiFillGoogleCircle className="text-xl" />
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
