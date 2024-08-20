import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { addToCart } from "../store/slices/cartSlice"
import ReactImageMagnify from "react-image-magnify"
import { ClimbingBoxLoader } from "react-spinners"


const Cart = () => {
    const[state,setState]=useState([])
    const{id}=useParams()
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    useEffect(()=>
    {
            axios.get("https://fakestoreapi.com/products/"+id).then((res)=>{setState(res.data)})
    },[id])

    const reduxCart=(product)=>
    {
       dispatch(addToCart(product))
    }

useEffect(()=>
{
    setLoading(true)
    setTimeout(()=>
    {
        setLoading(false)
    },5000)
},[])

  return (
    <>
       {
        loading?
        (
            <div style={{textAlign:"center",marginTop:"20%",marginLeft:"48%"}}>
                <ClimbingBoxLoader></ClimbingBoxLoader>
            </div>
        ):
        (
            <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                    <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: state.image
    },
    largeImage: {
        src: state.image,
        width: 1200,
        height: 1800
    }
}} />
                    </div>
                    <div className="col-md-7">
                        <p><b>{state.title}</b></p>
                        <p>{state.description}</p>
                        <div style={{display:"flex"}}>
                        <button className="btn btn-success">-</button>
                        <p style={{border:"1px solid black",padding:"8px",marginTop:"1rem"}}>0</p>
                        <button className="btn btn-success"  onClick={()=>{reduxCart(state)}}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
       }
    </>
  )
}

export default Cart
