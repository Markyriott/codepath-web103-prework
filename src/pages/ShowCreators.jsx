import React from "react";
import Card from '../components/Card';

export default function ShowCreators({ creators }){
    const {name, description, imageURL, url} = creators

    return (
        <>
            <p>{creators[0].name}</p>
            <Card />
        </>
        
    )  
}