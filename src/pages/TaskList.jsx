import { useGlobalContext } from "../context/GlobalContext";
import { useState, useMemo } from "react";
import TaskRow from "../components/TaskRow";

const TaskList = () => {
    const { tasks } = useGlobalContext();

    const [sortBy, setSortBy] = useState("Data di creazione");
    const [sortOrder, setSortOrder] = useState(1);


    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field);
            setSortOrder(1)
        }
    }


    const sortTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            switch (sortBy) {
                case "titolo":
                    return a.title.localeCompare(b.title) * sortOrder
                case "stato":
                    const status = ["To do", "Doing", "Done"]
                    return (status.indexOf(a.status) - status.indexOf(b.status)) * sortOrder
                case "data di creazione":
                    return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder
            };
        });
    }, [tasks, sortBy, sortOrder]);


    return (
        <div className="container mt-4 mb-4">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ cursor: "pointer" }} onClick={() => handleSort("titolo")}>titolo</th>
                        <th style={{ cursor: "pointer" }} onClick={() => handleSort("stato")}>Stato</th>
                        <th style={{ cursor: "pointer" }} onClick={() => handleSort("data di creazione")}>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks && sortTasks.map((t, i) => (
                        <TaskRow
                            key={i}
                            index={i}
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
