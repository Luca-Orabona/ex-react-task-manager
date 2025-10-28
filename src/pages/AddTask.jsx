import { useRef, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

const AddTask = () => {
  const { tasks, addTask } = useGlobalContext();

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const statusRef = useRef();
  const descriptionRef = useRef();

  const status = [...new Set(tasks.map((t) => t.status))];

  const isValidTitle = title.split("").every(char => !symbols.includes(char));


  //Gestione submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !descriptionRef.current.value.trim() ||
      !statusRef.current.value
    ) {
      setError("Tutti i campi devono essere compilati");
      return;
    }

    const newTask = {
      title,
      description: descriptionRef.current.value,
      status: statusRef.current.value
    }
    
    addTask(newTask)
    
    setError(""); // reset errori

    // reset campi
    descriptionRef.current.value = "";
    statusRef.current.value = "";
    setTitle("");
  };

  return (
    <div className="container">
      <h2 className="text-center py-3">Task</h2>

      <form className="form-control" onSubmit={handleSubmit}>
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
            ref={descriptionRef}
            placeholder="Inserisci una descrizione"
          />
        </div>

        {/* STATUS */}
        <div className="mb-3">
          <label htmlFor="formStatus" className="form-label">
            Stato
          </label>
          <select className="form-select" id="formStatus" ref={statusRef}>
            {status.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Aggiungi
          </button>
        </div>

        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default AddTask;
