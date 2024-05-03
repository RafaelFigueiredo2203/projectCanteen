import { Link } from "react-router-dom"


type ProductDataProps = {
  title:string
  description: string
  thumbnail:string
  quantity?: number
  titleCaregory?:string
  hreference:string
}



export function ProductCard({title,description, thumbnail, quantity , hreference}:ProductDataProps)  {
  return(
    <>

    <Link  className="flex w-full flex-row  items-center pb-4"  to={hreference}>
      
      <img src={thumbnail} className="w-20 h-20 rounded-md"/>
     
      <div className="flex-1 ml-3"> 
      <div className="flex flex-row items-center ">
        <span className="text-slate-100 font-subtitle text-base flex-1 text-left">{title}</span>   
        {
          quantity && <span className="text-slate-400 font-subtitle text-sm text-left"> x {quantity}</span>
        }
        </div>
        <span className="text-slate-400 text-xs  mt-0.5 flex text-left " >{description}</span>
      </div>
    </Link>
    </>
  )
}