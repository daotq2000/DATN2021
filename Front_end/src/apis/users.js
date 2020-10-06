import axios from "axios"
export const login = (data) =>{
    let api = "http://localhost:8080/auth";
    return axios.post(api,data);
}