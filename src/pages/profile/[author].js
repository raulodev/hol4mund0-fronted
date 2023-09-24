import Image from "next/image";
import { BsImageAlt } from "react-icons/bs";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { PageHead } from "@/components/WebHeader";
import { Social } from "@/components/Social";
import { SectionData } from "@/components/SectionData";
import { serverApi } from "@/services/api-client";
import { getToken } from "next-auth/jwt"

export async function getServerSideProps(context) {

  const req = context.req;
  let accessToken = false;
  const token = await getToken({ req })

  if (token) {
    accessToken = token.accessToken
  }

  const { author } = context.params;

  let userData;

  try {

    const resAuthor = await serverApi.get(`/user/${author}/detail/`);
    userData = await resAuthor.data;

  } catch (error) {

    return {
      notFound: true,
    };

  }

  const resArticles = await serverApi.get(`/user-articles/${author}/list/`);
  const userArticles = await resArticles.data;

  return {
    props: {
      userData,
      userArticles,
      accessToken
    },
  };
}

const UserDetail = ({ userData, userArticles, accessToken }) => {
  return (
    <>
      <PageHead
        title={userData?.username && "@" + userData.username}
        description={userData?.description && userData.description}
        image={userData?.preview_profile_image}
      />
      <main className="min-h-screen">
        <NavBar accessToken={accessToken} />
        {false ? (
          <Skeleton />
        ) : (
          <div className="flex flex-col items-center gap-5 pt-20">
            <div className="flex flex-col items-center p-4">
              <div className="w-32 h-32 overflow-hidden rounded-full lg:w-56 lg:h-56">
                <Image
                  className="object-cover w-full h-full"
                  src={userData?.preview_profile_image}
                  width={1000}
                  height={500}
                  alt="profile image"
                />
              </div>
              <div className="flex flex-col pt-4">
                {/* nombre */}
                <div className="text-2xl font-bold text-center text-zinc-900">
                  {userData?.first_name && <span> {userData.first_name}</span>}
                  {userData?.last_name && <span> {userData.last_name}</span>}
                </div>
                {/* username */}
                <div className="py-2 text-lg font-light text-center text-zinc-900">
                  {userData?.username && <span> @{userData.username}</span>}
                </div>
                {/* social sections */}
                <Social userData={userData} />
                {/* descripción */}
                {userData?.description && (
                  <div className="text-lg w-64 sm:w-96 lg:w-[40rem] font-light border break-words whitespace-pre-wrap p-4">
                    <span className="font-bold">Bio</span>
                    <br />
                    {userData.description}
                  </div>
                )}
              </div>
            </div>
            <SectionData articles={userArticles} />
            <Footer />
          </div>
        )}
      </main>
    </>
  );
};

const Skeleton = () => {
  return (
    <div className="flex flex-col items-center pt-20">
      <div className="flex items-center justify-center w-56 h-56 p-4 bg-gray-300 rounded-full animate-pulse">
        <BsImageAlt className="text-4xl text-gray-200" />
      </div>
      <div className="flex flex-col items-center justify-center gap-6 mt-10">
        <div className="w-32 h-5 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-56 h-5 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default UserDetail;
