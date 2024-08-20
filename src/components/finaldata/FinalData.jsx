
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, decreaseCart,removeCart } from '../store/slices/cartSlice';


const FinalData = () => {
 
  const navigate= useNavigate()
  const selector = useSelector(state=>state.cart)
  const dispatch= useDispatch()
  const clearCartData=(product)=>
  {
    
    dispatch(clearCart(product))
  }
  const increaseData=(product)=>
  {
    dispatch(addToCart(product))
  } 
  const decreaseData=(product)=>
  {
    dispatch(decreaseCart(product))
  }
  const removeData=(product)=>
  {
    dispatch(removeCart(product))
  }
  return (
    <>
        {
          selector.cartItems.length===0?
          (
            <div className="container-fluid text-center py-4">
              <div className="container">
                <div><h1 className="bold">Shopping Cart</h1></div>
                <div><p><h3>Your Cart is Empty</h3> </p></div>
                <div className="d-flex justify-content-center" >
                <p>Go to Products Page</p>
                <p onClick={()=>{navigate("/")}}><ArrowForwardIcon></ArrowForwardIcon></p>
                </div>
              </div>
            </div>
          )
          :(
           <div className="container-fluid">
            <div className="container">
              <div><h1>Shopping Cart</h1></div>
              <table>
                <thead>
                  <tr>
                    <td>Product</td>
                    <td>Action</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    selector.cartItems &&
                    selector.cartItems.map((cartItem,index)=>
                      <tr key={index} style={{borderTop:"2px solid black"}}>
                    <td style={{width:"30%"}} ><img src={cartItem.image} style={{width:"30%"}} alt="" /></td>
                    <td style={{width:"10%"}}><button onClick={()=>{removeData(cartItem)}}>REMOVE</button></td>
                    <td style={{width:"10%"}}>${cartItem.price}</td>
                    <td style={{width:"10%"}} >
                    <button className="btn btn-success" onClick={()=>{decreaseData(cartItem)}}>-</button>
                    <span style={{fontSize:"1.9rem"}}>{cartItem.cartTotalQty}</span>
                    <button className="btn btn-success" onClick={()=>{increaseData(cartItem)}}>+</button>
                    </td>
                    <td style={{width:"10%"}}>${cartItem.price*cartItem.cartTotalQty}</td>
                    
                    
                  </tr>
                    )
                  }
                </tbody>
              
              </table>
              <div className='py-5 text-center'><button className='btn btn-danger' onClick={()=>{clearCartData()}}> CLEAR ALL CART</button></div>
            </div>
           </div>
          )
        }
    </>
  )
}

export default FinalData
