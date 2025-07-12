import React, { Children } from "react";
import { useRoutes } from "react-router-dom";
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ViewCreator from './pages/ViewCreator';
import { supabase } from './client';


export default function App(){

    let element = useRoutes([
        {path: '/', element: <ShowCreators />},
        {path: 'view:id', element: <ViewCreator />},
        {path: 'add', element: <AddCreator />},
        {path: 'edit:id', element: <EditCreator />}
    ])

    return element;
}