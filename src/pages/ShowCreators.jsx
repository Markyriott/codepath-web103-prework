import React from "react";
import { Link, redirect } from "react-router-dom";
import Card from '../components/Card';

export default function ShowCreators({ creators }){

    return (
        <div className="container">
            <Link to="/add">Add a Creator</Link>
            <div className="grid">
                {creators.map((creator) => (
                    <Link to={`/view/${creator.id}`}>
                        <Card key={creator.id} creatorInfo = {creator}/>
                    </Link>
                ))}
            </div>
        </div> 
    )  
}