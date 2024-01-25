import { useContext } from "react";
import PublicInventory from "./PublicInventory"
import { UserContext } from "../../../App";

const LandingPage = () => {
    const { userData } = useContext(UserContext);
    const user = userData;
    return(
        <div className="page">
{(user.name && <button>go to dashboard</button>)}
        </div>
    )
}
export default LandingPage