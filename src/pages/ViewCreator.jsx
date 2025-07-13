import React, { useEffect, useState } from "react";
import Card from '../components/Card';
import { supabase } from "../client";
import { useParams, Link } from "react-router-dom";

export default function ViewCreator(){
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [creator, setCreator] = useState([]);


    useEffect(()=>{
        const dataFetch = async () => {
            try{
                const { data } = await supabase.from('creators').select('*').eq('id', id)
                setCreator(data[0])
            } catch(err){
                console.log(`Error fetching data: ${err}`)
            } finally{
                setLoading(false)
            }
        }

        dataFetch()
    },[id])

    if (loading){
        return(
            <p>Loading...</p>
        )
    }

    return (
        <>
            <p>View</p>
            <p>{creator.name}</p>
            <Link to={`/edit/${creator.id}`}>
                <button>Edit Creator</button>
            </Link>
        </>
    )  
}