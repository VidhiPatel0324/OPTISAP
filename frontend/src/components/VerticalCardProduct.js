import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

  return (
    <div className='container mx-auto px-4 my-6 relative w-full'>

            <h2 className='text-2xl font-semibold py-4 text-black-600'>{heading}</h2>

           <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all w-full' ref={scrollElement}>

            <button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block text-red-600' onClick={scrollLeft}><FaAngleLeft/></button>
            <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block text-red-600' onClick={scrollRight}><FaAngleRight/></button> 

           {
                loading ? (
                    loadingList.map((_,index)=>{
                        return(
                            <div key={index} className='w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] bg-white rounded-lg shadow-lg p-4'>
                                <div className='bg-gray-200 h-56 p-4 flex justify-center items-center animate-pulse rounded-md w-full'>
                                </div>
                                <div className='p-4 grid gap-3 w-full'>
                                    <h2 className='font-medium text-lg text-black p-1 py-2 animate-pulse rounded-full bg-gray-300 w-full'></h2>
                                    <p className='capitalize text-gray-500 p-1 animate-pulse rounded-full bg-gray-300 py-2 w-full'></p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-gray-700 font-medium p-1 animate-pulse rounded-full bg-gray-300 w-full py-2'></p>
                                        <p className='text-gray-500 line-through p-1 animate-pulse rounded-full bg-gray-300 w-full py-2'></p>
                                    </div>
                                    <button className='text-sm text-white px-3 py-2 rounded-full bg-red-400 animate-pulse w-full'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index)=>{
                        return(
                            <Link key={index} to={'/product/'+product?._id} className='w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] bg-white rounded-lg shadow-lg p-4'>
                                <div className='bg-gray-200 h-56 p-4 flex justify-center items-center rounded-md w-full'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                                </div>
                                <div className='p-4 grid gap-3 w-full'>
                                    <h2 className='font-medium text-lg text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-gray-500'>{product?.category}</p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                        <p className='text-gray-500 line-through'>{ displayINRCurrency(product?.price) }</p>
                                    </div>
                                    <button className='text-md bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold w-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
            }
           </div>
    </div>
  )
}

export default VerticalCardProduct
