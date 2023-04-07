import NavBar from '@/src-client/components/NavBar'
import verifyUserCompany from '@/src-client/utilities/verifyCompany'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Company = () => {
    const {data: session} = useSession()
    const [company, setCompany] = useState('loadingCompany')
    const email = session?.user?.email
    
    const verification = async () => {
      if(email){
        const res = await verifyUserCompany(email)
        if(company !== res.data.msg) setCompany(res.data.msg)
      }
    }
    if(company === 'loadingCompany') verification()
    // if(company !== 'loadingCompany' && company !== 'Not found') ACA VOY A PEDIR LOS INCOMES Y EXPENSES DE LA COMPANIA
    useEffect(() => {
      
    }, [company])
    
  return (
    <>
    <NavBar page='Company'/>
    {company === 'loadingCompany' && <span className="loader"></span>}
    {company === 'Not found' && <h1>Not found</h1>}
    {company !== 'loadingCompany' && company !== 'Not found' && <h1>{`Perteneces a ${company}`}</h1>}
    </>
  )
}

export default Company