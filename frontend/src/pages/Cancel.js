import React from 'react'
import CANCELIMAGE from '../assets/cancel.gif'
import {Link} from 'react-router-dom'

const Cancel = () => {
  return (
    
<div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-8 rounded-lg shadow-lg h-[400px]">
      <img
        src={CANCELIMAGE}
        width={450}
        height={450}
        className="mix-blend-multiply"
      />
      <p className = 'text-blue-600 font-bold text-xl' >
        Payment Cancel
      </p>
      <Link  to = {"/Order"}className = 'p-2 px-3 my-2 border-2 border-blue-600 rounded font-semibold text-blue-600 hover:bg-blue-600 hover:text-white'>Go to Card </Link>
    </div>
  )
}


export default Cancel