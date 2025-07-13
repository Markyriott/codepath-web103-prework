import { Link } from "react-router-dom";


export default function Card({ creatorInfo}){
    return(
        <div style={{backgroundColor: "grey"}}>
            <p>{creatorInfo.name}</p>
            <p>{creatorInfo.description}</p>
            <p>{creatorInfo.url}</p>
            <p>{creatorInfo.imageURL}</p>
            <Link to={`/edit/${creatorInfo.id}`}>
                <button>Edit Creator</button>
            </Link>
        </div>
    )
}