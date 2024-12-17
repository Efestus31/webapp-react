import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from './layouts/AppLayout'
import MoviesPage from "./pages/MoviesPage"
import SingleMovie from "./pages/SingleMovie";
import NotFound from "./components/NotFound";
import GlobalContext from "./contexts/GlobalContext";
import { useState } from "react";
function App() {

  //define the state variable
  const [loading, setLoading] = useState(false);

  //define the value to pass to the context
  const values = {
    loading,
    setLoading
  }

  return (

    <GlobalContext.Provider value={values}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>

            <Route index element={<MoviesPage />} />
            <Route path="movies/:id" element={<SingleMovie />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </GlobalContext.Provider>

  )
}

export default App
