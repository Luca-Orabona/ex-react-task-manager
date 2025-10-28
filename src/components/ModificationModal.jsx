import ReactDOM from "react-dom";

const ModificationModal = ({ title, content, show, onConfirm = () => { }, onClose = () => { }, onSubmit = () => { } }) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center z-3">
            <div className="bg-white rounded-4 shadow-lg p-4" style={{ maxWidth: "450px", width: "90%" }}>
                {/* Titolo */}
                <div className="container">
                    <h5 className="fw-bold mb-3">{title}</h5>
                    <form className="form-control" onSubmit={onConfirm}>
                        {content}

                        {/* Azioni */}
                        <div className="d-flex justify-content-center gap-4 mt-4 mb-3">
                            <button type="button" className="btn btn-secondary px-4" onClick={onClose}>
                                Annulla
                            </button>

                            <button type="submit" className="btn btn-success px-4">
                                Modifica
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >,
        document.body
    );
};

export default ModificationModal;