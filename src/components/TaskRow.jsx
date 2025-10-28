import { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./TaskRow.module.css"

// Funzione per assegnare il colore di sfondo in base allo status
const getStatusClass = (status) => {
  switch (status) {
    case "To do":
      return styles.statusCircleTodo;
    case "Doing":
      return styles.statusCircleDoing;
    case "Done":
      return styles.statusCircleDone;
    default:
      return styles.statusCircle;
  }
};

const TaskRow = ({ title, status, createdAt, id} ) => {
  return (
    <tr>
      <td>{id}</td>
      <td className={styles.title}><Link to={`/task/${id}`} className="text-decoration-none text-dark">{title}</Link></td>
      <td>
        <span className={getStatusClass(status)} title={status}></span>
      </td>
      <td>{new Date(createdAt).toLocaleString()}</td>
    </tr>
  );
};


// React.memo evita render inutili se props non cambiano
export default memo(TaskRow);

