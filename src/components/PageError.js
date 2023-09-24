import { BiErrorCircle } from "react-icons/bi";

export const PageError = ({ message, code = "" }) => {
  return (
    <div className="flex justify-center items-center min-h-screen gap-4">
      <BiErrorCircle className="text-4xl" />
      {
        code == "ERR_NETWORK" ?
          <h1 className="text-xl">No tiene conexión</h1> :
          <h1 className="text-xl">Ha ocurrido un error {code}</h1>
      }
    </div>
  );
};
