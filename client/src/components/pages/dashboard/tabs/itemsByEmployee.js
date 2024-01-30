

import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../App';
import { FormSelect, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import EditItemInModal from '../../../utils/editItemInModal';




const EmployeeItems = () => {
    const { userData,itemSelectedToEdit, updateItemSelectedToEdit } = useContext(UserContext);
    const user = userData;


    const [employeeData, setEmployeeData] = useState([])
    const [inventory, setInventory] = useState([]);
    const [usersInventory, setUsersInventory] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [lgShow, setLgShow] = useState(false);

    const itemEditContext = itemSelectedToEdit
   

    const handleSetItem = (e) => {
        const inputID = e.target.value
        fetchItemToEdit(inputID)
        setLgShow(true)
        // console.log("inputID from modal Button",inputID)
    }
    const handleClose = () => setLgShow(false)

    let navigate = useNavigate();
  
    const handleChange = async (value) => {
        const emptyArray = []
        getAUser(value)
    
        setUsersInventory(emptyArray)
     
        // console.log("target value ", value)
        await filterInventoryByUserID(value);
      };

    const getAUser = (id) => {
        const filteredUserObject = [];
        const filteredUser = employeeData.filter(filterByUserId);

        
        function filterByUserId(user) {
            let requestedID = id;
            // console.log("users filter passed from .filter :::::::::::::::::::::::::::::",user)
            if(user.id == requestedID){
                JSON.stringify(user)
                filteredUserObject.push(user)
                return user;
            }
              
        }
        filteredUser.push(filteredUserObject)
        // console.log("users filter result :::::::::::::::::::::::::::::", filteredUserObject)
        // console.log("selected user from state", selectedUser)

          setSelectedUser(filteredUserObject[0])
        //   console.log("selected user from state", selectedUser)
    }
    // console.log("selected user from state", selectedUser)
    const FilteredInventory = () => {
        // console.log(" filtered inventory users inventory", usersInventory)
        const employeeName = `${selectedUser.first_name} ${selectedUser.last_name}`;
        if(usersInventory.length > 0){
            return (
                <>
       
                <div className='items-list-container slide-in-left'>
        
                    <div id='employee-filtered-inventory' className='authorized-inventory-list' title='Employee Inventory List' role="list">
                        <div className='employee-name'> Items added by: <span className='h3'> {employeeName}</span></div>
                        <ul>
                            <li className="Authorized-inventory-header">
                                <div className='id-col'>ID</div>
                                <div className='employee-id-col'>Employee ID</div>
                                <div className='name-col'>ITEM NAME</div>
                                <div className='desc-col'>DESCRIPTION</div>
                                <div className='quantity-col'>QUANTITY</div>
                                <div className='button-col'></div>
                            </li>
                        {usersInventory.map(item => (
                            <li key={item.id}>
                            <div className='id-col'>{item.id}</div>
                            <div className='employee-id-col'>{item.item_userid}</div>
                            <div className='name-col'>{item.item_name}</div>
                            <div className='desc-col'>{item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}</div>
                            <div className='quantity-col'>{item.item_quantity}</div>
                            <div className='button-col'>
                            <Button variant="primary" value={item.id} onClick={handleSetItem}>
                                    View
                                </Button>
                            </div>
                            </li>
                        ))}
                        </ul>
                    </div>

                
                </div>
                </>
            )

        } else {
            return (
                <>
                <div className='items-list-container'>
                    <div className='items-list-empty'>
                        <div>Users Items Will Load Here</div>
                    </div>
                </div>
                </>
            )
        }

    }

    useEffect(() => {
            
        const fetchData = async () => {
            if(user.username){
                try {
                    fetch('http://localhost:4400/inventory', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => res.json())
                    .then(items => {
                        setInventory(items)
                                // console.log("auth inventory server response",items)
                    })
                    // .then(setShowTable(true))
                    .catch((err) => console.log(err))
                } catch (err) {
                    console.log('Failed to fetch items')
                }
            };}
            fetchData();
        }, [usersInventory]);

        useEffect(() => {
            const fetchData = async () => {
                if(user.username){
                    try {
                        fetch('http://localhost:4400/users', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => res.json())
                        .then((users) => {
                            setEmployeeData(users)
                            // console.log("users response from fetch",users)
                        } )
                        .catch((err) => console.log(err))
                    } catch (err) {
                        console.log('Failed to fetch users')
                    }
                };}
                fetchData();
            }, []);

            // useEffect(() => {
            
            //     const updateUsernameField = async () => {
            //         if(usersInventory){
            //             try {
            //                 ActiveEmployeeName();
                        
            //             } catch (err) {
            //                 console.log('Failed to fetch items')
            //             }
            //         };}
            //         updateUsernameField();
            //     }, [inventory]);

// console.log("inventory from state ", inventory)

    const DropDown = () => {

        return (
            <>
            
            <label>
               
            <FormSelect 
                defaultValue="default" 
                id='employee-selector-button'
                className='bg-primary text-light Bold text'
                onChange={(e) => handleChange(e.target.value)} >
                <option>Select an Employee to View</option>
            
                {employeeData.map(({id, first_name, last_name }, index) => {
                    return (
                    <option
                        key={index} 
                        value={id} 
                        role="select"
                        alt='Dropdown Item'>
                            {first_name} {last_name}
                    </option>
                    )
                })}
            </FormSelect>
            </label>
            </>
        );
      }


    const filterInventoryByUserID = (id) => {
        const filteredItems = inventory.filter(filterByUserId);
        function filterByUserId(item) {
            let requestedID = id;
            return item.item_userid == requestedID;  }
        //   console.log("filtereditems",filteredItems)
          setUsersInventory(filteredItems)
    }


    const fetchItemToEdit = async (id) => {
        const inputID = id
        try {
            fetch(`http://localhost:4400/item/${inputID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json())
            .then(requestedItem => {
                updateItemSelectedToEdit(requestedItem)
    
                        // console.log("auth inventory server response",requestedItem)
            })
            // .then(setShowTable(true))
            .catch((err) => console.log(err))
        } catch (err) {
            console.log('Failed to fetch items')
        }
     }
     function ViewEditDeleteModal() {
        return (
          <>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>View - Edit - Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>

              <EditItemInModal closeModal={handleClose}/>

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
// console.log("call filtered function with id 1",filterInventoryByUserID(1))
// console.log("employeeData from state", employeeData)
    
    return (
        <>
<ViewEditDeleteModal />
            <DropDown />
            <FilteredInventory />
        </>
    )
}
export default EmployeeItems;