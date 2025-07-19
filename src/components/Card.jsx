import { Link } from "react-router-dom";


export default function Card({ creatorInfo}){
    const { name, description, imageURL } = creatorInfo;

    return(
        <article>
            <img height={'100'} width={'500'} src={imageURL}/>
            <hgroup>
                <h4>{name}</h4>
                <p>{description}</p>
            </hgroup>
            <Link to={`/edit/${creatorInfo.id}`}>
                <button>Edit Creator</button>
            </Link>
        </article>
    )
}