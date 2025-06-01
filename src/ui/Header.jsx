import React from 'react'
import { Link } from 'react-router-dom'
import Searchorder from '../features/order/Searchorder'

export default function Header() {
  return (
<header><Link to="/">Fast React Pizza Co.</Link><Searchorder/><p>Tim David</p></header>
  )
}
