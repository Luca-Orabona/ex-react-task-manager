import { useGlobalContext } from "../context/GlobalContext";
import { useState, useMemo, useCallback } from "react";
import TaskRow from "../components/TaskRow";
import { ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
import { debounce } from "../utils/Debounce.js"

const TaskList = () => {
    const { tasks } = useGlobalContext();

    const [searchQuery, setSearchQuery] = useState("")

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


    const filterAndSortTasks = useMemo(() => {
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
            .sort((a, b) => {
                switch (sortBy) {
                    case "titolo":
                        return a.title.localeCompare(b.title) * sortOrder
                    case "stato":
                        const status = ["To do", "Doing", "Done"]
                        return (status.indexOf(a.status) - status.indexOf(b.status)) * sortOrder
                    case "data di creazione":
                        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder
                };
            })
    }, [tasks, sortBy, sortOrder, searchQuery]);

    const DebounceSearchQuery = useCallback(debounce(setSearchQuery, 500), [])

    // 🔹 funzione helper per mostrare la giusta icona
    const renderSortIcon = (field) => {
        if (sortBy !== field) return null;
        return sortOrder === 1 ? (
            <ArrowUpWideNarrow size={16} />
        ) : (
            <ArrowDownWideNarrow size={16} />
        );
    };


    return (
        <div className="container mt-4 mb-4">

            <input
                type="text"
                className="form-control mb-3"
                onChange={e => DebounceSearchQuery(e.target.value)}
                placeholder="Cerca titolo..."
            />

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>#</th>

                        <th style={{ cursor: "pointer" }} onClick={() => handleSort("titolo")}>
                            <div className="d-inline-flex align-items-center gap-1">
                                Titolo
                                {renderSortIcon("titolo")}
                            </div>
                        </th>

                        <th style={{ cursor: "pointer" }} onClick={() => handleSort("stato")}>
                            <div className="d-inline-flex align-items-center gap-1">
                                Stato
                                {renderSortIcon("stato")}
                            </div>
                        </th>

                        <th style={{ cursor: "pointer" }} onClick={() => handleSort("data di creazione")}>
                            <div className="d-inline-flex align-items-center gap-1">
                                Data di creazione
                                {renderSortIcon("data di creazione")}
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {tasks && filterAndSortTasks.map((t, i) => (
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
