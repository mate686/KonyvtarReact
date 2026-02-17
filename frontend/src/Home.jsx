import {Link} from "react-router";

export default function Home(){


    return (
        <>
            <h1>Könyvtár</h1>
            <Link to={"/register"}>
                <button>Regisztrálás</button>
            </Link>
            <Link to={"/login"}>
                <button>Bejelentkezés</button>
            </Link>
        </>
    )
}