import { useState, useRef } from "react";
import Image from "next/image";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { PageHead } from "@/components/WebHeader";
import { TextArea } from "@/components/TextareaAutosize";
import { PageError } from "@/components/PageError";
import { Button } from "@/components/Button";
import defaultUserImage from "../../../public/user.png";
import useUser from "@/hooks/useUser";
import useAxios from "@/hooks/useAxios";
import useData from "@/hooks/useData";
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


function Setting({ accessToken }) {
  const imageRef = useRef();
  const { isLoading, isError, user } = useUser(accessToken);
  const { loading, success, update } = useAxios();
  const { data, setData } = useData(user);
  const [profileImage, setProfileImage] = useState(null);


  async function handlerSave() {
    let formData = new FormData();

    if (profileImage) {
      const imageSrc = imageRef.current.src;
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const file = new File([blob], "image.png");
      formData.append("profile_image", file, file.name);
    }

    formData.append("username", user.username);
    formData.append("description", data.description);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("website_url", data.website_url);
    formData.append("facebook_url", data.facebook_url);
    formData.append("instagram_url", data.instagram_url);
    formData.append("whatsapp_url", data.whatsapp_url);
    formData.append("telegram_url", data.telegram_url);
    formData.append("twitter_url", data.twitter_url);
    formData.append("github_url", data.github_url);
    formData.append("linkedin_url", data.linkedin_url);


    update(`/users/${user.id}/`, formData, accessToken);
  }

  function handlerOnChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  function handlerShowNewImage(event) {
    const file = event.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setData({ ...data, ["profile_image"]: file });
      setProfileImage(objectURL);
    }
  }


  return (
    <>
      <PageHead title="Ajustes - Hol4 Mund0" />
      <main className="flex flex-col items-center min-h-screen">
        <NavBar accessToken={accessToken} />
        {isError && <PageError message={isError.message} />}

        {isLoading && (
          <div className="flex justify-center min-h-screen">
            <span className="loading loading-spinner"></span>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="flex flex-col items-center gap-10 w-full md:w-[40rem] mt-28">
            <h1 className="text-xl font-bold">Información Pública</h1>
            <div className="flex flex-col items-center md:items-start md:px-7 gap-4 w-full">
              <div className="flex gap-10 flex-col-reverse md:flex-row w-full">
                <div className="flex flex-col items-center md:items-start w-full md:w-2/3 gap-5">
                  <div>
                    <label className="label">
                      <span className="label-text">Nombre</span>
                    </label>
                    <input
                      type="text"
                      value={data?.first_name}
                      name="first_name"
                      maxLength={16}
                      onChange={handlerOnChange}
                      placeholder="Escribe tu nombre"
                      autoFocus={true}
                      className="input input-bordered w-80 md:w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Apellido</span>
                    </label>
                    <input
                      type="text"
                      value={data?.last_name}
                      name="last_name"
                      maxLength={16}
                      onChange={handlerOnChange}
                      placeholder="Escribe tu apellido"
                      className="input input-bordered w-80 md:w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                  <div className="avatar">
                    <div className="w-32 rounded-full">
                      <Image
                        src={
                          profileImage
                            ? profileImage
                            : data?.preview_profile_image
                              ? data?.preview_profile_image
                              : defaultUserImage
                        }
                        width={600}
                        height={60}
                        alt="profile image"
                        ref={imageRef}
                      />
                    </div>
                  </div>

                  <div className="py-1">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          setProfileImage(defaultUserImage);
                        }}
                      >
                        <AiOutlineDelete className="text-2xl  transition-colors ease-in cursor-pointer text-gray-600 hover:text-gray-700" />
                      </button>

                      <label htmlFor="input-image">
                        <AiOutlineCamera className="text-2xl transition-colors ease-in cursor-pointer hover:text-gray-700" />
                      </label>
                    </div>

                    <input
                      onChange={(e) => {
                        handlerShowNewImage(e);
                      }}
                      className="hidden"
                      id="input-image"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-full">
                <label className="label">
                  <span className="label-text">Sobre ti</span>
                </label>
                <TextArea
                  type="text"
                  value={data?.description}
                  name="description"
                  onChange={handlerOnChange}
                  maxLength={255}
                  placeholder="Escribe tu biografía"
                  className="w-80 md:w-full min-h-[5rem] overflow-hidden text-lg textarea textarea-bordered"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputSocial
                label="Web"
                name="website_url"
                value={data?.website_url}
                handlerOnChange={handlerOnChange}
              />
              <InputSocial
                label="Facebook"
                name="facebook_url"
                value={data?.facebook_url}
                handlerOnChange={handlerOnChange}
              />
              <InputSocial
                label="Instagram"
                name="instagram_url"
                value={data?.instagram_url}
                handlerOnChange={handlerOnChange}
              />
              <InputSocial
                label="WhatsApp"
                name="whatsapp_url"
                value={data?.whatsapp_url}
                handlerOnChange={handlerOnChange}
              />
              <InputSocial
                label="Telegram"
                name="telegram_url"
                value={data?.telegram_url}
                handlerOnChange={handlerOnChange}
              />
              <InputSocial
                label="Twitter"
                name="twitter_url"
                value={data?.twitter_url}
                handlerOnChange={handlerOnChange}
              />
              <InputSocial
                label="Github"
                name="github_url"
                value={data?.github_url}
                handlerOnChange={handlerOnChange}
              />
              <InputSocial
                label="Linkedin"
                name="linkedin_url"
                value={data?.linkedin_url}
                handlerOnChange={handlerOnChange}
              />
            </div>
            <div className="flex justify-start">
              <Button
                text="Guardar Cambios"
                className="btn-neutral btn btn-sm"
                isLoading={loading}
                isSuccess={success}
                onClick={handlerSave}
              />
            </div>
          </div>
        )}
        <Footer />
      </main>
    </>
  );
}


function InputSocial({ label, value, name, handlerOnChange }) {
  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        value={value}
        name={name}
        maxLength={250}
        onChange={handlerOnChange}
        placeholder="enlace"
        className="input input-bordered w-80 md:w-full"
      />
      <span className="text-xs text-gray-600">* Debe de comenzar con https://</span>
    </div>
  );
}



export default Setting;
