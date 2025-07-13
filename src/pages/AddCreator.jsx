import React, { useState } from "react";
import Card from '../components/Card';
import { supabase } from "../client";

export default function AddCreator(){
    const [creatorInfo, setCreatorInfo] = useState({ name: '', description: '', url: '', imageURL: '' });
    const [updating, setUpdating] = useState(false)

    const handleSubmit = async () =>{
        setUpdating(true)

        try{
            const { data, error } = await supabase.from('creators').insert([creatorInfo])
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

    return (
        <>
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
            <p>Add</p>
        </>
    )  
}