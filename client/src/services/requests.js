import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import API from "./api";
import { authAtom } from "./auth";

export { useUserActions };

function useUserActions() {
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authAtom);

    return {
        signUp,
        login,
        logout,
        getAllNotes,
        getNote,
        addNote,
        deleteNote,
        editNote,
    }

    function setToken(token) {
        setAuth(token);
        localStorage.setItem('token', JSON.stringify(token));
    }

    function authHeader() {
        const token = auth;
        const isLoggedIn = !!token;
        if (isLoggedIn) {
            return { Authorization: `${token}` };
        } else {
            return {};
        }
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
            const token = response.data.token;
            setToken(token);
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
            setToken(token);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    function logout({ redirect = true } = {}) {
        localStorage.removeItem('token');
        setAuth(null);
        if (redirect)
            navigate('/login');
    }

    async function getAllNotes() {
        const config = {
            headers: authHeader()
        }
        try {
            return await API.get('/notes/', config);
        } catch (error) {
            return error.response;
        }
    }

    async function getNote(id) {
        const config = {
            headers: authHeader()
        }
        try {
            return await API.get(`/notes/${id}`, config);
        } catch (error) {
            return error.response;
        }
    }

    async function addNote(title, detail) {
        const config = {
            headers: authHeader()
        }
        try {
            const response = await API.post(`/notes/new/`, {
                title: title,
                detail: detail
            }, config);
            return response.data;
        } catch (error) {
            return error.response;
        }
    }

    async function deleteNote(id) {
        const config = {
            headers: authHeader()
        }
        try {
            return await API.delete(`/notes/${id}`, config);
        } catch (error) {
            return error.response;
        }
    }

    async function editNote(id, title, detail) {
        const config = {
            headers: authHeader()
        }
        try {
            return await API.put(`/notes/${id}`, {
                title: title,
                detail: detail
            }, config);
        } catch (error) {
            return error.response;
        }
    }
}

