import { createContext, useContext } from "react";
import useTasks from "../hooks/useTasks";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const taskData = useTasks()

    return (
        <GlobalContext.Provider value={{...taskData}}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);