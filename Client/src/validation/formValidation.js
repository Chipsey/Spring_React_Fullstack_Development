export const validateProductForm = (productData) => {
  const errors = {};

  if (!productData.name) {
    errors.product_name = "Product Name is required.";
  }

  if (!productData.description) {
    errors.description = "Description is required.";
  }

  if (!productData.price || isNaN(productData.price)) {
    errors.price = "Price must be a valid number.";
  }
  return errors;
};
