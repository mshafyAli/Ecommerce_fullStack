import axios from "axios";
import baseUrl from "../../baseUrl";

export const createEvent = (newForm) => async (dispactch) => {
  try {
    dispactch({
      type: " eventCreateRequest",
    });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await axios.post(
      `${baseUrl}/event/create-event`,
      newForm,
      config
    );

    dispactch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (err) {
    dispactch({
      type: "eventCreateFail",
      payload: err.response.data.message,
    });
  }
};




// get All Events 
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
        type:"getAllEventsRequest"
    })

    const {data} = await axios.get(`${baseUrl}/event/get-all-events`)

    dispatch({
        type:"getAllEventsSuccess",
        payload:data.events,
    })


  } catch (error) {
    dispatch({
        type:"getAllEventsFail",
        payload:error.response.data.message,
    })
  }
}




//get all Events Of Shop

export const getAllEventShop = (id) => async (dispatch) => {
  try {
    dispatch({
        type:"getAlleventsShopRequest"
    })

    const {data} = await axios.get(`${baseUrl}/event/get-all-events/${id}`)

    dispatch({
        type:"getAlleventsShopSuccess",
        payload:data.events,
    })



  } catch (error) {
    dispatch({
        type:"getAlleventsShopFail",
        payload:error.response.data.message,
    })
  }
};


// delete a Products

export const deleteEvents = (id) => async (dispatch) => {
    try{
        dispatch({
            type:"deleteEventRequest"
        })

        const {data} = await axios.delete(`${baseUrl}/event/delete-shop-event/${id}`,{
            withCredentials: true,
        })

        dispatch({
            type:"deleteEventSuccess",
            payload:data.message,
           
        })

       
        

    }catch(error){
        dispatch({
            type:"deleteEventFailed",
            payload:error.response.data.message,
        })
    }
}
