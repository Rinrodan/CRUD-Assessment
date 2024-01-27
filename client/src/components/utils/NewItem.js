import { useCallback,  useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useContext } from "react";
import { UserContext } from "../../App";


export const CreateNewItemForm = ({handleNewItemSubmit}) => {

    const [itemName, setItemName] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [itemQuantity, setItemQuantity] = useState('')
    const { userData } = useContext(UserContext);
    const user = userData;

    const newItem = {
        item_userid:user.id,
        item_name:itemName,
        item_description:itemDescription,
        item_quantity:itemQuantity
    }
    const clearForm = () => (
        setItemName('') &&
        setItemDescription('') &&
        setItemQuantity('')
    );
    // useEffect(() => {
    //     const charactersLeft = 255 - itemDescription.length;
    //     return () => {
    //         charactersLeft;
    //     };
    //   }, [itemDescription]);

    let charactersLeft = 255 - itemDescription.length


    //   console.log("characters left",charactersLeft)

    const validateForm = () => {
        if (itemName.length < 4) {

            alert(
            'Invalid Input, chose a longer name',
            )
            return}
        if (itemDescription.length < 4) {
            alert(
            'Invalid Input, chose a longer description',
            )
            return}
        if (itemDescription.length > 254) {
            alert(
            'Invalid Input, shorter Description',
            )
            return}
        if (itemQuantity <=! 1) {
            alert(
            'Invalid Input, only positive numbers',
            )
            return}
        if (isNaN(itemQuantity)) {
            alert(
            'Invalid Input, numbers only',
            )
            return      
        } else {
            handleNewItemSubmit(newItem)
            clearForm()
        }

    }

    return (
        <>
        <div className="new-item-card col-lg-8">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Item Name</InputGroup.Text>
                        <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1 item-description">Item Description </InputGroup.Text>
                        <Form.Control
                        as="textarea"
                        placeholder="Max 255 characters"
                        aria-label="Description"
                        aria-describedby="basic-addon1"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        />
                        <p></p>
                    </InputGroup>
                    <span > <div className="charactersLeft">{charactersLeft}</div> characters left</span>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Quantity</InputGroup.Text>
                        <Form.Control
                        placeholder="Quantity"
                        aria-label="Quantity"
                        aria-describedby="basic-addon1"
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(e.target.value)}
                        />
                    </InputGroup>
                    <Button className="" onClick={() => { validateForm() }}>Submit</Button>
                    <button className="btn btn-danger col col-sm-2 m-1" onClick={clearForm}>cancel</button>
                </div>
        </>
    )
}

const CreateNewItem = () => {


    const handleNewItemSubmit = useCallback((newItem) => {
console.log("handle newitem submit new item",newItem)
        if(newItem){
            fetch(`http://localhost:4400/items`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(newItem)
                })
                .then(res => res.json())
        
                .then(addedItemResponse => 
                    alert(`Congrats!!!!  ${addedItemResponse.item_name}has been added.`))

            } else {
                console.log("failed to create new user")
            }
        }, []);
  
    return (
        <>
       <CreateNewItemForm handleNewItemSubmit={handleNewItemSubmit}/>
        </>
    )
}
export default CreateNewItem;