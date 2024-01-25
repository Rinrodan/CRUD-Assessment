import { useContext } from "react";
import { UserContext } from "../../../App";
import InventoryTabs from "./InventoryTabs";


const Dashboard = () => {
    const { userData } = useContext(UserContext);
    const user = userData;
    
    return (
        <>
        <div role="container">
        {(user.first_name) && <div className="page">
            <h1>Welcome Back {user.first_name}</h1>
            <InventoryTabs />



        </div>}
        </div>
        </>
    )
}
export default Dashboard