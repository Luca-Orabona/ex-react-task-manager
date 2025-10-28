import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className="bg-primary py-3 shadow-sm">
      <div className="container">
        <nav className="d-flex gap-3 justify-content-center align-items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded text-white text-decoration-none fw-semibold
               ${isActive ? styles.active : styles.inactive}`
            }
          >
            Tasks
          </NavLink>

          <NavLink
            to="/add-task"
            className={({ isActive }) =>
              `px-3 py-2 rounded text-white text-decoration-none fw-semibold
               ${isActive ? styles.active : styles.inactive}`
            }
          >
            Aggiungi Tasks
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
