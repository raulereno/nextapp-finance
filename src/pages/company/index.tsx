import { Graphics } from '@/src-client/components/Graphics'
import NavBar from '@/src-client/components/NavBar'
import { getCompany } from '@/src-client/utilities/getCompany'
import { totalGenerate } from '@/src-client/utilities/totalGenerate'
import verifyUserCompany from '@/src-client/utilities/verifyCompany'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Company = () => {
    const {data: session} = useSession()
    const [company, setCompany] = useState('loadingCompany')
    const companyData = useSelector((state: any) => state.CompanyReducer)
    const email = session?.user?.email
    
    const verification = async () => {
      if(email){
        const res = await verifyUserCompany(email)
        if(company !== res.data.msg) setCompany(res.data.msg)
      }
    }
    if(companyData.name.length === 0){
      if(company === 'loadingCompany') verification()
      if(company !== 'loadingCompany' && company !== 'Not found' ) getCompany(company)
    }
    
    
    useEffect(() => {
      
    }, [companyData])
    
  return (
    <div className='background-general'>
    <NavBar page='Company'/>
    {company === 'loadingCompany' && companyData.name === ''&& <span className="loader"></span>}
    {company === 'Not found' && <h1>Not found</h1>}
    {companyData.name !== '' && 
    <>
      <h1>{`Perteneces a ${companyData.name}`}</h1>
      <div>
        <Graphics type="company" incomes={companyData.incomes} expenses={companyData.expenses} />
       </div>
    </>
    }
    </div>
  )
}

export default Company