import NavBar from '@/src-client/components/NavBar'
import { getCompany } from '@/src-client/utilities/getCompany'
import verifyUserCompany from '@/src-client/utilities/verifyCompany'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Company = () => {
    const {data: session} = useSession()
    const [company, setCompany] = useState('loadingCompany')
    const companyData = useSelector((state: any) => state.CompanyReducer)
    const email = session?.user?.email
    console.log(companyData);
    
    const verification = async () => {
      if(email){
        const res = await verifyUserCompany(email)
        if(company !== res.data.msg) setCompany(res.data.msg)
      }
    }
    if(companyData.name.lenght === 0){
      if(company === 'loadingCompany') verification()
      if(company !== 'loadingCompany' && company !== 'Not found' ) getCompany(company)
    }
    
    useEffect(() => {
      
    }, [company])
    
  return (
    <>
    <NavBar page='Company'/>
    {company === 'loadingCompany' && <span className="loader"></span>}
    {company === 'Not found' && <h1>Not found</h1>}
    {companyData && <h1>{`Perteneces a ${companyData.name}`}</h1>}
    </>
  )
}

export default Company