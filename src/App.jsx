import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layout/GuestLayout";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";


function App() {


  return (
    
      <BrowserRouter>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/" element={<TaskList /> } />
            <Route path="/add-task" element={ <AddTask />} />
          </Route>
        </Routes>
      </BrowserRouter>

    
  )
}

export default App
