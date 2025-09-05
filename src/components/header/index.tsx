import { useContext } from "react";
import { CartContext } from "../../context/CartContextAPI";
import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";

export function Header(){
    const {cartAmount} = useContext(CartContext);
    return(
        <header 
            className="w-full mx-auto"
            style={{backgroundColor: "#713DDD"}}
        >
            <nav 
                className="max-w-7xl h-14 flex items-center justify-between px-5 mx-auto"
                
            >   <Link to="/">
                    <h1 className="font-bold text-4xl text-white">Petshop Dev</h1>
                </Link>
                <div className="relative">
                    <Link to="/cart">
                        <BiShoppingBag size={24} color="#fff" />
                        {cartAmount > 0 && (
                            <span 
                                className="absolute -right-2 -top-2 px-2.5 bg-sky-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs1">
                                {cartAmount}
                            </span>
                        )}
                    </Link>
                    
                    
                </div>
                
            </nav>
        </header>
    );
}