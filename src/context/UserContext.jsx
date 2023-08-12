import { createContext, useContext, useState } from "react";
import BaseUrl from "./Api";
import { toast } from "react-toastify";


export const UserContext = createContext(null)
export function UserContextProvider({children}) {
    const [searchResult, setsearchResult] = useState([])
    const [loginuser, setLoginuser] = useState(localStorage.getItem('loginUser') != null?JSON.parse(localStorage.getItem('loginUser')):{})
    // registration
const signup =async (form) => {
    const config = {
        headers:{
            "content-type":"multipart/form-data"
        }
    }
    try {
    const {data} = await BaseUrl.post(`/auth`,form,config)
    toast.success("sign up success")
    } catch (error) {
        console.log(error.response.data.Error);
        toast.error(error.response.data.Error)
    }
}
    // login finction
const login =async (user) => {
    try {
    const {data} = await BaseUrl.post(`/auth/login`,user)
    if (data.message === 'done') {
        localStorage.setItem('loginUser',JSON.stringify(data.loggedUser));
        localStorage.setItem('token',data.token)
        setLoginuser(data.loggedUser)
        toast.success('login success')
    }

    } catch (error) {
      
        toast.error(error.response.data.Error)
    }
}
// search users
const searchUsers = async(query) =>{
    const config = {
        headers: {'authorization': `chat__${localStorage.getItem("token")}`}
      }
      try {
        const {data} = await BaseUrl.get(`/auth/search?search=${query}`,config);
        setsearchResult(data.users)
    } catch (error) {
        toast.error(error)
      }
}

    return(
        <UserContext.Provider value={{signup,login,loginuser,searchUsers,searchResult}}>
            {children}
        </UserContext.Provider> 
    )
}