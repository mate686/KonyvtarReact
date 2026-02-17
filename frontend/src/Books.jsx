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


    return <>

        <h1>Könyvek</h1>

        <ol>
            {books.map(book =><div> <li key={book.id}>{book.title}  <button>Törlés</button></li> </div>)}
        </ol>

    </>
}