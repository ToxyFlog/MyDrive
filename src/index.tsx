import React from "react";
import App from "./App";
import GlobalStyles from "./styles";
import * as ReactDOMClient from "react-dom/client";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const loading: Element | null = document.getElementById("loading");
if (loading) loading.remove();


const client = new ApolloClient({
	uri: "http://localhost:3001/graphql",
	cache: new InMemoryCache(),
});

const root: Element | null = document.getElementById("root");
if (!root) throw new Error("Couldn't mount app - no element matched the selector!");
const app = ReactDOMClient.createRoot(root);

app.render(
	<ApolloProvider client={client}>
		<GlobalStyles/>
		<App/>
	</ApolloProvider>,
);