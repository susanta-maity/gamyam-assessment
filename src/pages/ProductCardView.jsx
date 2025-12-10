import { useSelector } from "react-redux";
import products from "../data/products.json";
import { useEffect, useMemo, useState } from "react";
const ProductCardView = () => {
    const productList = useSelector(state => state.products.list);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, productList]);

    const filteredProducts = productList
        .filter((p) => p.isActive)
        .filter((p) =>
            p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );



    const totalPages = useMemo(() => {
        return Math.ceil(filteredProducts.length / itemsPerPage);
    }, [filteredProducts.length, itemsPerPage]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    return (
        <div className="p-6">
            {/* <h2 className="text-2xl font-semibold mb-4">Product List (Card View)</h2> */}

            <div className="flex justify-between m-2 mb-4" /*className="flex justify-between sticky top-0 bg-white shadow-md p-4 z-20"*/>
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
                {paginatedProducts.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-xl shadow py-4 px-4 bg-white hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-3">{item.description}</p>

                        <div className="flex justify-between">
                            <p className="text-lg font-bold text-blue-400">₹ {item.price}</p>
                            <p className="text-gray-700">Stock: <b>{item.stock}</b></p>
                        </div>


                        {/* <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-700"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div> */}
                    </div>
                ))}
            </div>

            {filteredProducts.length > itemsPerPage && <div className="flex justify-center mt-4 gap-3">
                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                >
                    Prev
                </button>

                <span className="px-4 py-2 font-semibold">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Next
                </button>
            </div>}
        </div>
    )
}

export default ProductCardView;