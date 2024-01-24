import { useContext } from "react";
import { UserContext } from "../../../App";
import InventoryTabs from "./InventoryTabs";


const Dashboard = () => {
    const { userData } = useContext(UserContext);
    const user = userData;
    
    return (
        <>
        {(user.first_name) && <div className="page">
            <h1>Welcome Back {user.first_name}</h1>
            <InventoryTabs />



        </div>}
        </>
    )
}
export default Dashboard