import { useState, createContext, type ReactNode } from "react";
import { type ProdutosProps } from "../pages/home";
import toast from "react-hot-toast";

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addCartItem: (novoProduto: ProdutosProps) => void;
    removeCartItem: (produto: CartProps) => void;
    total: string;
    clearCart: () => void;
    
}

interface CartProps{
    id: number;
    title: string;
    description: string;
    cover: string;
    price: number;
    amount: number;
    total: number;
}

interface CartProviderProps{
    children: ReactNode
}

export const CartContext = createContext ({} as CartContextData)

export function CartProvider({children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("")

    function addCartItem(novoProduto: ProdutosProps){
        const indexItem = cart.findIndex(item => item.id === novoProduto.id);

        if(indexItem !== -1){
            let cartList = cart;
            // se entrou aqui apenas somamos +1 na quantidade e calculamos o total desse carinho
            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;
            setCart(cartList);
            totalResultCart(cartList)
            return;
            //adicionar esse item na lista
        }

        let data = {
            ...novoProduto,
            amount: 1,
            total: novoProduto.price
        }
        setCart(produtos => [...produtos, data]);
        totalResultCart([...cart, data])
        
    }

    
    function removeCartItem(produto: CartProps){

        const indexItem = cart.findIndex(item => item.id === produto.id);

        if(cart[indexItem]?.amount > 1){
            let cartList =  cart;
            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;
            toast.success("Produto removido do carrinho!",
                {
                    style: {
                        borderRadius: 10,
                        backgroundColor: "#121212",
                        color: "#fff"
                    }
                }
            );
            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        const removeItem = cart.filter(item => item.id !== produto.id);
        toast.success("Produto removido do carrinho!");
        setCart(removeItem);
        totalResultCart(removeItem)

    }

    function totalResultCart(items: CartProps[]){
        let myCart = items;
        let result =  myCart.reduce((acc, obj) => {return acc + obj.total}, 0)
        const resultFormat = result.toLocaleString("pt-BR", {style: "currency", currency: "EUR"});
        setTotal(resultFormat);
    }

    function clearCart(){
        setCart([]);
    }
    return(
        <CartContext.Provider 
            value={{
                cart,
                cartAmount: cart.length,
                addCartItem,
                removeCartItem,
                total,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}