
import { useState ,useEffect} from 'react';
import { useCallback } from 'react'


export const Navbar = ()=>{

    const [search,setSearch] = useState([])

    const debounce = (func) =>{
        let timer;

        return function (...args){
            const context = this;
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(()=>{
                timer = null;
                func.apply(context,args)
            },500)
        }
    }


    const [loading,setLoading] = useState(false)

    const handleChange = async (e)=>{

        let {value} = e.target
        let api = "jZK2Sfjwtplt4eYpWMVexI4RkgnPfdrFGQssO23QQ1s"
    let data = await   fetch(`https://demo.dataverse.org/api/search?q=${value}`)
    .then(res=> res.json())
    .then(json=>setSearch(json.data.items))
        console.log(data)
    }



const handleSubmit = (e)=>{
    e.preventDefault()
    setSearch("")
    console.log(search)
}
//usecallback provides us the memoization
const optimized = useCallback(debounce(handleChange),[])




    return (
        <>

<div class="topnav" id="myTopnav">
  <a href="#home" class="active">Home</a>
  
  <a href="#contact">Contact</a>
  <div class="dropdown">
    <button class="dropbtn">Dropdown
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>


  <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input style={{width:"40%",height:"50px",marginTop:"0px"}}
            
                    id="search" type="search"
                    placeholder="Search"
                     onChange = {optimized}
                         />
                    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i>
                    
                    
                    </label>
                
                    {/* <i className="material-icons">close</i> */}
                </div>
            </form>







 

  {search?.length > 0 &&  
            <div className={"autocomplete"}>
                {search?.map((el,i)=>
                <div key = {i} className={"autocompleteItems"}>
                    <span>{el.name}</span>
                </div>
                
                )}
                
                </div>
                }



  
</div>
  
        
        </>
    )

}