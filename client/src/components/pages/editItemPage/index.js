import { useContext, useEffect, useState } from "react";
import EditItem from "./editItem"
import { UserContext } from "../../../App";
import { Navigate, useNavigate } from 'react-router-dom';

const EditItemPage = () => {
    const { userData} = useContext(UserContext);
    const user = userData;
    let navigate = useNavigate();

    useEffect(() => {if(user.length <3){ navigate('/') }}, [user])

    return(
        <> <EditItem /> </>      
    )
}
export default EditItemPage