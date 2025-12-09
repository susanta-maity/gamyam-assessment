import { createSlice } from "@reduxjs/toolkit";
import productsJson from "../../data/products.json";

const productSlice = createSlice({
    name: "products",
    initialState: {
        list: productsJson, // Load JSON data into Redux
    },
    reducers: {
        setProducts(state, action) {
            state.list = action.payload;
        },
        addProduct(state, action) {
            const lastId = state.list.length
                ? state.list[state.list.length - 1].id
                : 0;
            const stock = action.payload.stock || 0;

            const newProduct = {
                ...action.payload,
                id: lastId + 1,
                createdAt: new Date().toISOString(),
                isActive: true,
                stock
            };
            state.list.push(newProduct);
        },
        updateProduct(state, action) {
            const updated = action.payload;
            const index = state.list.findIndex(p => p.id === updated.id);
            if (index !== -1) {
                state.list[index] = updated;
            }
        },
        deleteProduct(state, action) {
            const id = action.payload;
            const product = state.list.find(p => p.id === id);

            if (product) {
                product.isActive = false;   // soft delete
            }
        }
    }
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
