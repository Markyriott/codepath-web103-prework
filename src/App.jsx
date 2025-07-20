import React, { Children, useEffect,useState } from "react";
import { Link, useRoutes } from "react-router-dom";
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ViewCreator from './pages/ViewCreator';
import { supabase } from './client';


export default function App(){
    const [creators, setCreators] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const dataFetch = async ()=>{
            try{
                const { data } = await supabase.from('creators').select('*')
                console.log(data)
                setCreators(data)
            } catch(err){
                console.log(`Error retrieving data: ${err}`)
            } finally{
                setLoading(false)
            }
        }

        dataFetch()
    }, [])

    let element = useRoutes([
        {path: '/', element: <ShowCreators creators = {creators}/>},
        {path: 'view/:id', element: <ViewCreator />},
        {path: 'add', element: <AddCreator />},
        {path: 'edit/:id', element: <EditCreator />}
    ])

    if (loading){
        return (
            <>
                <Header/>
                <p aria-busy='true'>Loading...</p>
            </>
        )
    }

    return (
        <>
            <Header/>
            <div>
                {element}
            </div>
        </>
    )
}

const Header = ()=>{

    return(
        <header>
            <Link to="/"><h2>CREATORVERSE</h2></Link>
        </header>
    )
}