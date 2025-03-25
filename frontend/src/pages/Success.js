import React from 'react'
import SUCCESSIMAGE from '../assets/success.gif'
import {Link} from 'react-router-dom'

const Success = ({ orderId }) => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-8 rounded-lg shadow-lg h-[400px]">
      <img
        src={SUCCESSIMAGE}
        width={350}
        height={250}
        className="mb-6 rounded-lg shadow-md"
      />
      <p className = 'text-green-600 font-bold text-xl' >
        Payment Successful
      </p>
      <Link  to = {`/Orderpage/${orderId}`}className = 'p-2 px-3 my-2 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See Order </Link>
    </div>
  )
}

export default Success
