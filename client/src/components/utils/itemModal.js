import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// edit mode TRUE => remove "disabled" from the input areas
// handle save => alert => setEdiMode(false) => add "DISABLED"  to input elements => FUNCTION that updates the item on the back end

// const item = {
//     id:1,
//     item_userid:4,
//     item_name:"asdfasdf asdf",
//     item_description:"asdf;lkasdhf;laksdjf ;alkjf;als dkjf a;dlk jads;l kajdsf lkadjsf; lkajsdf;l kajsdf ;lkadjsf ;lkajsd;f lkajsdf;kl ajsd;f kladsf",
//     item_quantity:99
// }
function ItemModal(props) {
    // const item = {
//     id:1,
//     item_userid:4,
//     item_name:"asdfasdf asdf",
//     item_description:"asdf;lkasdhf;laksdjf ;alkjf;als dkjf a;dlk jads;l kajdsf lkadjsf; lkajsdf;l kajsdf ;lkadjsf ;lkajsd;f lkajsdf;kl ajsd;f kladsf",
//     item_quantity:99
// }
// const {id, item_name, item_descriptin, item_quantity} = item;


const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const EditItemForm = () => {
  const [id, setId] = useState(props.item.id);
  const [item_userid, setItemUserId] = useState(props.item.item_userid); 
  const [item_name, setItemName] = useState(props.item.item_name);
  const [item_description, setItemDescription] = useState(
    props.item.item_description 
  );
  const [item_quantity, setItemQuantity] = useState(props.item.item_quantity); 
  const [disabled, setDisabled] = useState(true);


    const handleSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        props.onSubmit({
            id,
            item_userid,
            item_name,
            item_description,
            item_quantity,
          });
    }
    const handleEdit = () => setDisabled(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
          case 'id':
            setId(value);
            break;
          case 'item_userid':
            setItemUserId(value);
            break;
          case 'item_name':
            setItemName(value);
            break;
          case 'item_description':
            setItemDescription(value);
            break;
          case 'item_quantity':
            setItemQuantity(value);
            break;
          default:
            break;
        }
      };
return(
<>
<form onSubmit={handleSubmit}>

      <br />
      <label>
        User ID:
        <input
          type="text"
          name="item_userid"
          value={item_userid}
          disabled={disabled}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="item_name"
          value={item_name}
          disabled={disabled}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="item_description"
          value={item_description}
          disabled={disabled}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Quantity:
        <input
          type="text"
          name="item_quantity"
          value={item_quantity}
          disabled={disabled}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
</>

)
}



   
  

  return (
    <>
          <Button variant="primary" onClick={handleShow}>
        view/editItem
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View/Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <EditItemForm item={props}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
 
        </Modal.Footer>
      </Modal>

    </>
  );
}


export default ItemModal