import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams,Link } from "react-router-dom";

export default function EditCreator(){
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [creatorInfo, setCreatorInfo] = useState({name: '', description: '', url: '', imageURL: ''});
    const [updating, setUpdating] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(()=>{
        const dataFetch = async () => {
            try{
                const { data } = await supabase.from('creators').select('*').eq('id', id).single()
                setCreatorInfo(data)
            } catch(err){
                console.log(`Error fetching data: ${err}`)
            } finally{
                setLoading(false)
            }
        }

        dataFetch()
    },[id])

    const handleSubmit = async () =>{
        setUpdating(true)
        try{
            const { data, error } = await supabase.from('creators').update([creatorInfo]).eq('id', id)
            console.log(data)
        } catch(error){
            console.log(`Error updating creator: ${error}`)
        } finally {
            setUpdating(false)
        }
    }
    const handleDelete = async () =>{
        setUpdating(true)
        try{
            const { data, error } = await supabase.from('creators').delete().eq('id',id)
            setDeleted(true);
        } catch(error){
            console.log(`Error deleting creator: ${error}`)
        } finally {
            setUpdating(false);
        }
    }
    if (deleted){
        return(
            <>
                <p>Creator {creatorInfo.name} Deleted</p>
                <Link to="/" reloadDocument>
                    <button>Return Home</button>
                </Link>
            </>
        )
    }
    const handleChange = (e) =>{
        setCreatorInfo({
            ...creatorInfo,
            [e.target.name]: e.target.value
        })
    }

    if (loading){
        return(
            <p>Loading...</p>
        )
    }

    return (
        <>
            <p>Edit</p>
            <form onSubmit={handleSubmit}>

                <input
                type = "text"
                id = "name"
                name = "name"
                value = {creatorInfo.name}
                placeholder = "Enter your creator's name"
                onChange={handleChange}
                required
                />

                <textarea
                type = "text"
                id = "description"
                name = "description"
                value = {creatorInfo.description}
                placeholder = "Enter your creator's description"
                onChange={handleChange}
                rows={4}
                cols={50}
                required
                />

                <button type="submit" disabled={updating}> Submit</button>
            </form>
            <button onClick={handleDelete}>Delete Creator</button>
        </>
    )  
}