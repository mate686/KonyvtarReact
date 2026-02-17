import {useState} from "react";
import {useImmer} from "use-immer";

export default function Teszt() {
    const [list,setList] = useState([]);
    //const  [list, updateList]=useImmer([]);

    const addData = () =>{
        let d = Date.now();
        //let newData = Array.from({length:10}).fill(0)
        let newData = Array.from({length: 10}).fill(0).map((_,i)=>d+i);

        setList(prev => [...prev, ...newData]);

        //setList(newData);
        //setList([...list, ...newData]);
    }

    return <>
        <button onClick={addData}>Add data</button>

        <ol>
            {list.map((item,index)=><li key={index}>{item}</li>)}
        </ol>
    </>
}