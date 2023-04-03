import {NextApiRequest, NextApiResponse} from 'next'

const url = 'http://localhost:3000/api/user'

const verifyUser = async (email: string) => {
    const user = await fetch(url, {
        method: 'GET',
        body: JSON.stringify(email),
    })

    if(user){
        return user
    }
}