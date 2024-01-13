import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { baseURL } from "@/services/api-client";
import { SlOptionsVertical } from "react-icons/sl";
import { BsFillBarChartFill } from "react-icons/bs";
import useAxios from "@/hooks/useAxios";
import { BsFillLightningChargeFill } from "react-icons/bs";
import {
  AiFillCheckCircle,
  AiFillHeart,
  AiOutlineCalendar,
  AiFillDelete,
  AiFillEdit,
  AiFillInfoCircle
} from "react-icons/ai";

export function Card({
  id,
  manage,
  url,
  author_id,
  author_username,
  author_first_name,
  author_image,
  title,
  image,
  content,
  created_at,
  updated_at,
  tags,
  slug,
  likes,
  views,
  is_draft,
  handlerdeletePost,
  accessToken,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <div className="shadow card w-80 card-compact bg-base-100">
      <figure>
        <div className="relative w-full h-32">
          {image ? (
            <Image
              className="object-cover w-full h-full"
              src={image}
              width={1200}
              height={600}
              alt="image"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex justify-center items-center">
              <span className="text-xl font-bold">404</span>
            </div>
          )}
          <div className="absolute top-0 right-0 p-2">
            {!manage ? (
              <div className="dropdown dropdown-hover dropdown-left">
                <label tabIndex={0} className="m-1 btn btn-ghost btn-circle">
                  <SlOptionsVertical />
                </label>
                <ul
                  tabIndex={0}
                  className="p-2 shadow dropdown-content menu menu-sm bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a
                      onClick={() => {
                        navigator.clipboard.writeText(`${baseURL}/${author_username}/${slug}/`);
                      }}
                    >
                      Copiar enlace
                    </a>
                  </li>

                  {accessToken &&
                    <li>
                      <a onClick={() => setShowModal(!showModal)}>Reportar abuso</a>
                    </li>

                  }
                </ul>
              </div>
            ) : (
              is_draft && <div className="badge badge-neutral">borrador</div>
            )}
          </div>
        </div>
      </figure>
      <div className="card-body">
        <p className="flex items-center gap-1 text-sm">
          <AiOutlineCalendar />
          {created_at}
        </p>
        <h2 className="break-words card-title">{title}</h2>
        <div className="items-center justify-start card-actions">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <Link href={`/profile/${author_username}`}>
              <Image
                title="ver autor"
                className="object-cover w-full h-full"
                src={author_image}
                width={400}
                height={400}
                alt="image profile"
              />
            </Link>
          </div>
          <span className="text-lg font-semibold">
            {author_first_name ? author_first_name : author_username}
          </span>
        </div>
        <div className="justify-end card-actions">
          {manage && (
            <>
              <div className="tooltip" data-tip="eliminar">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => setShowModalDelete(!showModalDelete)}
                >
                  <AiFillDelete className="text-xl" />
                </button>
              </div>

              <div className="tooltip" data-tip="editar">
                <Link href={`/edit/${slug}/`} className="btn btn-error btn-sm">
                  <AiFillEdit className="text-xl" />
                </Link>
              </div>

              <div className="dropdown dropdown-top dropdown-end">
                <div className="tooltip" data-tip="estadísticas">
                  <label tabIndex={0} className="btn btn-primary btn-sm">
                    <BsFillBarChartFill className="text-xl text-white" />
                  </label>
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content z-[1] card card-compact w-64 p-2 shadow-lg bg-white"
                >
                  <div className="card-body">
                    <div className="overflow-x-auto">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>Likes</th>
                            <td className="flex items-center gap-1">
                              <AiFillHeart className="text-sm text-red-500" />
                              {likes}
                            </td>
                          </tr>
                          <tr>
                            <th>Visitas</th>
                            <td className="flex items-center gap-1">
                              <BsFillLightningChargeFill className="text-sm text-yellow-400" />
                              {views}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <Link href={`/${author_username}/${slug}/`} className="btn btn-neutral btn-sm">
            leer
          </Link>
        </div>
      </div>
      <ModalReport accessToken={accessToken} showModal={showModal} onShowModal={setShowModal} articleId={id} />
      <ModalDelete
        showModal={showModalDelete}
        onShowModal={setShowModalDelete}
        articleId={id}
        articleTitle={title}
        handlerdeletePost={handlerdeletePost}
        accessToken={accessToken}
      />
    </div>
  );
}

function ModalReport({ showModal, onShowModal, articleId, accessToken }) {
  const [content, setContent] = useState("");
  const { success, error, loading, post } = useAxios();

  function handlerOnChange(event) {
    setContent(() => event.target.value);
  }

  async function handlerSubmit() {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("article", articleId);


    await post("/reportarticle/", formData, accessToken);
  }

  return (
    <>
      <input checked={showModal} type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Reportar publicación</h3>
          <textarea
            value={content}
            onChange={handlerOnChange}
            className="textarea textarea-bordered w-full textarea-lg mt-1.5"
            placeholder="Contexto"
          />
          {error ? (
            <p className="text-error flex items-center gap-1">
              <AiFillInfoCircle />
              ha ocurrido un error
            </p>
          ) : success &&

          <div className="text-success flex items-center gap-2">
            <AiFillCheckCircle className="text-success" />
            Reporte enviado
          </div>
          }
          <div className="modal-action">
            <button onClick={() => onShowModal(!showModal)} className="btn btn-sm">
              Cerrar
            </button>

            <button onClick={handlerSubmit} className={success ? "hidden" : "btn btn-neutral btn-sm"}>
              {loading ? <span className="loading loading-spinner"></span> : "Reportar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ModalDelete({ showModal, onShowModal, articleId, articleTitle, handlerdeletePost, accessToken }) {
  const { error, loading, del } = useAxios(`/articles/${articleId}`);

  function handlerSubmit() {

    del(accessToken);
    handlerdeletePost();
  }
  return (
    <>
      <input checked={showModal} type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Eliminar publicación</h3>
          <p>
            Seguro que desea eliminar a <span className="font-semibold">{articleTitle}</span> ?
          </p>
          <p>Esta acción no se puede deshacer.</p>

          {error && (
            <p className="text-error flex items-center gap-1">
              <AiFillInfoCircle />
              {error.message}
            </p>

          )}
          <div className="modal-action">
            <button onClick={() => onShowModal(!showModal)} className="btn btn-sm">
              Cerrar
            </button>

            <button onClick={handlerSubmit} className="btn btn-error btn-sm">
              {loading ? <span className="loading loading-spinner"></span> : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
