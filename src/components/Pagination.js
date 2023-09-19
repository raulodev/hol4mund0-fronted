import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const Pagination = ({ data, onPageIndex, pageIndex }) => {
  return (
    <div className="flex gap-4 py-10 justify-center">
      {data.previous && <PreviuosButton onClick={() => onPageIndex(pageIndex - 1)} />}
      {data.next && <NextButton onClick={() => onPageIndex(pageIndex + 1)} />}
    </div>
  );
};

const NextButton = ({ onClick }) => {
  return (
    <button className="btn-neutral btn" onClick={onClick}>
      Siguiente
      <AiOutlineArrowRight className="text-xl" />
    </button>
  );
};

const PreviuosButton = ({ onClick }) => {
  return (
    <button className="btn-neutral btn" onClick={onClick}>
      <AiOutlineArrowLeft className="text-xl" />
      Anterior
    </button>
  );
};
