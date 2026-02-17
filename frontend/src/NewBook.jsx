import {useCallback, useState} from "react";
import {Link, useNavigate} from "react-router";
import {useForm} from "react-hook-form";

export default function NewBook() {

    const navigate = useNavigate();

    const {register, handleSubmit} = useForm();

    const submitHandler = useCallback(data =>{
        fetch("//localhost:3000/book/addbook",{
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

    return<>

        <h1>Könyv felvétele</h1>

        <form onSubmit={handleSubmit(submitHandler)}>
            <label>
                Cim
                <input {...register("title")}/>
            </label>

            <label>
                Szerzö
                <input {...register("author")} />
            </label>

            <label>
                Leirás
                <input {...register("description")} />
            </label>

            <label>
                Darabszám
                <input {...register("qty")} />
            </label>

            <input type={"submit"}/>

        </form>

        <Link to={"/"}>Vissza a kezdo lapra</Link>
    </>
}