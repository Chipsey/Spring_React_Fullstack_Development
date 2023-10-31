export const validateSignin = (formData) => {
  const errors = {};

  if (!formData.email) {
    errors.email = "Email is required.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  }

  return errors;
};

export const validateSignup = (formData) => {
  const errors = {};

  if (!formData.firstname) {
    errors.firstname = "First Name is required.";
  }

  if (!formData.lastname) {
    errors.lastname = "Last Name is required.";
  }

  if (!formData.email) {
    errors.email = "Email is required.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};
