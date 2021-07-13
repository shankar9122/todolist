import React, { useState, useEffect } from 'react'

const EditUserForm = (props) => {

    const [user, setUser] = useState(props.currentUser);


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setUser({
            ...user,
            [name]: value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        props.updateUser(user.id, user)
    };

    useEffect(() => {
       setUser(props.currentUser);
    }, [props]);

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
                    className="btn btn-primary mt-3 mr-4"
                >
                    Update user
                </button>
                <button
                    className="button muted-button mt-3"
                    onClick={() => props.setEdit(false)}
                >
                    Cancel
                </button>
            </form>
        </>
    )
}

export default EditUserForm
