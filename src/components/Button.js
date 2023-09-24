import { AiOutlineCheck } from "react-icons/ai";

export function Button({ isLoading, isSuccess, className, text = "", onClick, icon = "" }) {
  return (
    <>
      {isLoading && (
        <button className={className} type="button">
          <span className="loading loading-spinner"></span>
        </button>
      )}

      {isSuccess && (
        <button className="btn btn-success btn-sm" type="button">
          <AiOutlineCheck className="text-2xl text-white" />
        </button>
      )}

      {!isLoading && !isSuccess && (
        <button type="submit" className={className} onClick={onClick}>
          {icon && icon}
          {text && <span>{text}</span>}
        </button>
      )}
    </>
  );
}
