import React, { useState } from "react";
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
            <div className="container" style={{marginTop:'10px'}}>
                <p>Successfully Added {creatorInfo.name}</p>
                <Link to="/" reloadDocument>
                    <input type="button" value="Return Home"/>
                </Link>
            </div>
        )
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h3>Add a Creator:</h3>
                <fieldset>
                    <label>
                        Name
                        <input
                        type = "text"
                        id = "name"
                        name = "name"
                        value = {creatorInfo.name}
                        placeholder = "Enter your creator's name"
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <label>
                        Description
                        <textarea
                        type = "text"
                        id = "description"
                        name = "description"
                        minLength='20'
                        maxLength='100'
                        value = {creatorInfo.description}
                        placeholder = "Enter your creator's description"
                        onChange={handleChange}
                        rows={4}
                        cols={50}
                        required
                        />
                    </label>
                    <label>
                        Channel Link
                        <input
                        type = "text"
                        id = "url"
                        name = "url"
                        value = {creatorInfo.url}
                        placeholder = "Enter the link to your creator's channel"
                        onChange={handleChange}
                        />
                        <small>Optional</small>
                    </label>
                    <label>
                        Image
                        <input
                        type = "text"
                        id = "imageURL"
                        name = "imageURL"
                        value = {creatorInfo.imageURL}
                        placeholder = "Enter the link to an image of your creator"
                        onChange={handleChange}
                        />
                        <small>Optional</small>
                    </label>
                </fieldset>
                <input type="submit" value="Submit" disabled={updating}></input>
            </form>
        </div>
    )  
}