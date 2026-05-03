import CartContextProvider from "@/context/CartContextProvider";

function Provides({ children }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}

export default Provides;
