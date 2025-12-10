import { useEffect, useMemo, useState } from "react";
import products from "../data/products.json";
import ProductModal from "../component/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, updateProduct } from "../redux/slice/productSlice";

const ProductListView = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.products.list);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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


    const handleOpenAddModal = () => {
        setEditProduct(null);
        setModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setEditProduct(product);
        setModalOpen(true);
    };

    const handleSubmit = (data) => {
        if (editProduct) {
            dispatch(updateProduct(data));
        } else {
            dispatch(addProduct(data));
        }
    };

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id));
        if (paginatedProducts?.length === 1) {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    }


    return (
        <>
            <ProductModal
                visible={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                editingProduct={editProduct}
            />
            <div className="p-6 productlist">

                {/* <div className="flex justify-between mb-2">


                    <div className="w-1/2">
                        <h2 className="text-2xl font-semibold">Product List</h2>
                    </div>
                    <div className="w-1/3 flex justify-between gap-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-3xl border border-gray-400 p-2 rounded-md focus:outline-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded min-w-fit"
                            onClick={handleOpenAddModal}
                        >
                            Add Product
                        </button>
                    </div>

                </div> */}

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">

                    <h2 className="text-2xl font-semibold flex-shrink-0">
                        Product List
                    </h2>

                    <div className="flex flex-grow max-w-md w-full gap-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="flex-grow border border-gray-400 p-2 rounded-md focus:outline-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap"
                            onClick={handleOpenAddModal}
                        >
                            Add Product
                        </button>
                    </div>

                </div>


                <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Category</th>
                            <th className="p-3 border">Price (₹)</th>
                            <th className="p-3 border">Stock</th>
                            <th className="p-3 border">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedProducts.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{item.name}</td>
                                <td className="p-3 border">{item.category}</td>
                                <td className="p-3 border font-medium">₹ {item.price}</td>
                                <td className="p-3 border">{item.stock}</td>
                                <td className="p-3 border w-3">
                                    <div className="flex gap-3">
                                        <button className="rounded bg-blue-600 px-3 py-2 text-white" onClick={() => handleOpenEditModal(item)}>Edit</button>
                                        <button className="rounded bg-red-500 px-3 py-2 text-white" onClick={() => handleDeleteProduct(item.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
        </>
    )
}

export default ProductListView;