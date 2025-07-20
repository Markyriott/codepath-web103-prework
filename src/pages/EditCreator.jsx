import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams,Link } from "react-router-dom";

export default function EditCreator(){
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [creatorInfo, setCreatorInfo] = useState({name: '', description: '', url: '', imageURL: ''});
    const [updating, setUpdating] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [updated, setUpdated] = useState(false);

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

    const handleSubmit = async (e) =>{
        e.preventDefault();

        setUpdating(true)
        try{
            const { data, error } = await supabase.from('creators').update([creatorInfo]).eq('id', id)
            setUpdated(true);
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

    if (updated){
        return(
            <div className="container" style={{marginTop:'10px'}}>
                <p>Successfully Updated {creatorInfo.name}'s Information</p>
                <Link to="/" reloadDocument>
                    <input value ='Return Home' type='button'/>
                </Link>
            </div>
        )
    }

    if (deleted){
        return(
            <div className="container" style={{marginTop:'10px'}}>
                <p>Successfully Deleted {creatorInfo.name}</p>
                <Link to="/" reloadDocument>
                    <input value = 'Return Home' type='button'/>
                </Link>
            </div>
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
            <p aria-busy='true'>Loading...</p>
        )
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h3>Edit Creator's Info:</h3>
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
            <button onClick={handleDelete} className="contrast">Delete Creator</button>
        </div>
    )  
}