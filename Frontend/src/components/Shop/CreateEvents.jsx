import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from '../../static/data';
import { createEvent } from '../../redux/actions/event';
import { toast } from 'react-toastify';

const CreateEvent = () => {
    const {seller} = useSelector((state)=>state.seller);
    const {error,success} = useSelector((state)=>state.events);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  


  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate,setStartDate] = useState(null);
  const [endDate,setEndDate] = useState(null);


  useEffect(()=>{
    if(error){
      toast.error(error);
    }
    if(success){
      toast.success("Event Created Successfully");
      navigate("/dashboard-events");
      window.location.reload();
    }

  },[error,success,dispatch])


  const submitHandler =  (e) => {
    e.preventDefault();
    const newForm = new FormData();
    images.forEach((image)=>{
        newForm.append("images", image);
    })
    
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate.toISOString());
    newForm.append("Finish_Date",endDate.toISOString());
    dispatch(createEvent(newForm));
    
  }
  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages,...files])
  }

 

//  const handleStartDateChange = (e)=>{
//     const startDate = new Date(e.target.value);
//     const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
//     setStartDate(startDate);
//     setEndDate(null);
//     document.getElementById("end-date").min = minEndDate.toISOString.slice(
//       0,
//       10
//     );
//  }


//    const handleEndDateChange = (e) => {
//     const endDate = new Date(e.target.value);
//     setEndDate(endDate);
//   };

//   const today = new Date().toISOString().slice(0, 10);

//   const minEndDate = startDate
//     ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
//         .toISOString()
//         .slice(0, 10)
//     : "";



const handleStartDateChange = (e) => {
  const startDate = new Date(e.target.value);
  const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  setStartDate(startDate);
  setEndDate(null);
  document.getElementById("end-date").min = minEndDate.toISOString().slice(0, 10);
}

const handleEndDateChange = (e) => {
  const endDate = new Date(e.target.value);
  setEndDate(endDate);
};

const today = new Date().toISOString().slice(0, 10);

const minEndDate = startDate
  ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  : "";

  return (
    <div className='w-[90%] 800px:w-[50%] h-[80vh] bg-white shadow rounded-[4px]  overflow-y-scroll p-3'>
        <h5 className='text-center text-[30px]'>Create Event</h5>
        <form onSubmit={submitHandler}>
            <br />
            <div>
                <label className='pb-2' htmlFor="">Name<span className='text-[red]'>*</span></label>
                <input type="text"
                value={name}
                name='name'
                onChange={(e)=>setName(e.target.value)}
                className='mt-2 appearance-none w-full h-[35px] border border-gray-300  focus:outline-none focus:ring-blue-500 focus:border-blue-500 px-3 placeholder-gray-400 rounded-[3px] sm:text-sm'
                placeholder='Enter Event Product Name...' />
            </div>
            <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your Event product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your Event product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your Event product price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your Event product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your Event product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="start-date"
            id='start-date'
            value={startDate ? startDate.toISOString().slice(0,10) : null}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleStartDateChange}
            min={today}
            placeholder="Enter your Event Start Date..."
          />
        </div>
       
        <br />
        <div>
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="end-date"
            id='end-date'
            value={endDate ? endDate.toISOString().slice(0,10) : null}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="Enter your Event End Date..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />

          <div className='w-full flex items-center flex-wrap'>
          <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>

          {
            images && images.map((i) => (
              <img src={URL.createObjectURL(i)} key={i}  alt="" className='h-[120px] w-[120px] object-cover m-2' />
            ))
          }
          </div>


          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          </div>
        </form>

    </div>
  )
}

export default CreateEvent