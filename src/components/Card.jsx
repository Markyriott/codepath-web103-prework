import { Link } from "react-router-dom";


export default function Card({ creatorInfo}){
    const { name, description, url, imageURL } = creatorInfo;

    return(
        <div>
            <p>{name}</p>
            <p>{description}</p>
            <p>{url}</p>
            <p>{imageURL}</p>
            <Link to={`/edit/${creatorInfo.id}`}>
                <button>Edit Creator</button>
            </Link>
        </div>
    )
}