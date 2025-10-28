import { useGlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

const TaskList = () => {
    const { tasks } = useGlobalContext();

    return (
        <div className="container mt-3">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks && tasks.map((t, i) => (
                        <TaskRow
                            key={i}
                            id={t.id}
                            title={t.title}
                            status={t.status}
                            createdAt={t.createdAt}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
