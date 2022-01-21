import { useSetRecoilState } from "recoil";
import API from "./api";
import { authAtom } from "./auth";

export { useUserActions };

function authHeader() {
    const token = "";
    const isLoggedIn = !!token;
    if (isLoggedIn) {
        return { Authorization: `${token}` };
    } else {
        return {};
    }
}

async function useUserActions() {
    const setAuth = useSetRecoilState(authAtom);

    return {
        signUp,
        login,
        logout,
    }

    async function signUp(username, password) {
        const config = {
            headers: authHeader()
        }
        try {
            const response = await API.post('/user/register/', {
                username: username,
                password: password
            }, config);
            return response;
        } catch (error) {
            return error.response;
        }
    }
    
    async function login(username, password) {
        const config = {
            headers: authHeader()
        }
        try {
            const response = await API.post('/user/login/', {
                username: username,
                password: password
            }, config);
            const token = response.data.token;
            setAuth(token);
            console.log(token);
            localStorage.setItem('token', JSON.stringify(token));
            return response;
        } catch (error) {
            return error.response;
        }
    }

    function logout() {
        localStorage.removeItem('user');
        setAuth(null);
        // history.push('/login');
    }
}

