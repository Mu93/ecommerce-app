"use client";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { Cart } from ".";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  // console.log(showCart);
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Mu Hakeem Headphones</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
