import React from 'react'
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineReceiptRefund, HiShoppingBag } from 'react-icons/hi'
import { MdOutlineTrackChanges } from 'react-icons/md'
import {TbAddressBook} from 'react-icons/tb'
import { RxPerson } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import baseUrl from '../../baseUrl'
import { toast } from 'react-toastify'

const ProfileSidebar = ({setActive,active}) => {
    const navigate = useNavigate();


const handleLogout = () => {
    axios
    .get(`${baseUrl}/user/logout`, { withCredentials: true })
    .then((res) => {
      toast.success(res.data.message);
      window.location.reload(true);
      navigate("/login");
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });

  };    

  return (
    <div className='w-full bg-white shadow-sm rounded-sm p-4 pt-10'>
        <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=>setActive(1)}>
            <RxPerson size={20} color={active == 1 ? "red": "" }/>
            <span className={`pl-3 ${active === 1 ? "text-[red]" : ""} hidden 800px:block`}>Profile</span>
        </div>


        <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=>setActive(2)}>
            <HiShoppingBag size={20} color={active == 2 ? "red": "" }/>
            <span className={`pl-3 ${active === 2 ? "text-[red]" : ""} hidden 800px:block`}>Orders</span>
        </div>

        <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=>setActive(3)}>
            <HiOutlineReceiptRefund size={20} color={active == 3 ? "red": "" }/>
            <span className={`pl-3 ${active === 3 ? "text-[red]" : ""} hidden 800px:block`}>Refunds</span>
        </div>

        <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=>setActive(4) || navigate("/inbox")} >
            <AiOutlineMessage size={20} color={active == 4 ? "red": "" }/>
            <span className={`pl-3 ${active === 4 ? "text-[red]" : ""} hidden 800px:block`}>Inbox</span>
        </div>

        <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=>setActive(5)}>
            <MdOutlineTrackChanges size={20} color={active == 5 ? "red": "" }/>
            <span className={`pl-3 ${active === 5 ? "text-[red]" : ""} hidden 800px:block`}>Track Order</span>
        </div>

        <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=>setActive(6)}>
            <AiOutlineCreditCard size={20} color={active == 6 ? "red": "" }/>
            <span className={`pl-3 ${active === 6 ? "text-[red]" : ""} hidden 800px:block`}>Payment Methods</span>
        </div>

        <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=>setActive(7)}>
            <TbAddressBook size={20} color={active == 7 ? "red": "" }/>
            <span className={`pl-3 ${active === 7  ? "text-[red]" : ""} hidden 800px:block`}>Address</span>
        </div>
        <div className='flex items-center cursor-pointer w-full mb-8' onClick={()=>setActive(8) || handleLogout()}>
            <AiOutlineLogin size={20} color={active == 8 ? "red": "" }/>
            <span className={`pl-3 ${active === 8 ? "text-[red]" : ""}hidden 800px:block`}>LogOut</span>
        </div>


    </div>
  )
}

export default ProfileSidebar