import { useContext, useEffect } from "react";
import { UserContext } from "../../../App";

import { Navigate, useNavigate } from 'react-router-dom';
import InventoryTabs from "./tabs/inventoryTabs";




const Dashboard = () => {
    const { userData } = useContext(UserContext);
    let navigate = useNavigate();
    const user = userData;
    useEffect(() => {
        if(user.length <3){
            navigate('/')
        }
    }, [user])
    
    return (
        <>
        <div >
            {(user.first_name) && <div className="page">
                <h1>Welcome Back {user.first_name}</h1>
                <InventoryTabs />
            </div>}
        </div>
        </>
    )
}
export default Dashboard