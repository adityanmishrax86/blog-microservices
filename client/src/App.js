import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Post from './components/Post';
import SignUp from './components/Signup';


const App = () => {

    const [user, setUser] = useState(null)
    const handleCall = (cd) => {
        console.log(user);
        setUser(cd);
    }

    return (

        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/"}>Blog101</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">

                               {!user && (<> <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}>Sign In</Link>
                                </li> </>)}
                                {
                                  user && (
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/"} onClick={() => {
                                                axios.post(`http://${process.env.REACT_APP_HOST_ADDRESS}:4009/auth/signout`, {});
                                                localStorage.removeItem('user');
						window.location.reload();
                                            }}>Sign out</Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path="/" render={props => <Post setUserToParent={handleCall} />} />
                            <Route path="/sign-up" component={SignUp} />
                            <Route path='/sign-in' component={Login} />
                        </Switch>
                    </div>
                </div>
            </div></Router >
    )
}


export default App;
