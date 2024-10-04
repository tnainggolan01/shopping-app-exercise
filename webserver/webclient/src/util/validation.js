// Simple input validation
export const validateInput = (input) => {
  var inputRegex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
  if (!inputRegex.test(input)) {
    return false;
  }
  return true;
};

// Simple email validation
export const validateEmail = (email) => {
  // Validate email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
};

export const validatePassword = (password) => {
  // Validate password complexity
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return false;
  }
  return true;
};
