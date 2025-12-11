import axios from "axios"

const api="${process.env.REACT_APP_API_URL}/api/products"
export const fetchProducts = async()=>{
    try{
        const response=await axios.get(api)
        console.log("response ",response)
    }catch(error){
        console.error(error)
    }
}