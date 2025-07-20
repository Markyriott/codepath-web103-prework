import { Link } from "react-router-dom";


export default function Card({ creatorInfo}){
    const { name, description, imageURL } = creatorInfo;

    return(
        <article>
            {imageURL && <img height='200px' width='500px' src={imageURL}/>}
            <hgroup>
                <h3>{name}</h3>
                <small>{description}</small>
            </hgroup>
            <Link to={`/edit/${creatorInfo.id}`}>
                <button className="secondary">Edit Creator Info</button>
            </Link>
        </article>
    )
}