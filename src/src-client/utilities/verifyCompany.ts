import axios from "axios"

export default async function verifyUserCompany (user: String){
    const email = user.split('@').join('%40')
    
    const url = `http://localhost:3000/api/company/verify?email=${email}`

    const res = await axios.get(url)

    return res
}