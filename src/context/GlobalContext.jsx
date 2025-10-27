import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const urlAPI = import.meta.env.VITE_URL_API

    const [tasks, setTasks] = useState();

    const getTask = async () => {
        try {
            const resp = await fetch(`${urlAPI}/tasks`);
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


    const value= {
        tasks
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);