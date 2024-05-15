import React, { useEffect, useRef, useState } from 'react'

import { useDispatchCart, useCart } from './ContextReducer';
import toast, { Toaster } from 'react-hot-toast';



export const Card = (props) => {

    let dispatch = useDispatchCart();
    let data = useCart();
    let priceRef = useRef();

    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                toast.success("Item updated in cart");
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                toast.success("Item Added in cart");
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        toast.success("Item Added in cart");
    }

    let finalPrice = qty * parseInt(options[size])
    useEffect(() => {
        setSize(priceRef.current.value)
    })

    return (
        <div>
            <div className="card mt-3" style={{ "width": "16rem", "maxheight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ objectFit: "fill", height: "150px" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="w-100">
                        <div>
                            <select name="" id="" className='m-2 h-100  bg-success rounded text-white' onChange={(e) => { setQty(e.target.value) }}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option className='text-white' key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select name="" id="" className='m-2 h-100 bg-success rounded text-white' ref={priceRef} onChange={(e) => { setSize(e.target.value) }}>{
                                priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                        </div>

                        <div className='m-2 d-inline h-100 fs-5'>Rs{finalPrice}-/</div>
                    </div>
                    <hr />
                    {(localStorage.getItem("authtoken")) ?
                        <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to cart</button> : ""}

                </div>
            </div>
            <Toaster />
        </div>
    )
}
