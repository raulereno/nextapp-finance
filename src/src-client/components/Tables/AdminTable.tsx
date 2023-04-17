import { CompanType } from '@/models/company.model'
import { UserType } from '@/models/user.model'
import React from 'react'

interface List {
  list: CompanType[] | UserType[] | []
}

const AdminTable = ({list} : List) => {
  console.log(list)
  return (
    <div>
      {!list && <span className='loader'></span>}
      <ul>
      {list && list.map((ele : any) => {
        return (<>
        <li key={ele.name}>
          {ele.name}
        </li>
        </>
      )})}
      </ul>
    </div>
  )
}

export default AdminTable