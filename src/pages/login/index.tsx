import React, {useState} from "react";
import logo from "assets/logo.svg";
import {Header, Logo, Page, Title, Wrapper} from "./index.styles";
import Form, {FormInput} from "./Form";
import {useNavigate} from "react-router-dom";
import LinkButton from "components/LinkButton";

type LoginData = {
	username: string;
	password: string;
}

const initialLoginData: LoginData = {username: "", password: ""};
const loginInputs: FormInput[] = [
	{name: "username", placeholder: "Username", maxLength: 30, errorMessage: "Username must be between 4 - 30 characters long!"},
	{name: "password", placeholder: "Password", maxLength: 128, errorMessage: "Password must be between 4 - 128 characters long!"},
];

type SignupData = {
	username: string;
	password: string;
	confirmPassword: string;
}

const initialSignupData: SignupData = {username: "", password: "", confirmPassword: ""};
const signupInputs: FormInput[] = [
	...loginInputs,
	{name: "confirmPassword", maxLength: 128, errorMessage: "Passwords don't match!", placeholder: "Confirm password"},
];

type LoginProps = {
	checkAuthentication: Function | undefined;
}

const LoginPage = ({checkAuthentication = () => {}}: LoginProps) => {
	const navigate = useNavigate();
	const [isLoginShown, setIsLoginShown] = useState(true);


	const goToDrive = () => {
		localStorage.setItem("JWT", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QgVXNlcm5hbWUiLCJleHAiOjE2OTYyMzkwMjJ9.KugsjwVJmBx-93flGk3g0Eq90zARAJGva4ALW-QDlXs");
		checkAuthentication();
		navigate("/");
	};

	const signup = (formData: SignupData, showError: Function) => {
		const {username, password, confirmPassword} = formData;
		if (username.length < 4 || username.length > 30) return showError(1);
		if (password.length < 4 || password.length > 128) return showError(2);
		if (password !== confirmPassword) return showError(3);

		console.log(formData);
		goToDrive();
	};

	const login = (formData: LoginData, showError: Function) => {
		const {username, password} = formData;
		if (username.length < 4 || username.length > 30) return showError(1);
		if (password.length < 4 || password.length > 128) return showError(2);

		console.log(formData);
		goToDrive();
	};


	return (
		<Page>
			<Header>
				<Logo src={logo}/>
				<Title>My Drive</Title>
			</Header>
			{window.innerWidth > 450 ?
				<Wrapper>
					<Form inputs={loginInputs} initialFormData={initialLoginData} submitForm={login}
						  background="#fdfdfd" color="#000" title="Login" buttonText="Login"/>
					<Form inputs={signupInputs} initialFormData={initialSignupData} submitForm={signup}
						  background="#4444fb" color="#fff" title="Signup" buttonText="Signup"/>
				</Wrapper>
				:
				<Wrapper>
					{isLoginShown ?
						<Form inputs={loginInputs} initialFormData={initialLoginData} background="#fdfdfd" color="#000" title="Login" buttonText="Login" submitForm={login}
							  subTitle={<>Don't have an Account yet?<LinkButton onClick={() => setIsLoginShown(false)}>Sign up</LinkButton></>}/>
						:
						<Form inputs={signupInputs} initialFormData={initialSignupData} submitForm={signup} background="#4444fb" color="#fff" title="Signup" buttonText="Signup"
							  subTitle={<>Already have an Account?<LinkButton onClick={() => setIsLoginShown(true)}>Log in</LinkButton></>}/>
					}
				</Wrapper>
			}
		</Page>
	);
};

export default LoginPage;