import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";

export default function Login() {

    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4009/auth/signin", {
                email,
                password
            });
            if (response?.data) {
                const { name } = response.data
                localStorage.setItem('user', name)
                history.push("/");
            }
            // console.log(response.data);
        } catch (err) {
            alert(err?.response?.data?.message);
        }
    }
    return (
        <div className="mt-5">
            <form onSubmit={onSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    );
}