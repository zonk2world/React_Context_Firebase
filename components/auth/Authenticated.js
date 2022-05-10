import {useAuthentication} from "../../hooks/useAuthentication";

const Authenticated = ({ children }) => {
    const { currentUser } = useAuthentication();
    if (currentUser) {
        return children;
    }
    return null;
};

export default Authenticated;