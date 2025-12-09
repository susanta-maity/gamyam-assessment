import { useSelector } from "react-redux";
import products from "../data/products.json";
import { useEffect, useState } from "react";
const ProductCardView = () => {
    const productList = useSelector(state => state.products.list);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const filteredProducts = productList.filter((p) =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <div className="p-6">
            {/* <h2 className="text-2xl font-semibold mb-4">Product List (Card View)</h2> */}

            <div className="flex justify-between m-2" /*className="flex justify-between sticky top-0 bg-white shadow-md p-4 z-20"*/>
                <h2 className="text-2xl font-semibold">Product List (Card View)</h2>

                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-3xl border border-gray-400 p-2 rounded-md focus:outline-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-xl shadow p-5 bg-white hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-3">{item.description}</p>

                        <p className="text-lg font-bold mb-2">₹ {item.price}</p>
                        <p className="text-gray-700 mb-4">Stock: {item.stock}</p>

                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductCardView;