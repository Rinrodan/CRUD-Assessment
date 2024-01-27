import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../App';
import { FormSelect } from 'react-bootstrap';



// export const DropDownButton = () => {

//   return (
//     <DropdownButton id="dropdown-basic-button" title="select an employee to view">
//       <Dropdown.Item href="#/action-1" value="1" alt='Dropdown Item'>Employee 1</Dropdown.Item>
//       <Dropdown.Item href="#/action-2" role='item'alt='Dropdown Item'>Employee 2</Dropdown.Item>
//       <Dropdown.Item href="#/action-3" role='item' alt='Dropdown Item'>Employee 3</Dropdown.Item>
//       <Dropdown.Item href="#/action-3" role='item' alt='Dropdown Item'>Employee 3</Dropdown.Item>
//     </DropdownButton>
//   );
// }




const EmployeeItems = () => {
    const { userData } = useContext(UserContext);
    const user = userData;
    const [employeeData, setEmployeeData] = useState([])
    const [inventory, setInventory] = useState([]);
    const [usersInventory, setUsersInventory] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    
   
    const handleUserVisible = () => {


    }

    const handleChange = (value) => {
        console.log("target value ", value)
        filterInventoryByUserID(value);
      };

    const FilteredInventory = () => {
        console.log(" filtered inventory users inventory", usersInventory)
        if(usersInventory.length > 0){
            return (
                <>
                <div className='items-list-container'>
        
                    <div className='authorized-inventory-list' title='Employee Inventory List' role="list">
                        <ul>
                            <li className="Authorized-inventory-header">
                                <div className='id-col'>ID</div>
                                <div className='employee-id-col'>Employee ID</div>
                                <div className='name-col'>ITEM NAME</div>
                                <div className='desc-col'>DESCRIPTION</div>
                                <div className='quantity-col'>QUANTITY</div>
                                <div className='button-col'></div>
                            </li>
                        {inventory.map(item => (
                            <li key={item.id}>
                            <div className='id-col'>{item.id}</div>
                            <div className='employee-id-col'>{item.item_userid}</div>
                            <div className='name-col'>{item.item_name}</div>
                            <div className='desc-col'>{item.item_description.length > 100 ? item.item_description.slice(0,100) + "..." : item.item_description}</div>
                            <div className='quantity-col'>{item.item_quantity}</div>
                            <div className='button-col'>
                                <button value={item.id}>
                                    see full description
                                </button>
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
                                console.log("auth inventory server response",items)
                    })
                    // .then(setShowTable(true))
                    .catch((err) => console.log(err))
                } catch (err) {
                    console.log('Failed to fetch items')
                }
            };}
            fetchData();
        }, []);

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
                            setEmployeeData(users) &&
                            console.log("users response from fetch",users)
                        } )
                        .catch((err) => console.log(err))
                    } catch (err) {
                        console.log('Failed to fetch users')
                    }
                };}
                fetchData();
            }, []);

// console.log("inventory from state ", inventory)

    const DropDown = () => {

        return (
            <label>
               
            <FormSelect defaultValue="default" onChange={(e) => handleChange(e.target.value) }>
                <option>Select and Employee to View</option>
            
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
          
        );
      }
    //   const filterInventoryByUserID = (id) => {
    //     console.log("inventory from state ", inventory)
    //     console.log("filterinventoryby user id passed value", id)
    //     const filteredInventory = inventory.filter(checkUserId);
    //         function checkUserId(item) {
    //             console.log("item_userid",item.item_userid)
    //             console.log("requested id",id)
    //             if(item.item_userid === id){
    //                 return item;
    //             } else {
    //                 return false;
    //             }
    //         } 
    //      console.log("filtered Inventory", filteredInventory)
    //      setUsersInventory(filteredInventory)
    //      return filteredInventory
    //     } 

    const filterInventoryByUserID = (id) => {
        
        const filteredItems = inventory.filter(filterByUserId);

        function filterByUserId(item) {
            let requestedID = id;
            return item.item_userid == requestedID;
          }
          console.log("filtereditems",filteredItems)
    }

// console.log("call filtered function with id 1",filterInventoryByUserID(1))




// console.log("employeeData from state", employeeData)
    
    return (
        <>
        {/* <DropDownButton /> */}
        <DropDown />
        <FilteredInventory />
        </>
    )
    }
export default EmployeeItems