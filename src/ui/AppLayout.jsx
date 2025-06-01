import React from 'react'
import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import { Outlet,useNavigation } from 'react-router-dom'
import Loader from '../ui/Loader'
export default function AppLayout() {
  const navigation=useNavigation();
const isloading=navigation.state==="loading";
  return (
    <div className="layout">
      {isloading && <Loader/>}
      <Header/>
      <main>
        <Outlet/>
      </main>
      <CartOverview/>
    </div>
  )
}
