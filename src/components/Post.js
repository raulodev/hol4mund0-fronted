import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import CreatableSelect from "react-select/creatable";
import { VscPreview, VscEdit } from "react-icons/vsc";
import { NavBar } from "@/components/NavBar";
import { PageHead } from "@/components/WebHeader";
import { Editor } from "@/components/MarkdownEditor";
import { customStyles, options } from "@/components/SelectOpts";
import { TextArea } from "@/components/TextareaAutosize";
import { PageError } from "@/components/PageError";
import { Button } from "@/components/Button";
import useAxios from "@/hooks/useAxios";
import useUser from "@/hooks/useUser";

export function Post({ data, accessToken }) {
  const chekboxRef = useRef(null);
  const { isError, isLoading } = useUser(accessToken);
  const { error, loading, success, createPost, update } = useAxios();
  const [isShowAlert, setShowAlert] = useState(false);
  const [isPreview, setPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  useEffect(() => {
    async function getData() {
      setTitle(data.title);
      setContent(data.content);
      setTags(JSON.parse(data.tags));

      const res = await fetch(data.preview_cover_image);
      const blob = await res.blob();
      const file = new File([blob], "image.png");
      setImage(file);
      setPreviewImageUrl(URL.createObjectURL(blob));
    }
    if (data) {
      getData();
    }
  }, []);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      const objectURL = URL.createObjectURL(image);
      setImage(image);
      setPreviewImageUrl(objectURL);
    }
  };

  function handlerSubmit() {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (title.length == 0 || !image) {
      setShowAlert(true);
      return;
    }

    if (image) {
      formData.append("cover_image", image, image.name);
    }
    formData.append("tags", JSON.stringify(tags));
    formData.append("is_draft", content.length == 0 ? true : chekboxRef.current.checked);


    if (data) {
      update(`/articles/${data.id}/`, formData, accessToken);
    } else {
      createPost("/articles/", formData, accessToken);
    }
  }

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <>
      <PageHead title={data ? "Editar" : "Redactar"} />
      <main className="min-h-screen">
        <NavBar accessToken={accessToken} />

        {isError && <PageError message={isError.message} />}

        {isLoading && (
          <div className="flex justify-center min-h-screen">
            <span className="loading loading-spinner"></span>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="flex flex-col justify-center items-center gap-2 px-2 lg:gap-0 lg:items-start lg:flex-row ">
            <div className="w-full sm:w-[30rem] md:w-[38rem] lg:w-min">
              <button onClick={() => setPreview(!isPreview)} className="mt-20 mr-2 btn btn-sm btn-neutral w-max">
                {isPreview ? <VscEdit className="text-xl" /> : <VscPreview className="text-xl" />}
              </button>

            </div>
            <div className="flex flex-col w-full gap-4 bg-white sm:w-[30rem] md:w-[38rem] lg:w-[46rem] lg:mt-20">
              <div className="flex flex-col items-center">
                {isPreview && previewImageUrl ? (
                  <div className="w-full h-40 overflow-hidden lg:h-80">
                    <Image
                      className="object-cover w-full h-full"
                      src={previewImageUrl}
                      width={1200}
                      height={600}
                      alt="image"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <label className="btn btn-sm" htmlFor="cover">
                        <span className="text-sm ">Agregar cover</span>
                      </label>
                      <input
                        id="cover"
                        className="hidden w-max"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImageChange}
                        onBlur={handleImageChange}
                      />
                    </div>
                    {previewImageUrl && (
                      <div className="w-32 h-32 pt-4 overflow-hidden">
                        <Image
                          className="object-cover w-full h-full"
                          src={previewImageUrl}
                          width={1200}
                          height={600}
                          alt="image"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div
                className={
                  isPreview
                    ? "p-2 text-3xl break-words font-black bg-white border-0 outline-none md:text-4xl placeholder:text-gray-600"
                    : "hidden"
                }
              >
                {title ? title : "Título del post"}
              </div>


              <TextArea
                className={
                  isPreview
                    ? "hidden"
                    : "text-3xl p-2 h-auto border-0 font-black bg-white  outline-none md:text-4xl placeholder:text-gray-600 overflow-y-hidden resize-none"
                }
                type="text"
                placeholder="Escriba el título aqui..."
                maxLength={100}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
              />



              <div className={isPreview ? "flex gap-2 flex-wrap px-2" : "hidden"}>
                {tags?.map((el) => (
                  <span key={el?.value} className={"bg-gray-100 text-gray-600 p-1 w-max"}>{el?.label}</span>
                ))}
              </div>

              {!isPreview && (
                <CreatableSelect
                  placeholder="agregue etiquetas"
                  isClearable={true}
                  formatCreateLabel={(inputValue) => `Crear "${inputValue}"`}
                  noOptionsMessage={() => "No hay opciones"}
                  options={options}
                  isMulti={true}
                  styles={customStyles}
                  onChange={(selected) => {
                    setTags(selected);
                  }}
                  value={tags}
                />
              )}

              <Editor show={isPreview} onChangeContent={handleContentChange} initialContent={content} />
            </div>
            <div className="flex flex-col gap-2 ml-2 lg:mt-20">
              <Button
                isLoading={loading}
                isSuccess={success}
                className="btn btn-sm btn-neutral"
                text={data ? "Actualizar" : "Publicar"}
                onClick={handlerSubmit}
              />

              {error && !loading && <span className="text-xs text-red-500">Ha ocurrido un error</span>}
              <div className="p-2 bg-white">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input ref={chekboxRef} defaultChecked type="checkbox" className="checkbox-primary checkbox" />
                  <span className="text-sm font-semibold">Como borrador</span>
                </label>
              </div>
            </div>
          </div>
        )}
        <Alert showModal={isShowAlert} onShowModal={setShowAlert} />
        <div className="h-20" />
      </main>
    </>
  );
}

function Alert({ showModal, onShowModal }) {
  return (
    <>
      <input defaultChecked checked={showModal} type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Le faltaron algunos pasos.</h3>
          <ul className="list-disc list-inside mt-4">
            <li>Debe de establecer un título a la publicación.</li>
            <li>Debe agregar una imagen de cover.</li>
            <li>Si no tiene contenido se guardará como un borrador.</li>
          </ul>
          <div className="modal-action">
            <button onClick={() => onShowModal(!showModal)} className="btn btn-sm">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
