import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SlOptions } from "react-icons/sl";
import { AiFillCheckCircle, AiFillInfoCircle } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import useAxios from "@/hooks/useAxios";
import { TextArea } from "./TextareaAutosize";
import { MarkdownRender } from "./MarkdownRender";
import { Button } from "./Button";


export function Comment({
  id,
  author,
  author_first_name,
  preview_image_author,
  author_description,
  created_at,
  article,
  content,
  replies,
  is_owner,
  onMutate,
  accessToken
}) {
  const [showTextarea, setShowTextarea] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);
  const [replyContent, setContent] = useState("");
  const { post, loading } = useAxios();

  const submitComment = async () => {

    const formData = new FormData();

    if (replyContent.length > 0) {

      formData.append("content", replyContent);
      formData.append("article", article);
      formData.append("parent_comment", id);


      await post("/comments/", formData, accessToken);
      setContent("");
      onMutate();
      setShowTextarea(false);


    }

  };


  return (
    <>
      <article className="mb-6 text-base border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center mt-4">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
              <div className="dropdown">
                <label tabIndex={0}>
                  <Image
                    className="mr-2 w-8 h-8 rounded-full object-cover cursor-pointer"
                    src={preview_image_author}
                    width={20}
                    height={20}
                    alt="image"
                  />

                </label>
                <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-1 mt-1 shadow bg-primary text-primary-content">
                  <div className="card-body">
                    <p>{author_description}</p>
                    <div className="card-actions">
                      <Link href={`profile/${author}`} className="btn btn-xs">
                        ver perfil
                      </Link>
                    </div>
                  </div>
                </div>
              </div>


              {author_first_name ? author_first_name : author}
            </p>
            <p className="text-sm text-gray-600" title={created_at}>
              {created_at}
            </p>
          </div>
          {accessToken &&

            <div className="dropdown dropdown-end cursor-pointer">
              <label tabIndex={0} className="btn btn-sm">
                <SlOptions className="text-sm text-gray-500" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52"
              >
                {is_owner && (
                  <li>
                    <a onClick={() => setShowModalDelete(true)}>Eliminar</a>
                  </li>
                )}
                {!is_owner && (
                  <li>
                    <a onClick={() => setShowModalReport(true)}>Reportar</a>
                  </li>
                )}
              </ul>
            </div>
          }
        </div>
        <MarkdownRender markdown={content} />

        <div className="flex items-center mt-4 space-x-4">
          <button
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline gap-2"
            onClick={() => setShowTextarea((prev) => !prev)}
          >
            <BsReply />
            Responder
          </button>
        </div>
      </article>
      {showTextarea && (
        <form onSubmit={(e) => e.preventDefault()} className="mb-6 ">
          <TextArea
            className="textarea textarea-bordered w-full text-base overflow-y-hidden min-h-16"
            placeholder="Escribe un comentario..."
            required={true}
            value={replyContent}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button type="submit" className="btn btn-neutral btn-sm" text="Publicar respuesta" isLoading={loading} onClick={submitComment} />

        </form>
      )}
      <div className="ml-2 pl-2 md:ml-4 md:pl-4  border-gray-400">
        {replies.map((reply) => (
          <Comment
            id={reply.id}
            key={reply.id}
            author={reply.author}
            author_first_name={reply.author_first_name}
            preview_image_author={reply.preview_image_author}
            author_description={reply.author_description}
            created_at={reply.created_at}
            article={article}
            content={reply.content}
            replies={reply.replies}
            is_owner={reply.is_owner}
            onMutate={onMutate}
            accessToken={accessToken}
          />
        ))}
      </div>
      <ModalDelete
        showModal={showModalDelete}
        onShowModal={setShowModalDelete}
        commentId={id}
        onMutate={onMutate}
        accessToken={accessToken}
      />
      <ModalReport
        showModal={showModalReport}
        onShowModal={setShowModalReport}
        commentId={id}
        accessToken={accessToken}
      />
    </>
  );
}
function ModalReport({ showModal, onShowModal, commentId, accessToken }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const { success, error, loading, post } = useAxios();

  function handlerOnChange(event) {
    setContent(() => event.target.value);
  }

  function handlerSubmit() {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("comment", commentId);


    post("/reportcomment/", formData, accessToken);
  }

  if (error?.response?.status == 401) {
    router.push("/login");
  }

  return (
    <>
      <input checked={showModal} type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Reportar comentario</h3>
          <textarea
            value={content}
            onChange={handlerOnChange}
            className="textarea textarea-bordered w-full textarea-lg mt-1.5"
            placeholder="Contexto"
          />
          {error ? (
            <p className="text-error flex items-center gap-1">
              <AiFillInfoCircle />
              Ha ocurrido un error al intentar enviar un reporte
            </p>
          ) : (
            success && (
              <div className="text-success flex items-center gap-2">
                <AiFillCheckCircle className="text-success" />
                Reporte enviado
              </div>
            )
          )}
          <div className="modal-action">
            <button
              onClick={() => onShowModal(!showModal)}
              className="btn btn-sm"
            >
              Cerrar
            </button>

            <button
              onClick={handlerSubmit}
              className={success ? "hidden" : "btn btn-neutral btn-sm"}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Reportar"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ModalDelete({ showModal, onShowModal, commentId, onMutate, accessToken }) {
  const { error, loading, del } = useAxios(`/comments/${commentId}`);

  async function handlerSubmit() {
    await del(accessToken);
    onMutate();
  }
  return (
    <>
      <input checked={showModal} type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-2">Eliminar comentario</h3>
          <p>Seguro que desea eliminar este comentario ? </p>
          <p>Esta acción no se puede deshacer.</p>
          {error && (
            <p className="text-error flex items-center gap-1">
              <AiFillInfoCircle />
              Ha ocurrido un error al intentar eliminar el comentario
            </p>

          )}
          <div className="modal-action">
            <button
              onClick={() => onShowModal(!showModal)}
              className="btn btn-sm"
            >
              Cerrar
            </button>

            <button onClick={handlerSubmit} className="btn btn-error btn-sm">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Eliminar"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
