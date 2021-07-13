import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import UserTable from './Table/UserTable';
import AddUserForm from './Forms/AddUserForm';
import EditUserForm from './Forms/EditUserForm';
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
    username: ''
  };


  const [users, setUsers] = useState(getLocalData());
 
  const [edit, setEdit] = useState(false);
  const [currentUser, SetCurrentUser] = useState(initialFormState);
  
  
  const editRow = (user) => {
    setEdit(true);

    SetCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username
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
        <h1 className="mb-5">CRUD App with Hooks</h1>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            {edit ? (
              <div>
                <h2>Edit user</h2>
                <EditUserForm
                  setEdit={setEdit}
                  currentUser={currentUser}
                  updateUser={updateUser}
                />
              </div>
            ) : (
                <div>
                  <h2>Add user</h2>
                  <AddUserForm
                    addUser={addUser}
                  />
                </div>
              )}
          </div>
          <div className="col-md-6 col-sm-12">
            <h2>View users</h2>
            <UserTable
              users={users}
              deleteUser={deleteUser}
              editRow={editRow}
              
           
            />
            
          </div>
        
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
          <Pagination/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
