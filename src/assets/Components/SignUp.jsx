import backgroundImg from "../Public/background.png";
import Logo from "../Public/Logo.png";
import "./SignUp.css";

import { useState } from "react";

export default function SignUp() {
  const [values, setValues] = useState({
    email: "",
    name: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  };

  const validatePassword = (password) => {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
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

    setErrors(newErrors);
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

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      setIsLoading(false);

      setValues({
        email: "",
        name: "",
        phone: "",
        birthday: "",
        password: "",
        confirmPassword: "",
      });

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
          <img src={Logo} alt="Company Logo" aria-hidden="true" />
          <h3>Create an account</h3>
        </div>

        {isSubmitted && <div className="success-message">Account created successfully!</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
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

          {/* Name */}
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

          {/* Phone */}
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

          {/* Birthday */}
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

          {/* Password */}
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
              const target = e.target;
              const iconClicked = e.nativeEvent.offsetX > target.offsetWidth - 30;
              if (iconClicked) setShowPassword(!showPassword);
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

          {/* Confirm Password */}
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

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create an account"}
          </button>
        </form>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
