import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';


export const BasicButtonExample = () => {

  return (
    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
      <Dropdown.Item href="#/action-1" value="1">Employee 1</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Employee 2</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Employee 3</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Employee 3</Dropdown.Item>
    </DropdownButton>
  );
}

export const GetEmployeesData = () => {


}



const EmployeeItems = () => {
    const { userData } = useContext(UserContext);
    const user = userData;
    const [employeeData, setEmployeeData] = useState([])
    
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
                    .then((users) => {setEmployeeData(users)} )
                    .catch((err) => console.log(err))
                } catch (err) {
                    console.log('Failed to fetch users')
                }
            };}
            fetchData();
        }, []);

// console.log("employeeData", employeeData)
    
    return (
        <>
        <BasicButtonExample />
        </>
    )
    }
export default EmployeeItems