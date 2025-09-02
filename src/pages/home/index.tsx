import { useState, useEffect, useContext } from "react";
import { api } from "../../services/api";
import { BiCartAdd } from "react-icons/bi";
import { CartContext } from "../../context/CartContextAPI";
import toast from "react-hot-toast";


export interface ProdutosProps{
    id: number;
    title: string;
    description: string;
    cover: string;
    price: number;
}
export function Home(){
    const {addCartItem} = useContext(CartContext);
    const [produtos, setProdutos] = useState<ProdutosProps[]>([]);

    useEffect(() => {
        async function getProdutos(){
            const response = await api.get("/products");
            setProdutos(response.data)
        }
        getProdutos();
    }, [])

    function handleAddItem(produto: ProdutosProps){
        addCartItem(produto);
        toast.success("Produto adicionado no carrinho!");
        return;
    }
    
    return(
        <main className="w-full max-w-7xl px-4 mx-auto">
            <h1 className="font-bold text-4xl mb-8 mt-10 text-center">Nossos Produtos!</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {produtos.map((produto) => (
                    <section className="w-full mb-6" key={produto.id}>
                        <img 
                            src={produto.cover} 
                            alt={produto.title} 
                            className="w-full rounded-lg max-h-90 mb-3"
                        />
                        <h4 className="font-medium text-2xl">{produto.title}</h4>
                        <p className="my-3">{produto.description}</p>
                        <div
                            className="flex items-center justify-between mt-5"
                        >
                            <strong>{produto.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "EUR"
                            })}</strong>
                            <button
                                onClick={() => handleAddItem(produto)}
                                style={{backgroundColor: "#713DDD"}}
                                className="rounded-md p-2 cursor-pointer"
                            >
                                <BiCartAdd size={20} color="#fff"/>
                            </button>
                            
                        </div>
                    </section>
                ))}
            </div>

        </main>
    );
}