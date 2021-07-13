import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import UserTable from './Table/UserData';
import AddUser from './Forms/AddUser';
import EditUser from './Forms/EditUser';
import Pagination from './Table/Pagination';



const getLocalData = () => {
  let users =localStorage.getItem('lists')
  if(users) {
    return JSON.parse(users)
  }else {
    return []
  }
}

const App = () => {

  const initialFormState = {
    id: null,
    name: '',
    email: ''
  };


  const [users, setUsers] = useState(getLocalData());
 
  const [edit, setEdit] = useState(false);
  const [currentUser, SetCurrentUser] = useState(initialFormState);
  
  
  const editRow = (user) => {
    setEdit(true);

    SetCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email
    })
  };

  

  // Set Data in LocalStorage
  useEffect(() => {
  

    localStorage.setItem('lists', JSON.stringify(users))
  }, [users])



  const addUser = (user) => {
    user.id = users.length + 1;

    setUsers([...users, user]);
    console.log(users)
  }

  const deleteUser = (id) => {
    const deleteItem =  users.filter((user) => user.id !== id)
    setUsers(deleteItem);
  };

  const updateUser = (id, updatedUser) => {
    setEdit(false);

    setUsers(users.map((user) => user.id === id ? updatedUser : user))
  };


  return (
    <>
      <div className="container ">
        <h1 className="mb-5">Todo list with user list form api with pagination</h1>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            {edit ? (
              <div>
                <h4>Edit user</h4>
                <EditUser
                  setEdit={setEdit}
                  currentUser={currentUser}
                  updateUser={updateUser}
                />
              </div>
            ) : (
                <div>
                  <h4>Add user</h4>
                  <AddUser
                    addUser={addUser}
                  />
                </div>
              )}
          </div>
          <div className="col-md-6 col-sm-12">
            <h4>View users</h4>
            <UserTable
              users={users}
              deleteUser={deleteUser}
              editRow={editRow}
              
           
            />
            
          </div>
        
        </div>
        <div className="row mt-5">
          <div className="col-md-12 col-sm-12">
          <Pagination/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
