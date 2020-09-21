import React, {useState} from 'react';
import {Grid, Typography, Box, Link} from "@material-ui/core";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import logo from "../../Images/seu-logo.png"
import "../../css/login.css"
import {GetUser} from "../Services/Login/LoginAction";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash"
import {setAuth} from "../Services/AuthApi/AuthApiAction";

const Login = () => {

    const user = useSelector(state => state.user.data) //for multi-reducer
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    })


    const FetchData = () => {
        dispatch(GetUser(userInfo.username, userInfo.password))
    }


    /*const ShowData = () => {
        if (!_.isEmpty(user.data)) {
            return (
                <Redirect to="/teacher/dashboard"/>
            )
        }
        if (user.loading) {
            return <p>loading...</p>
        }
        if (user.errorMsg !== "") {
            return <p>{user.errorMsg}</p>
        }

        return <p>Unable to get Data</p>

    }
*/
    if (!_.isEmpty(user)) {
        dispatch(setAuth(user.active, user.roles[0].role))
        // Cookies.set('user_type', `${user.roles[0].role}`)
        localStorage.setItem('user_type', `${user.roles[0].role}`);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('credential', JSON.stringify({username:userInfo.username,password:userInfo.password}));

    }

    const formHandler = () => {
        FetchData()
        if( _.isEmpty(user)) {
            dispatch(setAuth(false, ""))
        }

    }


    return (

        <Grid container className={"login-main"}>
            {/*Left-side*/}
            <Grid className={"login-left"} item xs={12} md={6}>
                <Box component={"div"} className="login-left-inner">
                    <Typography align={"center"} className="left-logo" component="div">
                        <img src={logo} alt=""/>
                    </Typography>
                    <Box className={"left-title"}>
                        <Typography align={"center"} variant="h1">Welcome to
                            southeast <br/><span>university</span></Typography>
                    </Box>
                </Box>
            </Grid>


            {/*Right-side*/}
            <Grid className="login-right" item xs={12} md={6}>
                <Box component={"div"} className="login-right-inner">
                    <Typography align={"center"} component={"div"} className={"right-logo"} style={{display: "none"}}>
                        <img src={logo} alt=""/>
                    </Typography>
                    <Box className={"right-form"}>
                        <Typography component="h1" align="center" variant="h1">Login</Typography>
                        <Typography component="p" align="center" >If you are in SEU.</Typography>
                        <form>
                            <Typography component="div" align="center" className="input">
                                <MailOutlineIcon className="form-icon"/>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    id="username"
                                    required
                                    onChange={(e) => {
                                        setUserInfo({...userInfo, username: e.target.value});
                                    }}
                                />
                            </Typography>
                            <Typography component="div" align="center" className="input">
                                <LockOpenIcon className="form-icon"/>
                                <input
                                    type="text"
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    required
                                    onChange={(e) => {
                                        setUserInfo({...userInfo, password: e.target.value});
                                    }}

                                />
                            </Typography>
                            <Typography component="div" align="center">
                                {/* <NavLink to={"/"}>
                                    <button type="submit">Login</button>
                                </NavLink>*/}
                                <button
                                    type="button"
                                    onClick={() => {
                                        formHandler()
                                        }
                                    }
                                >Login
                                </button>
                                <div id="userD"></div>
                            </Typography>
                            <Typography component="div" align="center" className="forgot-pass">
                                <Link href="#">Forgotten password?</Link>
                            </Typography>
                        </form>

                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default/* connect(mapStateToProps, mapDispatchToProps) */Login;