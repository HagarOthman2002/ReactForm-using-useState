import backgroundImg from "../Public/background.png";
import Logo from "../Public/Logo.png";
import "./SignUp.css";

import { useReducer, useState } from "react";

// Reducer Initial State
const initialState = {
  values: {
    email: "",
    name: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  },
  errors: {
    email: "",
    name: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  },
  showPassword: false,
};

// Reducer Function
function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.payload },
        errors: { ...state.errors, [action.field]: "" }, // Clear error
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.payload },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };
    case "TOGGLE_PASSWORD":
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function SignUp({ onSwitchToLogin }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, showPassword } = state;

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);

  const validatePassword = (password) =>
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_VALUE", field: name, payload: value });
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(values.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!values.name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (values.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    if (!values.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(values.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!values.birthday) {
      newErrors.birthday = "Birthday is required";
      isValid = false;
    } else {
      const birthDate = new Date(values.birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 13) {
        newErrors.birthday = "You must be at least 13 years old";
        isValid = false;
      }
    }

    if (!values.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!validatePassword(values.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, including one number, one uppercase and one lowercase letter";
      isValid = false;
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      isValid = false;
    }

    dispatch({ type: "SET_ERRORS", payload: newErrors });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      console.log("Form is valid. Submitted values:", {
        ...values,
        password: "***",
        confirmPassword: "***",
      });

      await new Promise((res) => setTimeout(res, 1500));

      setIsSubmitted(true);
      setIsLoading(false);
      dispatch({ type: "RESET" });

      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      setIsLoading(false);
    }
  };

  const passwordStrength = calculatePasswordStrength(values.password);
  const passwordStrengthText = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"][Math.min(passwordStrength, 4)];

  return (
    <div className="container">
      <div className="background-image">
        <img src={backgroundImg} alt="background Image" />
      </div>

      <div className="signUp">
        <div className="header">
          <img src={Logo} alt="Company Logo" />
          <h3>Create an account</h3>
        </div>

        {isSubmitted && <div className="success-message">Account created successfully!</div>}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="Email">Email Address</label>
          <input
            type="email"
            name="email"
            id="Email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email address..."
            className={errors.email ? "error-input" : ""}
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="Name">Full Name</label>
          <input
            type="text"
            name="name"
            id="Name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            className={errors.name ? "error-input" : ""}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <label htmlFor="phone">Phone Number </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder="Enter Your phone Number"
            className={errors.phone ? "error-input" : ""}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <label htmlFor="BD">Birthday</label>
          <input
            type="date"
            name="birthday"
            id="BD"
            value={values.birthday}
            onChange={handleChange}
            className={errors.birthday ? "error-input" : ""}
            required
          />
          {errors.birthday && <span className="error">{errors.birthday}</span>}

          <label htmlFor="pass">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="pass"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            className={`password-input-with-bg ${errors.password ? "error-input" : ""}`}
            required
            onClick={(e) => {
              const iconClicked = e.nativeEvent.offsetX > e.target.offsetWidth - 30;
              if (iconClicked) dispatch({ type: "TOGGLE_PASSWORD" });
            }}
          />
          {values.password && (
            <div className="password-strength">
              <span>Strength: {passwordStrengthText}</span>
              <div className="strength-meter">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`strength-bar ${i < passwordStrength ? "filled" : ""}`} />
                ))}
              </div>
            </div>
          )}
          {errors.password && <span className="error">{errors.password}</span>}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={values.confirmPassword}
            className={`password-input-with-bg ${errors.confirmPassword ? "error-input" : ""}`}
            onChange={handleChange}
            placeholder="Confirm Your Password"
            required
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

          <button className="submit" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create an account"}
          </button>
        </form>

        <p>
          Already have an account?<a href="#" onClick={(e) => {
          e.preventDefault();
          onSwitchToLogin();
        }}>
          Login
        </a>
        </p>
      </div>
    </div>
  );
}
