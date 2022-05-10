import {useContext} from "react";
import {Authentication} from "../context/AuthenticationProvider";

const useAuthentication = () => {
  return useContext(Authentication);
}

export {useAuthentication};