
import  axios  from 'axios'
import baseUrl from '../../baseUrl'
export const createProduct=(newForm)=>async(dispactch)=>{
    try {
        dispactch({
            type:" productCreateRequest"
        })
        const config ={
            headers:{"Content-Type":"multipart/form-data"}
        }
        const {data} = await axios.post(`${baseUrl}/product/create-product`,newForm,config);

        dispactch({
            type:"productCreateSuccess",
            payload:data.product,
        });

    }catch(err){
        dispactch({
            type:"productCreateFail",
            payload:err.response.data.message,
        })

    }
}