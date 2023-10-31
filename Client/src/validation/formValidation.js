export const validateProductForm = (productData) => {
  const errors = {};

  if (!productData.product_name) {
    errors.product_name = "Product Name is required.";
  }

  if (!productData.description) {
    errors.description = "Description is required.";
  }

  if (!productData.supplier) {
    errors.supplier = "Supplier is required.";
  }

  if (!productData.price || isNaN(productData.price)) {
    errors.price = "Price must be a valid number.";
  }

  if (!productData.category) {
    errors.category = "Category is required.";
  }

  if (!productData.gender) {
    errors.gender = "Gender is required.";
  }

  return errors;
};
