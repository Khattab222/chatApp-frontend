import { createContext, useState } from "react";
import BaseUrl from "./Api";
import { toast } from "react-toastify";


export const chatcontext = createContext(null);

export const ChatContextProvider = (props) =>{

const [selectedchat, setSelectedchat] = useState(null)
const [allChats, setallChats] = useState(null)

const getChat = async (destId) =>{
  try {
    const config = {
        headers: {'authorization': `chat__${localStorage.getItem("token")}`}
      }
      const {data} = await BaseUrl.get(`/chat/ovo/${destId}`,config);
   
 
      setSelectedchat(data.chat)
  } catch (error) {
    console.log(error)
  }
}


// get all user chats
const getAllChats = async () =>{
  try {
    const config = {
        headers: {'authorization': `chat__${localStorage.getItem("token")}`}
      }
      const {data} = await BaseUrl.get(`/chat/allchats`,config);
  
      setallChats(data.chats)
  } catch (error) {
    console.log(error)
  }
}



// create group 

const createGroup = async(group) =>{
  const config = {
    headers: {'authorization': `chat__${localStorage.getItem("token")}`}
  }

  try {
    const {data} = await BaseUrl.post(`/chat/group`,group,config);
    if (data.message ==='done') {
     toast.success('group created')
     setallChats([...allChats,data.newGroupChat])
    }
  } catch (error) {
    toast.error(error.response.data.Error)
    
  }
}


    return(
        <chatcontext.Provider value={{getChat,selectedchat,getAllChats,allChats,createGroup,setSelectedchat}}>
            { props.children  }
        </chatcontext.Provider>
    )
}