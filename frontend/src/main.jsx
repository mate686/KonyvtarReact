import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import UserContextProvider from "./UserContextProvider.jsx";
import Layout from "./Layout.jsx";
import Books from "./Books.jsx";
import Teszt from "./Teszt.jsx";
import NewBook from "./NewBook.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserContextProvider>
        <BrowserRouter>
        <Routes>
            <Route path="/" Component={Layout} >
                <Route path="/" Component={Home} />
                <Route path="/books" Component={Books} />
                <Route path="/newbook" Component={NewBook} />
                {/*<Route path="/teszt" Component={Teszt} />*/}
            </Route>
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />

        </Routes>
        </BrowserRouter>
      </UserContextProvider>
  </StrictMode>,
)
