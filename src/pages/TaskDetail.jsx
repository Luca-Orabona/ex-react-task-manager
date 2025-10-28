import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import ModalDelete from "../components/ModalDelete";
import ModificationModal from "../components/ModificationModal";
import { useEffect, useRef, useState } from "react";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~£";

const TaskDetail = () => {
  const { tasks, removeTask, updateTask } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === Number(id));

  //modale elimina task
  const [showModalDelete, setShowModalDelete] = useState(false);


  //modale modifica task
  const [title, setTitle] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [showModificationModal, setShowModificationModal] = useState(false);


  //aggiungo i campi di defauld nel modale modifica task
  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setSelectStatus(task.status)
      setDescription(task.description)
    }
  }, [task])

  const status = [...new Set(tasks.map((t) => t.status))];

  const isValidTitle = title.split("").every(char => !symbols.includes(char));


  //Gestione submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !status
    ) {
      setError("Tutti i campi devono essere compilati");
      return;
    }

    const newTask = {
      title,
      description,
      status
    }



    updateTask(newTask, id)
    setShowModificationModal(false);
    navigate("/");

    setError(""); // reset errori

    // reset campi
    setDescription("")
    setSelectStatus("")
    setTitle("");
  };






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

            <div className="d-flex gap-5">

              <button onClick={() => setShowModificationModal(true)} className="btn btn-warning w-100 mt-3 fw-semibold">
                Modifica Task
              </button>

              <button onClick={() => setShowModalDelete(true)} className="btn btn-danger w-100 mt-3 fw-semibold">
                Elimina Task
              </button>

            </div>

          </div>
        </div>
      </section>

      <ModalDelete
        show={showModalDelete}
        title="Sei sicuro di voler eliminare la task?"
        onClose={() => setShowModalDelete(false)}
        onConfirm={() => {
          removeTask(id);
          setShowModalDelete(false);
          navigate("/");
        }}
      />


      <ModificationModal
        show={showModificationModal}
        title="Modifica task"
        onClose={() => setShowModificationModal(false)}
        onConfirm={handleSubmit}
        content={
          <>
            {/* TITLE */}
            <div className="mb-3">
              <div className="wrapperInput">
                <input
                  type="text"
                  className="form-control"
                  id="formTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Titolo"
                />
                <label htmlFor="formTitle" className="form-label">
                  Titolo
                </label>
              </div>

              {title.trim() && (
                <p className={`${isValidTitle ? "text-success" : "text-danger"} mt-1`}>
                  {isValidTitle ? "" : "Il titolo non può contenere caratteri speciali"}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mb-3">
              <label htmlFor="formDescription" className="form-label">
                Descrizione
              </label>
              <textarea
                className="form-control"
                id="formDescription"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Inserisci una descrizione"
              />
            </div>

            {/* STATUS */}
            <div className="mb-3">
              <label htmlFor="formStatus" className="form-label">
                Stato
              </label>
              <select
                className="form-select"
                id="formStatus"
                value={selectStatus}
                onChange={(e) => setSelectStatus(e.target.value)}
              >
                {status.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-danger">{error}</p>}
          </>
        }
      />

    </>
  );
};

export default TaskDetail;
