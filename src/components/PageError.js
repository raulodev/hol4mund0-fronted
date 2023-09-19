import { BiErrorCircle } from "react-icons/bi";

export const PageError = ({ message }) => {
  return (
    <div className="flex justify-center items-center min-h-screen gap-4">
      <BiErrorCircle className="text-4xl" />
      <h1 className="text-xl">{message}</h1>
    </div>
  );
};
