import Link from "next/link";

export const AuthRequired = ({ showModal, onShowModal }) => {

  return (
    <>
      <input checked={showModal} type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Debe autenticarse</h3>
          <p>Para poder interactuar con todas las funcionalidades de nuestro sitio web, es necesario que se autentique con su cuenta de usuario</p>
          <div className="modal-action">
            <button onClick={() => onShowModal(false)} className="btn btn-sm btn-neutral">
              Cerrar
            </button>
            <Link href="/login" className="btn btn-sm btn-neutral" >
              Ir
            </Link>
          </div>
        </div>
      </div>
    </>
  );

};
