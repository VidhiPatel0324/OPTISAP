import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")

    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) =>{
      const {name , value, checked} =  e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])

    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => [...preve].sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }

      if(value === 'dsc'){
        setData(preve => [...preve].sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    return (
    <div className='container mx-auto p-4 w-full'>
       <div className='grid lg:grid-cols-[250px,1fr] gap-4'>
           <div className='bg-white p-4 rounded-lg shadow-lg min-h-[calc(100vh-120px)] overflow-y-scroll'>
                <h3 className='text-lg font-semibold text-gray-700 border-b pb-2'>Sort by</h3>
                <form className='text-sm flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-3'>
                      <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value="asc" className='cursor-pointer'/>
                      <label className='cursor-pointer'>Price - Low to High</label>
                    </div>
                    <div className='flex items-center gap-3'>
                      <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value="dsc" className='cursor-pointer'/>
                      <label className='cursor-pointer'>Price - High to Low</label>
                    </div>
                </form>
                <h3 className='text-lg font-semibold text-gray-700 border-b pb-2 mt-4'>Category</h3>
                <form className='text-sm flex flex-col gap-2 py-2'>
                    {productCategory.map((categoryName,index) => (
                      <div key={index} className='flex items-center gap-3'>
                         <input type='checkbox' name='category' checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} className='cursor-pointer'/>
                         <label htmlFor={categoryName?.value} className='cursor-pointer'>{categoryName?.label}</label>
                      </div>
                    ))}
                </form>
           </div>
            <div className='px-4 w-full'>
              <p className='font-medium text-gray-800 text-lg my-2'>Search Results : {data.length}</p>
              <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                  {data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading}/>
                  )}
              </div>
            </div>
       </div>
    </div>
  )
}

export default CategoryProduct
