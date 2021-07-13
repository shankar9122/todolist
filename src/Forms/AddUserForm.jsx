import React, { useState } from 'react'

const AddUserForm = (props) => {

    const initialFormState = {
        id: null,
        name: '',
        username: ''
    };

    const [user, setUser] = useState(initialFormState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.name || !user.username) return
        props.addUser(user);
        setUser(initialFormState)
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                />
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary mt-3"
                >
                    Add new user
                </button>
            </form>
        </>
    )
}

export default AddUserForm
