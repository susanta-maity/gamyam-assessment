import React, { useEffect, useState } from "react";
import {
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CButton,
    CFormInput,
    CFormLabel,
} from "@coreui/react";

const ProductModal = ({ visible, onClose, onSubmit, editingProduct }) => {
    const [productForm, setProductForm] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingProduct) {
            setProductForm(editingProduct);
        } else {
            setProductForm({
                name: "",
                price: "",
                category: "",
                stock: "",
                description: "",
            });
        }
    }, [editingProduct]);

    const validate = () => {
        let newErrors = {};
        if (!productForm.name.trim()) newErrors.name = "Name is required";
        if (!productForm.price) newErrors.price = "Price is required";
        if (!productForm.category.trim()) newErrors.category = "Category is required";
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            onSubmit(productForm);
            onClose();
        }
    };

    return (
        <CModal visible={visible} onClose={onClose} alignment="center">
            
            <CModalHeader>
                <h5>{editingProduct ? "Edit Product" : "Add Product"}</h5>
            </CModalHeader>

            <CModalBody>
                <div className="mb-3">
                    <CFormLabel>Name <span className="text-red-500">*</span></CFormLabel>
                    <CFormInput
                        type="text"
                        value={productForm.name}
                        className={errors.name ? "border border-red-500" : ""}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                <div className="mb-3">
                    <CFormLabel>Price <span className="text-red-500">*</span></CFormLabel>
                    <CFormInput
                        type="number"
                        value={productForm.price}
                        className={errors.price ? "border border-red-500" : ""}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm">{errors.price}</p>
                    )}
                </div>

                <div className="mb-3">
                    <CFormLabel>Category <span className="text-red-500">*</span></CFormLabel>
                    <CFormInput
                        type="text"
                        value={productForm.category}
                        className={errors.category ? "border border-red-500" : ""}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    />
                    {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category}</p>
                    )}
                </div>

                <div className="mb-3">
                    <CFormLabel>Stock</CFormLabel>
                    <CFormInput
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                        min={0}
                    />
                </div>

                <div className="mb-3">
                    <CFormLabel>Description</CFormLabel>
                    <CFormInput
                        type="text"
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    />
                </div>
            </CModalBody>

            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>
                    Cancel
                </CButton>
                <CButton color="primary" onClick={handleSubmit}>
                    {editingProduct ? "Update" : "Add"}
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

export default ProductModal;
