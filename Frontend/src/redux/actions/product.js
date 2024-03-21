import axios from "axios";
import baseUrl from "../../baseUrl";

export const createProduct = (newForm) => async (dispactch) => {
  try {
    dispactch({
      type: " productCreateRequest",
    });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await axios.post(
      `${baseUrl}/product/create-product`,
      newForm,
      config
    );

    dispactch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (err) {
    dispactch({
      type: "productCreateFail",
      payload: err.response.data.message,
    });
  }
};

//get all Products

export const getAllProducts = (id) => async (dispatch) => {
  try {
    dispatch({
        type:"getAllProductsShopRequest"
    })

    const {data} = await axios.get(`${baseUrl}/product/get-all-products-shop/${id}`)

    dispatch({
        type:"getAllProductsShopSuccess",
        payload:data.products,
    })



  } catch (error) {
    dispatch({
        type:"getAllProductsShopFail",
        payload:error.response.data.message,
    })
  }
};


// delete a Products

export const deleteProduct = (id) => async (dispatch) => {
    try{
        dispatch({
            type:"deleteProductRequest"
        })

        const {data} = await axios.delete(`${baseUrl}/product/delete-shop-product/${id}`,{
            withCredentials: true,
        })

        dispatch({
            type:"deleteProductSuccess",
            payload:data.message,
           
        })

       
        

    }catch(error){
        dispatch({
            type:"deleteProductFailed",
            payload:error.response.data.message,
        })
    }
}