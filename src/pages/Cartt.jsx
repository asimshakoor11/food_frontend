import React from 'react'
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { loadStripe } from '@stripe/stripe-js';


export default function Cartt() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length == 0) {
        return (
            <div className='container'>
                <div className='m-5 w-100 text-center text-white fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})

    const handleDelete = (index) => { 
        dispatch({ type: "REMOVE", index: index }) 
    }
    // }

    const handleCheckOut = async () => {


        const stripe = await loadStripe("pk_test_51PG1tYJAAxwzjlgZoiLFnP5XSjVwqn47goGAqfpDDHot2Nf3ussmaAMZb66uC4ea1fKQhbFYRvCHjnVF8pENB81o00YT7oe4NO");

        const headers = {
            "Content-Type": "application/json"
        }
        const response1 = await fetch("https://food-backend-ten.vercel.app/api/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                order_data: data,
                total_price: totalPrice,
            })
        });

        const session = await response1.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }


        let userEmail = localStorage.getItem("userEmail");
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("https://food-backend-ten.vercel.app/api/orderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md' >
                <table className='table table-hover text-white'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col' className='text-success' >#</th>
                            <th scope='col' className='text-success'>Name</th>
                            <th scope='col' className='text-success'>Quantity</th>
                            <th scope='col' className='text-success'>Option</th>
                            <th scope='col' className='text-success'>Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th className='text-white' scope='row' >{index + 1}</th>
                                <td className='text-white'>{food.name}</td>
                                <td className='text-white' >{food.qty}</td>
                                <td className='text-white' >{food.size}</td>
                                <td className='text-white'>{food.price}</td>
                                <td className='text-white' >
                                    <button type="button" className="btn p-0 text-white">
                                        <Delete onClick={handleDelete} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>
        </div>
    )
}
