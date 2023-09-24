import Image from "next/image";
import { PageHead } from "@/components/WebHeader";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import { AiFillGithub, AiFillGoogleCircle, AiFillTwitterCircle } from "react-icons/ai";
import logo from "../../../public/android-chrome-512x512.png"

function Login({ providers }) {

  return (
    <>
      <PageHead title="Acceder - Hol4 Mund0" />
      <main className="flex flex-col items-center justify-center min-h-screen gap-5">
        <Image src={logo} width={30} height={30} />
        <div className="p-4 w-72 space-y-4">

          {Object.values(providers).map((provider) => (
            < div key={provider.name} >
              {
                provider.name == "GitHub" &&
                <button className="btn btn-outline btn-neutral sm:btn-sm w-full" onClick={() => signIn(provider.id)}>
                  Accede con {provider.name}
                  <AiFillGithub className="text-xl" />
                </button>
              }
              {
                provider.name == "Twitter (Legacy)" &&
                <button className="btn btn-outline btn-primary sm:btn-sm w-full" onClick={() => signIn(provider.id)}>
                  Accede con Twitter
                  <AiFillTwitterCircle className="text-xl" />
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
