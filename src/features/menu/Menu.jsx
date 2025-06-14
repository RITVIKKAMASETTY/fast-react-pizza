import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "../menu/MenuItem";
function Menu() {
  const menu=useLoaderData();
  console.log(menu);
  return <ul>
    {menu.map(pizza=><MenuItem pizza={pizza} key={pizza.id}/>)}
  </ul>
}
export async function loader()
{
  const menu=await getMenu();
  console.log("loader menu=",menu);
  return menu;
}
export default Menu;
