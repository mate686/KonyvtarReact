import {NavLink, Outlet} from "react-router";
import {useContext} from "react";
import {UserContext} from "./context.js";

export default function Layout() {
    const {name} = useContext(UserContext);

    return <>
        <header>
            <nav>
                <NavLink to={"/"}>Kezdöoldal</NavLink>
                <NavLink to={"/books"}>Könyvek</NavLink>
                <NavLink to={"/newbook"}>Új Könyv</NavLink>
            </nav>

            {name && <div>
                <small>Bejelnetkezett felhasználo</small>
                <br />
                <span>{name}</span>
            </div>}
        </header>
        <main>
            <Outlet />
        </main>
    </>
}