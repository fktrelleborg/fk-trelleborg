import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import "./LoginSignup.css";
import useAuth from "../../hooks/useAuth";

const LoginSignup = () => {
 	const [action, setAction] = useState("Login");
	const { handleSubmit, register, formState: { errors } } = useForm();
	const { login, signup } = useAuth();

	const onSubmit = async (data) => {
		try {
			if (action === "Login") {
				await login(data.email, data.password);
				alert("Logged in successfully!");
			} else {
				await signup(data.email, data.password);
				alert("Signed up successfully!");
			}
		} catch (error) {
			const errorMessage = error.message || "An error occurred!";
			alert(errorMessage);
		}
	};

	return (
		<div className="container">
			<div className="header">
				<div className="text">{action}</div>
				<div className="underline" />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="inputs">
					{action === "Login" ? null : (
						<div className="input">
							{/* TODO: insert icon? */}
							<div className="img" />
							<input 
								type="text" 
								placeholder="Name" 
								{...register("name", { required: action !== "Login" ? "Name is required!" : false })}
							/>
						</div>
					)}
					<div className="input">
						{/* TODO: insert icon? */}
						<div className="img" />
						<input 
							type="email" 
							placeholder="Email" 
							{...register("email", { required: "Email is required!" })}
						/>
						{errors.email && <span className="text-danger">{errors.email.message}</span>}
					</div>
					<div className="input">
						{/* TODO: insert icon? */}
						<div className="img" />
						<input 
							type="password" 
							placeholder="Password" 
							{...register("password", { required: "Password is required!" })}
						/>
						{errors.password && <span className="text-danger">{errors.password.message}</span>}
					</div>
				</div>
				{action === "Sign up" ? null : (
					<div className="forgot-password">
						Lost your password?{" "}
						<Link className="link" to="/forgot-password">
							click here
						</Link>
					</div>
				)}
				<div className="submit-container">
					<Button type="submit" variant="contained">
						{action}
					</Button>
				</div>
			</form>
			<div className="button-container">
				<Button type="button" variant="contained" onClick={() => setAction("Sign up")}>
					Sign Up
				</Button>
				<Button type="button" variant="contained" onClick={() => setAction("Login")}>
					Login
				</Button>
			</div>
		</div>
	);
};


export default LoginSignup;
