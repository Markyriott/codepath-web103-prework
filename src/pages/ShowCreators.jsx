import React from "react";
import { Link, redirect } from "react-router-dom";
import Card from '../components/Card';

export default function ShowCreators({ creators }){

    return (
        <div>
            <Link to="/add">Add Creator</Link>
            {creators.map((creator) => (
                <Link to={`/view/${creator.id}`}>
                    <Card key = {creator.id} creatorInfo = {creator}/>
                </Link>
            ))}
        </div> 
    )  
}