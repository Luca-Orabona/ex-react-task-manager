import { useEffect, useState } from "react";
const { VITE_URL_API } = import.meta.env

const fetchJson = async (url, option = {}) => {
    const resp = await fetch(url, option);
    const obj = resp.json();
    return obj;
};

const useTasks = () => {

    const [tasks, setTasks] = useState([]);


    const addTask = async (newTask) => {
        try {
            const data = await fetchJson(`${VITE_URL_API}/tasks`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTask)
                },
            );
            console.log(data);
            // Aggiorna stato locale
            if (data.success) {
                setTasks(prev => [...prev, data.task]);
                alert(`Task aggiunta`)
            } else {
                throw new Error(`Errore: nessun dato ricevuto!`)
            }
        } catch (error) {
            alert(`Errore: non è stato possibile inviare i dati!`);
        }

    };

    const removeTask = async (id) => {
        try {
            const data = await fetchJson(`${VITE_URL_API}/tasks/${id}`, { method: "DELETE" });

            if (data.success) {
                const newTask = tasks.filter(t => t.id !== Number(id));
                setTasks(newTask);
                alert(`Task eliminata`);
            } else {
                throw new Error(`${data.message}`);
            }

        } catch (error) {
            alert(`Errore: non è stato possibile eliminare la task.`);

        }

    };

    const updateTask = async (updateTask, id) => {
       try {
            const data = await fetchJson(`${VITE_URL_API}/tasks/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateTask)
                },
            );
            console.log(data);

            // Aggiorna stato locale
            if (data.success) {
                const newTasks = tasks.map(t => t.id === Number(id) ? data.task : t);
                alert(`Task modificata`)
                setTasks(newTasks);
                console.log(data);
                
            } else {
                throw new Error(`Errore: nessun dato ricevuto!`)
            }
        } catch (error) {
            alert(`Errore: non è stato possibile modificare i dati!`);
        }

    };

    const getTask = async () => {
        try {
            const data = await fetchJson(`${VITE_URL_API}/tasks`);
            setTasks(data)
            console.log(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTask()
    }, [])

    return { tasks, addTask, removeTask, updateTask };
};

export default useTasks;