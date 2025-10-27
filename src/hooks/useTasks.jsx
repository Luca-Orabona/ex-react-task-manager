import { useEffect, useState } from "react";
const { VITE_URL_API } = import.meta.env

const useTasks = () => {

    const [tasks, setTasks] = useState([]);


    const addTasks = async () => {

    };

    const removeTask = async () => {

    };


    const updateTask = async () => {

    };

    const getTask = async () => {
        try {
            const resp = await fetch(`${VITE_URL_API}/tasks`);
            const data = await resp.json();
            setTasks(data)
            console.log(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTask()
    }, [])

    return { tasks, addTasks, removeTask, updateTask };
};

export default useTasks;