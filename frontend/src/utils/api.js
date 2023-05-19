import axios from "axios";
import { signUp, login, clearError, logginOut } from '../store/userSlice'
import { useDispatch } from "react-redux";
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
const SERVER_URL = import.meta.env.VITE_SERVER_URL
console.log(SERVER_URL)

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const reqSignup = (userData) => async (dispatch) => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(SERVER_URL + '/signup',
            userData,
            config

        )
        const user = {
            error: null,
            user: data.user,
            isAuthenticated: true
        }
        dispatch(signUp(user))
    } catch (error) {
        console.log(error)
        const user = {
            error: error.response.data.message,
            user: null,
            isAuthenticated: false,
        }
        dispatch(signUp(user))
    }
}

export const reqLogin = (userData) => async (dispatch) => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(SERVER_URL + '/login',
            userData,
            config

        )
        // console.log(data)
        const user = {
            error: null,
            user: data.user,
            isAuthenticated: true
        }
        console.log(user)
        dispatch(login(user))
    } catch (error) {

        console.log(error)
        const user = {
            error: error.response.data.message,
            user: null,
            isAuthenticated: false,
        }
        dispatch(login(user))
    }
}
export const clearErrors = () => (dispatch) => {
    dispatch(clearError())
}

export const logOut = () => (dispatch) => {
    dispatch(logginOut())
}
// { success: true, User: newUser }