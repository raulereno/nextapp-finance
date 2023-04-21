import { CompanType } from '@/models/company.model'
import { UserType } from '@/models/user.model'
import React, { useState } from 'react'
import AdminModal from './AdminModal'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '@/redux/slice/AdminSlice'

interface List {
  list: CompanType[] | UserType[] | [],
  type: string
}

const AdminTable = ({list, type} : List) => {
  const dispatch : Function = useDispatch()

  const [show, setShow] = useState(false)

  const showHandler = async (id: string) => {
    await dispatch(getDetails(type, id))
    setShow(true)
  }

  return (
    <div>
      {!list && <span className='loader'></span>}
      <ul>
      {list && list.map((ele : any) => {
        return (<>
        <li key={ele.name}>
          <div>
            {ele.name}
          </div>
          <div>
            <button onClick={() => {showHandler(ele._id)}}>Abrir detalles</button>
          </div>
        </li>
        </>
      )})}
      </ul>
      <AdminModal props={{show, setShow, type,}} />
    </div>
  )
}

export default AdminTable