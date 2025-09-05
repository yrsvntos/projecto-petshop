import { useContext } from "react";
import { CartContext } from "../../context/CartContextAPI";
import { Link } from "react-router-dom";
import type { ProdutosProps } from "../home";
import toast from "react-hot-toast";


export function Cart(){
    const {addCartItem, removeCartItem, cart, total, clearCart} = useContext(CartContext);

    function handleAddItem(item: ProdutosProps){
        toast.success("Produto adicionado no carrinho!");
        addCartItem(item);
    }

    function handleFinalizarCompra(){
        toast.success("Compra efectuada com sucesso!");
        clearCart();
    }
    return(
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>
            {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <p className="font-medium">Ops o seu carinho está vazio...</p>
                    <Link
                        to="/"
                        className="my-3 p-1 px-3 text-white font-medium rounded-md"
                        style={{backgroundColor: "#713DDD"}}    
                    >
                        Acessar os Produtos
                    </Link>
                </div>
            )}
            {cart.map((item) => (
                 <section 
                 key={item.id}
                 className="flex items-center justify-between border-b-2 border-gray-300"
             >
                 <img 
                     className="w-28"
                     src={item.cover}
                     alt={item.title} 
                 />
                 <strong>
                     Preco: {item.price.toLocaleString("pt-BR", {
                     style: "currency",
                     currency: "EUR"
                 })}
                 </strong>
                 <div className="flex items-center justify-center gap-3">
                     <button 
                         onClick={() => removeCartItem(item)}    
                         className="bg-slate-600 rounded text-white font-medium flex items-center justify-center p-1"
                     >
                         -
                     </button>
                     {item.amount}
                     <button 
                         onClick={() => handleAddItem(item)}
                         className="bg-slate-600 rounded text-white font-medium flex items-center justify-center p-1"
                     
                     >
                         +
                     </button>
                 </div>
 
                 <strong className="float-right">
                     SubTotal: {item.total.toLocaleString("pt-BR", {
                         style: "currency",
                         currency: "EUR"
                     })}
                 </strong>
             </section>
            ))}
            {cart.length > 0 && (
                <div className="flex items-center justify-between mt-3">
                    <p className="font-bold mt-4">Total: {total}</p>
                    <button 
                        style={{backgroundColor: "#713DDD"}}
                        className="rounded-md p-2 cursor-pointer text-white"
                        onClick={handleFinalizarCompra}>
                        Finalizar a compra
                    </button>
                </div>
                
            )}
        </div>
    );
}