import Cart from '../src/components/cart/cart'
import CartContextProvider from '../src/context/CartContext'

const CartPage = () => {
  return (
    <CartContextProvider>
      <Cart />
    </CartContextProvider>
  )
}

export default CartPage
