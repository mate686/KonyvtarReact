import {Link, useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {useCallback, useContext} from "react";
import {UserContext} from "./context.js";

export default function Login() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext)

    const {register,handleSubmit} = useForm();

    const submitHandler = useCallback(async data =>{
        await fetch("//localhost:3000/users/login",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then(res => res.json().then(res => {
            //console.log(res);
            setUser(res);
            navigate("/");
        }))
        },[])

    return <>
        <h1>Bejelentkezés</h1>

        <form onSubmit={handleSubmit(submitHandler)}>
            <label>
                Név
                <input {...register("name")}/>
            </label>

            <label>
                Jelszó
                <input {...register("password")} type="password"/>
            </label>

            <input type={"submit"}/>

        </form>

        <Link to={"/"}>Vissza a kezdo lapra</Link>

    </>
}