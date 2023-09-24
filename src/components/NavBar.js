import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import useUser from "@/hooks/useUser";
import useAxios from "@/hooks/useAxios";
import { signOut } from "next-auth/react"

export function NavBar({ accessToken }) {
  const { isError, isLoading, user } = useUser(accessToken);
  const { post, loading, data } = useAxios()
  const [query, setQuery] = useState("")

  async function handlerSearch() {
    if (query != "") {
      await post("/search/", { "query": query })
    }
  }

  return (
    <div className="fixed z-50 border-b navbar bg-base-100 bg-base-100/95 backdrop-blur">
      <div className="navbar-start">
        <a className="text-xl normal-case btn btn-ghost text-colored">Hol4 Mund0</a>
      </div>
      <div className="navbar-center">
        <div className="dropdown dropdown-bottom flex justify-center">
          <label tabIndex={0} className="btn btn-ghost btn-circle normal-case">
            <AiOutlineSearch className="text-xl sm:text-2xl" />

          </label>
          <div tabIndex={0} className="dropdown-content z-[1] mt-5 menu p-6 shadow-lg bg-base-100 border break-words rounded-box w-80 sm:w-[30rem]">

            <div className="flex gap-1" >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text" placeholder="Buscar" className="input input-bordered w-full input-sm" />
              <button className="btn btn-ghost normal-case btn-sm"
                onClick={handlerSearch}
              >
                {loading ?
                  <span className="loading loading-spinner" />
                  :

                  <AiOutlineSearch className="text-2xl" />
                }
              </button>
            </div>
            <div className="flex flex-col gap-1 ">
              {data?.length == 0 &&

                <span className="text-center text-lg font-medium pt-2">
                  No hay resultados
                </span>

              }

              {data?.map(article =>
                <div key={article.id} className="text-lg font-semibold border-b py-3">
                  <p className="text-sm font-normal">{article.first_name ? article.first_name : article.author}</p>
                  <Link href={`${article.author}/${article.slug}`} className="hover:underline">{article.title}</Link></div>
              )}

            </div>
          </div>
        </div>

      </div>
      <div className="navbar-end">
        {!isError && !isLoading ? (
          <DropDown user={user} />
        ) : (
          <Link className="btn btn-neutral btn-sm" href="/login">
            Acceder
          </Link>
        )}
      </div>
    </div>
  );
}

const DropDown = ({ user }) => {
  return (
    <div className="dropdown dropdown-end ">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image
            title="ver perfil"
            className="object-cover w-full h-full"
            src={user.preview_profile_image}
            width={50}
            height={50}
            alt="image profile"
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content mt-5 z-[1] bg-base-100 bg-base-100/95 backdrop-blur p-2 shadow  rounded-box w-52"
      >
        <li className="flex">
          <div className="flex flex-col px-4 py-3">
            <span className="block text-sm text-gray-900">
              {user.first_name ? user.first_name : user.username}
            </span>
            <span className="block text-sm text-gray-500 truncate">{user.email}</span>
          </div>
        </li>
        <li className="flex">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/new-post">Redactar</Link>
        </li>
        <li>
          <Link href="/dashboard">Panel</Link>
        </li>
        <li>
          <Link href={`/profile/${user.username}`}>Perfil</Link>
        </li>
        <li>
          <Link href="/settings">Ajustes</Link>
        </li>
        <li>
          <button onClick={signOut}>Salir</button>
        </li>
      </ul>
    </div>
  );
};
