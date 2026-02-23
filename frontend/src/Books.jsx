import {useCallback, useEffect, useState} from "react";

export default function Books() {

    const [books, setBooks] = useState([]);

    /*const getAllBook = useCallback(() => {

        fetch("//localhost:3000/book/allbook").then((res) => res.json()).then((data) => {
            setBooks(data);
            console.log(data);
        })

    },[])*/

    const getAllBook = useCallback(async () => {
        try {
            const res = await fetch("http://localhost:3000/book/allbook");
            const data = await res.json();
            setBooks(data);
        } catch (err) {
            console.error(err);
        }
    }, []);



    useEffect(() => {
        getAllBook();
    }, [getAllBook]);


    function deleteBook(id) {
        fetch(`http://localhost:3000/book/deletebook/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        }).catch((err) => console.error(err));

        //console.log(id);

    }

    /*const deleteBook = useCallback((id) => {
        fetch(`http://localhost:3000/book/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            })
            .catch((err) => console.error(err));
    })*/

    /*function BookItem({ book }) {
        const deleteBook = async () => {
            try {
                const response = await fetch(`http://localhost:3000/deletebook/${book.id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                alert("Könyv törölve!");
            } catch (err) {
                alert("Hiba történt: " + err.message);
            }
        };*/

    // biztos törlés
    /*import { useState } from "react";

    function BookItem({ book, onDelete }) {
        const [showConfirm, setShowConfirm] = useState(false);

        const handleYes = () => {
            onDelete(book.id);      // itt törölsz ténylegesen
            setShowConfirm(false); // bezárod a modalt
        };

        const handleNo = () => {
            setShowConfirm(false); // csak bezárod
        };

        return (
            <div>
                <span>{book.title}</span>
                <button onClick={() => setShowConfirm(true)}>🗑️ Törlés</button>

                {showConfirm && (
                    <div className="modal">
                        <p>Biztos törlöd?</p>
                        <button onClick={handleYes}>Igen</button>
                        <button onClick={handleNo}>Nem</button>
                    </div>
                )}
            </div>
        );
    }*/

    return <>

        <h1>Könyvek</h1>

        <ol>
            {books.map(book =><div key={book.id}> <li >{book.title}  <button onClick={() => deleteBook(book.id)}>Törlés</button></li> </div>)}
        </ol>

    </>
}