import React, { useEffect, useState } from "react";
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
            <p aria-busy='true'>Loading...</p>
        )
    }

    return (
        <div className="container">
            <hgroup>
                <h2>{creator.name}</h2>
                {creator.imageURL && <img src={creator.imageURL}></img>}
                {creator.url && <a href={creator.url} target="_blank">Visit {creator.name}'s Channel</a>}
                <label>
                    Description
                    <h5>&emsp;{creator.description}</h5>
                </label>
            </hgroup>
            <Link role="button" to={`/edit/${creator.id}`}>Edit Creator's Info</Link>
        </div>
    )  
}