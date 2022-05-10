import {useAuthentication} from "../../hooks/useAuthentication";

const Unauthenticated = ({ children }) => {
    const { currentUser } = useAuthentication();
    if (!currentUser) {
        return children;
    }
    return null;
};

export default Unauthenticated;