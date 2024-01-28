import { useState } from "react";
import { Form } from "react-bootstrap";

import Button from 'react-bootstrap/Button';


function EditItem(){


const selectedItem = {
    id:1,
    item_userid:4,
    item_name:"asdfasdf asdf",
    item_description:"asdf;lkasdhf;laksdjf ;alkjf;als dkjf a;dlk jads;l kajdsf lkadjsf; lkajsdf;l kajsdf ;lkadjsf ;lkajsd;f lkajsdf;kl ajsd;f kladsf",
    item_quantity:99
}
    const [id, setId] = useState(selectedItem.id);
    const [item_userid, setItemUserId] = useState(selectedItem.item_userid); 
    const [item_name, setItemName] = useState(selectedItem.item_name); 
    const [item_description, setItemDescription] = useState(
      selectedItem.item_description 
    );
    const [item_quantity, setItemQuantity] = useState(selectedItem.item_quantity); 

    const submitEdits = () => {

        let itemToEdit = {
 
                    id,
                    item_userid,
                    item_name,
                    item_description,
                    item_quantity,
                  };
            
        fetch(`http://localhost:8080/items/${id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToEdit)
    
        })
        .then(res => res.json())
        .then(data => {console.log(data)})
    }
    
    return(
        <>

                </>
    )
}
export default EditItem;