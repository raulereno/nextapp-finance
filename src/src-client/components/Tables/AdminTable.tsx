import { CompanType } from '@/models/company.model'
import { UserType } from '@/models/user.model'
import React, { useState } from 'react'
import AdminModal from './AdminModal'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails, updateUserStatus } from '@/redux/slice/AdminSlice'
import Swal from 'sweetalert2'

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

  const deleteHandler = async (status: string ,id: string) => {
   
    Swal.fire({
      title: 'Estas seguro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `${status === 'disabled' ? 'Habilitar' : 'Deshabilitar'} usuario`,
    }).then((result) => {
      if(result.isConfirmed){
        status === 'disabled' 
        ? dispatch(updateUserStatus('enabled', id))
        : dispatch(updateUserStatus('disabled', id))
      }
    })
  }

  return (
    <div>
      {!list && <span className='loader'></span>}
      <ul>
      {list[0] && list.map((ele : any) => {
        return (<>
        <li key={ele._id}>
          <div>
            {ele.name}
          </div>
          <div>
            <button onClick={() => showHandler(ele._id)}>Abrir detalles</button>
            {type === 'usuarios' && <button onClick={()=> deleteHandler(ele.status, ele._id)}>{ele.status === 'disabled' ? 'Habilitar' : 'Deshabilitar'}</button>}
          </div>
        </li>
        </>
      )})}
      </ul>
      {show && <AdminModal props={{show, setShow, type,}} />}
    </div>
  )
}

export default AdminTable