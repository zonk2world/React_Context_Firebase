import React from 'react';
import {Button} from "@material-ui/core";
import {useAuthentication} from "../../hooks/useAuthentication";

const Login = () => {
  const {login} = useAuthentication();
  return <Button onClick={login}>login</Button>;
}

export default Login;