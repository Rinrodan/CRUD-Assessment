import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import Header from './components/utils/Header';
import LandingPage from './components/pages/landingPage/index';
import { createContext, useEffect, useState } from 'react';



import EditItemTab from './components/pages/editItemPage';
import Dashboard from './components/pages/dashboard';




export const UserContext = createContext(null);

function App() {
  const [loggedOn, setLoggedOn] = useState(false)
  const [userData, setUserData] = useState({});
  const [inventory, setInventory] = useState([])
  const [authorizedUser, setAuthorizedUser] = useState(false)
  const [itemSelectedToEdit ,setItemSelectedToEdit] = useState({})

console.log("useState item selected to edit",itemSelectedToEdit)
  // useEffect(() => {
  //   if(myData[0] === undefined || myData[0] == ""){
  //     setAuthorizedUser(false)
  //   }
  // }, []);


  const updateUserData = (data) => { setUserData(data); setAuthorizedUser(true) }
  const updateInventoryData = (data) => setInventory(data)
  const updateItemSelectedToEdit = (data) => setItemSelectedToEdit(data)



  function GetFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  const myData = GetFromLocalStorage("added-items")

  // console.log(" APP.js userdata from state context",userData)
  // console.log(" APP.js authorizedUser from state context",authorizedUser)
  // console.log(" APP.js local storage",myData)

  return (
    <UserContext.Provider value={{ userData, itemSelectedToEdit, updateUserData, updateInventoryData, updateItemSelectedToEdit}}>
      <div className="App">
        <header>
          <Header />
          
        </header>
        <main>
 
          <Routes>
            <Route path="/" element={<LandingPage />}/>
                <Route path="/dashboard/:username" element={<Dashboard />} />
                <Route path="/items/:itemid" element={<EditItemTab />} />
                  {/* <Route path="/userdashboard/:username/*" element={<UserDashboard />} /> */}
          </Routes>
   
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
