import React from "react";
import { Link, redirect } from "react-router-dom";
import Card from '../components/Card';

export default function ShowCreators({ creators }){

    return (
        <div className="container">
        <Link to="/add" role='button'>+ Add a creator</Link>
            <div className="grid">
                {creators.map((creator) => (
                    <Link className="secondary" to={`/view/${creator.id}`}>
                        <Card key={creator.id} creatorInfo = {creator}/>
                    </Link>
                ))}
            </div>
        </div> 
    )  
}