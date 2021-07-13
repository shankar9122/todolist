import React from 'react'


const UserTable = (props) => {


    
    return (
        <>
        <h5>Todo list</h5>
        <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.length > 0 ?
                        (props.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td id="txt_overflow">{user.email}</td>
                                <td>
                                    <button
                                        className="button btn btn-outline-success"
                                        onClick={() => {props.editRow(user)}}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="button btn btn-outline-danger"
                                        onClick={() => props.deleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No users</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
           

           
        </>
    )
}

export default UserTable
