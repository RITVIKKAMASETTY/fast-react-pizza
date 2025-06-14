import { useState } from "react";
import { Form, redirect, useNavigation,useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
const navagate=useNavigation();
const issubmitting=navagate.state==="submitting";
const formerrors=useActionData();
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2><Form mathod="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formerrors?.phone && <p>{formerrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <button disables={issubmitting}>{issubmitting?"processing":"order now"}</button>
        </div></Form>
    </div>
  );
}
export  async function action({request})
{const formdata=await request.formData();
const data = Object.fromEntries(formdata);
const order={...data,cart:JSON.parse(data.cart),priority:data.priority==="on"};
console.log("formdata",order);
const errors={};
if(!isValidPhone(order.phone))
{
  errors.phone="invalid phone number please enter a valid phone number we might need to contact you";
}
if(Object.keys(errors).length>0)
{
  return errors;
}
//if everything is ok then create the order
const neworder=await createOrder(order);
return redirect(`/order/${neworder.id}`);
}
export default CreateOrder;
