import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import ModalDelete from "../components/ModalDelete"
import { useRef, useState } from "react";

const TaskDetail = () => {
  const { tasks, removeTask } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();


  //modale elimina task
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const task = tasks.find((t) => t.id === Number(id));

  const getStatusClass = (status) => {
    switch (status) {
      case "To do":
        return "bg-danger";
      case "Doing":
        return "bg-warning text-dark";
      case "Done":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  if (!task) {
    return (
      <div className="text-center text-muted py-5 fs-5">
        Task non trovata
      </div>
    );
  }

  return (
    <>
      <section className="d-flex justify-content-center align-items-start min-vh-100 bg-light pt-5">
        <div className="card shadow-lg border-0 rounded-4 w-100" style={{ maxWidth: "600px" }}>
          <div className="card-body p-4">
            <h1 className="card-title text-center mb-4 fw-bold text-dark">
              {task.title}
            </h1>

            <div className="mb-3">
              <p className="fw-semibold mb-1">Descrizione:</p>
              <p className="p-3 bg-body-secondary rounded-3 text-secondary small mb-0">
                {task.description}
              </p>
            </div>

            <div className="mb-3">
              <p className="fw-semibold mb-1">Stato:</p>
              <span
                className={`badge ${getStatusClass(task.status)} px-3 py-2 rounded-pill text-uppercase fw-semibold`}
              >
                {task.status}
              </span>
            </div>

            <div className="mb-3">
              <p className="fw-semibold mb-1">Creata il:</p>
              <p className="text-secondary mb-0 small">
                {new Date(task.createdAt).toLocaleString()}
              </p>
            </div>

            <button onClick={() => setShowModal(true)}  className="btn btn-danger w-100 mt-3 fw-semibold">
              Elimina Task
            </button>
          </div>
        </div>
      </section>

      <ModalDelete
        ref={modalRef}
        show={showModal}
        title="Sei sicuro di voler eliminare la task?"
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          removeTask(id);
          setShowModal(false);
          navigate("/");
        }}
      />

    </>
  );
};

export default TaskDetail;
