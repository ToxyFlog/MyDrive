import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {getToken} from "./services/token";
import MainPage from "./pages/main";
import LoginPage from "./pages/login";
import PageNotFound from "./pages/404";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(true);


	const checkAuthentication = () => setIsAuthenticated(!!getToken());
	useEffect(checkAuthentication, []);


	return (
		<Routes>
			<Route index element={isAuthenticated ? <MainPage/> : <Navigate to="/login"/>}/>
			<Route path="login" element={!isAuthenticated ? <LoginPage checkAuthentication={checkAuthentication}/> : <Navigate to="/"/>}/>
			<Route path="*" element={<PageNotFound/>}/>
		</Routes>
	);
};

export default App;
