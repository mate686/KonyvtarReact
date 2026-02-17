import {UserContext} from "./context.js"
import {useState} from "react";

export  default  function UserContextProvider({children}) {
    const [user, setUser] = useState(null);

    return <UserContext value={{...user, setUser}} >
        {children}
    </UserContext>
}


