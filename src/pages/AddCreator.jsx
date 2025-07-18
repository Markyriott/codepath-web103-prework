import React, { useState } from "react";
import Card from '../components/Card';
import { supabase } from "../client";
import { Link } from "react-router-dom";

export default function AddCreator(){
    const [creatorInfo, setCreatorInfo] = useState({ name: '', description: '', url: '', imageURL: '' });
    const [updating, setUpdating] = useState(false);
    const [added, setAdded] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setUpdating(true)

        try{
            const { data, error } = await supabase.from('creators').insert([creatorInfo])
            setAdded(true);
        } catch(error){
            console.log(`Error adding creator: ${error}`)
        } finally {
            setUpdating(false)
        }
    }

    const handleChange = (e) =>{
        setCreatorInfo({
            ...creatorInfo,
            [e.target.name]: e.target.value
        })
    }
    if (added){
        return(
            <>
                <p>Creator Added!</p>
                <Link to="/" reloadDocument>
                    <button>Return Home</button>
                </Link>
            </>
        )
    }
    return (
        <>
            <p>Add Creator!</p>
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
                required
                />

                <button type="submit" disabled={updating}> Submit</button>
            </form>
        </>
    )  
}