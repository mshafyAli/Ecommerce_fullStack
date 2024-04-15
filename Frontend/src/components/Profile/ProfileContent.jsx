import { useEffect, useState } from 'react';
import React from "react";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core'
import { DataGridPro } from '@mui/x-data-grid-pro';
import { MdTrackChanges } from 'react-icons/md';
import { toast } from 'react-toastify';
import { updateUserInformation } from '../../redux/actions/user'
import baseUrl from '../../baseUrl';
import axios from 'axios';


const ProfileContent = ({ active }) => {
  const { user,error } = useSelector((state) => state.user);

  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();


useEffect(() => {
  if(error){
    toast.error(error);
  }
},[error])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password))
  };


  const handleImage = async(e) =>{
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();

    formData.append("image", file);
    await axios.put(`${baseUrl}/user/update-avatar`,formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
      withCredentials:true,
    }).then((res)=>{
      window.location.reload();
    }).catch((err)=>{
      toast.error(err);
    })
  }

  return (
    <div className="w-full">
      {/* Profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`http://localhost:3000/${user?.avatar}`}
                className="w-[150px] h-[150px] rounded-full border-[3px] border-[#3ad132] object-cover"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] flex items-center justify-center rounded-full cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-4">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input type="text" required value={name} className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email</label>
                  <input type="text" required value={email} className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} onChange={(e)=>setEmail(e.target.value)} />
                </div>


              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input type="number" required value={phoneNumber} className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} onChange={(e)=>setPhoneNumber(e.target.value)} />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                


              </div>

              

              <button className='w-[250px] h-[40px] border border-[#3a24db] cursor-pointer mt-8 text-center text-[#3a24db] rounded-[3px]' type='submit'>Update</button>
            </form>

          </div>
        </>
      )}

      {/* Order    */}
      {
        active === 2 && (
          <div>
            <AllOrders/>
          </div>
        )
      }  
      {/* Refund    */}
      {
        active === 3 && (
          <div>
            <AllRefundOrders/>
          </div>
        )
      }  
      {/* Track Order    */}
      {
        active === 5 && (
          <div>
            <TrackOrder/>
          </div>
        )
      }  

      {/* Payment */}

      {
        active === 6 && (
          <div>
            <PaymentMethods/>
          </div>
        )
      }  

      {/* Address */}

      {
        active === 7 && (
          <div>
            <Address/>
          </div>
        )
      }  

    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "/498dcvjkdfjdi78",
      orderItems:[
        {
          name:"Iphone 14 pro max"
        },
      ],
      totalPrice:2000,
      orderStatus:"Delivery",
    }
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$ " + item.totalPrice ,
      status: item.orderStatus,
    });
  });

  return (
    <div className='pl-8 pt-5'>
      <DataGridPro rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
    </div>
  )
}
const AllRefundOrders = () => {
  const orders = [
    {
      _id: "/498dcvjkdfjdi78",
      orderItems:[
        {
          name:"Iphone 14 pro max"
        },
      ],
      totalPrice:2000,
      orderStatus:"Delivery",
    }
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$ " + item.totalPrice ,
      status: item.orderStatus,
    });
  });

  return (
    <div className='pl-8 pt-5'>
      <DataGridPro rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
    </div>
  )
}


const TrackOrder = () => {
  const orders = [
    {
      _id: "/498dcvjkdfjdi78",
      orderItems:[
        {
          name:"Iphone 14 pro max"
        },
      ],
      totalPrice:2000,
      orderStatus:"Delivery",
    }
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$ " + item.totalPrice ,
      status: item.orderStatus,
    });
  });
  
  return (
    <div className='pl-8 pt-5'>
      <DataGridPro rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
      
    </div>
  )
} 

const PaymentMethods = () => {
  return (
    <div className='w-full px-5'>
      <div className='flex justify-between items-center'>
        <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>Payment Methods</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className='text-white'>Add New</span>

        </div>
      </div>
      <br />

    <div className='bg-white w-full flex justify-between items-center h-[70px] px-3 pr-10 rounde-[4px]'>
      <div className='flex items-center '>
        <img src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png" className='w-[30px] h-[20px]' alt="" />
        <h1 className='pl-5 font-[600]'>Shafy Ali</h1>
      </div>
      <div className='flex items-center pl-8'>
        <h6>1234**** *** ****</h6>
        <h3 className='pl-6'>21/12/24</h3>
      </div>
      
      <div className='pl-8 min-w-[10%]'>
        <AiOutlineDelete size={25} className='cursor-pointer' />
      </div>

    </div>


    </div>
  )
}


const Address = () =>{
  return (
    <div className='w-full px-5'>
      <div className='flex justify-between items-center'>
        <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>My Address</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className='text-white'>Add New</span>

        </div>
      </div>
      <br />

    <div className='bg-white w-full flex justify-between items-center h-[70px] px-3 pr-10 rounde-[4px]'>
      <div className='flex items-center '>
        <h1 className='pl-5 font-[600]'>Default</h1>
      </div>
      <div className='flex items-center pl-8'>
        <h6>122 DHA Karachi Pakistan</h6>
      </div>

      <div className='flex items-center pl-8'>
        <h6>(+92)-3456543555</h6>
      </div>
      
      <div className='pl-8 min-w-[10%]'>
        <AiOutlineDelete size={25} className='cursor-pointer' />
      </div>

    </div>


    </div>
  )
}

export default ProfileContent;
