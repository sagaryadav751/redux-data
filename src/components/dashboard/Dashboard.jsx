import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart } from "../store/slices/cartSlice"


const Dashboard = () => {
  const [cate,setCate]=useState([])
  const [data,setData]=useState([])
  const dispatch = useDispatch()
  const reduxCart=(product)=>
  {
    dispatch(addToCart(product))
  }
  useEffect(()=>
  {
    axios.get("https://fakestoreapi.com/products/categories").then((res)=>{setCate(res.data)})
  },[])
 
  useEffect(()=>
  {
      axios.get('https://fakestoreapi.com/products').then((res)=>{setData(res.data)})
  },[])
  const cateData=(cate)=>
  {
    axios.get("https://fakestoreapi.com/products/category/"+cate)
    .then((res)=>{
      // console.log(res)
      setData(res.data)
      // console.log(cate)
    })
  }
  const allProducts=()=>
  {
    axios.get('https://fakestoreapi.com/products').then((res)=>{setData(res.data)})
  }
  return (
    <>
     <div className="container-fluid">
      <div className="row">
      <div className="col-md-4">
      <ul className="list-group" >
      <button><li className="list-group-item" onClick={allProducts}>All Products</li></button>
      {
    cate.map((item,index)=>
       <button key={index} >
    <li className="list-group-item" onClick={()=>{cateData(item)}}>{item}</li>
       </button>
    )
  }
  </ul>  
      </div>


      <div className="col-md-8">
      <div className="row" >
        {
          data.map((item,index)=>
            <div className="col-md-4" key={index}>
          <div className="card" style={{ width: "19rem",marginTop:"1rem" }}>
  <img src={item.image} style={{width:"15rem",height:"18rem"}} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{item.title.substring(0,20)}</h5>
    <p className="card-text">
     {item.description.substring(0,50)}
    </p>
    <Link to={`/cart/${item.id}`} className="btn btn-primary">
    ADD TO CART
    </Link>&nbsp;
    <Link to={"#"} className="btn btn-primary" onClick={()=>{reduxCart(item)}}>
    REDUX CART
    </Link>

  </div>
</div>

            </div>

          
          )
        }
        </div>
        </div>





      </div>
     </div>

    </>
  )
}

export default Dashboard
