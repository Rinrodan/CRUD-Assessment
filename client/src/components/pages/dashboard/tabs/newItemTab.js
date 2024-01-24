import { Button, Form, InputGroup } from "react-bootstrap"
import CreateNewItem from "../../../utils/NewItem"


const NewItemTab = () => {
    
    return (
        <>
        <div className="tab-content row" >
            <div className="row col-lg-12">
                <div className="col h1">New Item Tab</div>
            </div>
            <div className="row col-lg-12">
                <div className="col-sm-4"></div>
                <CreateNewItem />
                <div className="col"></div>
            </div>
        </div>
        </>
    )
}
export default NewItemTab