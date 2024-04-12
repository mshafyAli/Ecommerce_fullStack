import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { deleteProduct } from '../../redux/actions/product';
import Loader from '../Layout/Loader';
import { Button } from '@material-ui/core'
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { deleteEvents, getAllEventShop } from '../../redux/actions/event';

const AllEvents = () => {

    const dispatch = useDispatch();

    const {events,isLoading} = useSelector((state) => state.events);
    const {seller} = useSelector((state) => state.seller);


   


    useEffect(() => {
        dispatch(getAllEventShop(seller._id));
    },[dispatch])

   
    const handleDelete = (id) => {
        dispatch(deleteEvents(id));
        window.location.reload();
        // console.log(id);
    }


    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 180,
          flex: 1.4,
        },
        {
          field: "price",
          headerName: "Price",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "Stock",
          headerName: "Stock",
          type: "number",
          minWidth: 80,
          flex: 0.5,
        },
    
        {
          field: "sold",
          headerName: "Sold out",
          type: "number",
          minWidth: 130,
          flex: 0.6,
        },
        {
          field: "Preview",
          flex: 0.8,
          minWidth: 100,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/product/${params.id}`}>
                  <Button>
                    <AiOutlineEye size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
        {
          field: "Delete",
          flex: 0.8,
          minWidth: 120,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Button onClick={() => handleDelete(params.id)}>
                  <AiOutlineDelete size={20} />
                </Button>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      events &&
        events.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            price: "US$ " + item.discountPrice,
            Stock: item.stock,
            sold: item?.sold_out,
            Preview: '', // Add this line to ensure the "Preview" column is shown
            Delete: '',  // Add this line to ensure the "Delete" column is shown
          });
        });

  return (
   <>
   {
    isLoading ? <Loader/> : 
    (<div className='w-full mx-8 pt-1 mt-10 bg-white'>
          <DataGridPro rows={row} columns={columns} pageSize={10} disableRowSelectionOnClick autoHeight />
    </div>
   )}
   </>
  )
}

export default AllEvents