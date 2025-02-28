import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase/firebase.js";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
	const [currentUser, setcurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [userName, setUserName] = useState(null);
	const [userEmail, setUserEmail] = useState(null);

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email, {
			url: `${window.location.origin}/login`,
		});
	};

	const updateInfo = () => {
		if (!currentUser) {
			return false;
		}

		setUserName(currentUser.displayName);
		setUserEmail(currentUser.email);

		return true;
	};

	const setName = async (name) => {
		if (!currentUser) {
			throw new Error("No current admin");
		}

		return updateProfile(currentUser, { displayName: name });
	};

	const setEmail = async (email) => {
		if (!currentUser) {
			throw new Error("No current admin");
		}

		return updateEmail(currentUser, email);
	};

	const setPassword = async (password) => {
		if (!currentUser) {
			throw new Error("No current admin");
		}

		return updatePassword(currentUser, password);
	};

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (admin) => {
			setcurrentUser(admin);
			setLoading(false);
		});

		if (currentUser) {
			updateInfo();
		}

		return unsubscribe;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				login,
				logout,
				updateInfo,
				resetPassword,
				setName,
				setEmail,
				setPassword,
				signup,
				userEmail,
				userName,
			}}
		>
			{loading ? (
				<div>
					<p>Loading...</p>
				</div>
			) : (
				<>{children}</>
			)}
		</AuthContext.Provider>
	);
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContextProvider;