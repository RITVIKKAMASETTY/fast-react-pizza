import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Searchorder() {
    const [query,setquery]=useState("");
    const navigate=useNavigate();
    function handlesubmit(e){
        e.preventDefault();
        if(!query)return;
        navigate(`/order/${query}`);
        setquery("");
    }
  return (<form onSubmit={handlesubmit}><input type="text" placeholder="Serach Order" value={query} onChange={(e)=>setquery(e.target.value)}/></form>)}
