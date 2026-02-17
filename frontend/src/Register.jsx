import {Link, useNavigate} from "react-router";
import {useCallback, useContext} from "react";
import {UserContext} from "./context.js";
import {useForm} from "react-hook-form";

export default function Register() {

    const navigate = useNavigate();

    const {setUser} = useContext(UserContext)

    const {register,handleSubmit} = useForm();

    const submitHandler = useCallback(data =>{
        fetch("//localhost:3000/users/register",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }).then(res => res.json().then(res => {
            navigate("/");
        }))
    },[])



    return <>

            <h1>Regisztráció</h1>

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