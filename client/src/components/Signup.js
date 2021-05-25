import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";


export default () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory();


    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password);
        try {
            const response = await axios.post(`http://${process.env.REACT_APP_HOST_ADDRESS}:4009/auth/signup`, {
                name,
                email,
                password
            });
            if (response?.data && response?.data?._id) {
                const { name } = response.data
                localStorage.setItem('user', name)
                history.push("/")
            }
            // console.log(response.data);
        } catch (err) {
            alert(err?.response?.data?.message);
        }
    }
    return (
        <div className="mt-5">
            <form onSubmit={onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Your name</label>
                    <input type="text" className="form-control" placeholder="Your Full Name" name="name" onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <br />
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
        </div>
    );
}
