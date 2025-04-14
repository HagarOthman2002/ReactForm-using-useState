import backgroundImg from "../Public/background.png";
import Logo from "../Public/Logo.png";
import "./Login.css";
import { useReducer } from "react";

// Initial state
const initialState = {
  values: {
    email: "",
    password: "",
  },
  errors: {
    email: "",
    password: "",
  },
  isSubmitting: false,
  isSubmitted: false,
};

// Reducer function
function loginReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: "", // Clear error when typing
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.status,
      };
    case "SET_SUBMITTED":
      return {
        ...state,
        isSubmitted: action.status,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export default function Login({ onSwitchToSignUp }) {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { values, errors, isSubmitting, isSubmitted } = state;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD_VALUE", field: name, value });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!values.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(values.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!values.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SUBMITTING", status: true });

    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        dispatch({ type: "SET_SUBMITTED", status: true });
        dispatch({ type: "SET_SUBMITTING", status: false });
        console.log("Login form submitted with:", values);
        
        // Reset form after 2 seconds
        setTimeout(() => {
          dispatch({ type: "RESET_FORM" });
        }, 2000);
      }, 1000);
    } else {
      dispatch({ type: "SET_SUBMITTING", status: false });
    }
  };

  return (
    <div className="wrapper">
      <div className="Login">
        <div className="header">
          <img className="Logo" src={Logo} alt="" />
          <h3>Login</h3>
        </div>

        {isSubmitted && (
          <div className="success-message">Logged in successfully!</div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="Email">Email Address</label>
          <input
            type="email"
            id="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter Your Email Address"
            className={errors.email ? "error-input" : ""}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            className={errors.password ? "error-input" : ""}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="signup-text">
            Don't Have an account? <a href="#" onClick={(e) => {
          e.preventDefault();
          onSwitchToSignUp();
        }}>
          Signup
        </a>
          </p>
        </form>
      </div>
      <div className="bg-image">
        <img src={backgroundImg} alt="" />
      </div>
    </div>
  );
}