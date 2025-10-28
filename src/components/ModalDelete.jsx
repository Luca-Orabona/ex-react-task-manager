import ReactDOM from "react-dom";

const ModalDelete = ({ title, show, onConfirm = () => { }, onClose = () => { } }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center z-3">
      <div className="bg-white rounded-4 shadow-lg p-4 text-center" style={{ maxWidth: "450px", width: "90%" }}>
        {/* Titolo */}
        <h5 className="fw-bold mb-3">{title}</h5>

        {/* Azioni */}
        <div className="d-flex justify-content-center gap-4 mt-3">

          <button type="button" className="btn btn-secondary px-4" onClick={onClose}>
            Annulla
          </button>

          <button type="button" className="btn btn-danger px-4" onClick={onConfirm}>
            Elimina
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalDelete;


