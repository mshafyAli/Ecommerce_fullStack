import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('eventCreateRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('eventCreateSuccess', (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase('eventCreateFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })


    // get All Events 
    .addCase('getAllEventsRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllEventsSuccess', (state, action) => {

      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase('getAllEventsFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    

    //get All events of Shop

    .addCase('getAlleventsShopRequest',(state)=> {
      state.isLoading = true;
    })
    .addCase('getAlleventsShopSuccess',(state,action)=> {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase('getAlleventsShopFail',(state, action)=> {
      state.isLoading = false;
      state.error = action.payload;
      

    })
     //Delete a event of a shop
     
     .addCase('deleteEventRequest',(state)=>{
        state.isLoading = true;
     })
     .addCase('deleteEventSuccess',(state,action) =>{
      state.isLoading = false;
      state.message = action.payload;
     })
     .addCase('deleteEventFailed',(state,action) =>{
      state.isLoading = false;
      state.error = action.payload;
     })
     .addCase('clearErrors', (state) => {
      state.error = null;
    })



  
});
