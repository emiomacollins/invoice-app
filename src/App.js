/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './css/App.scss';
import 'normalize-css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Nav from './components/reusables/Nav';
import InvoicePage from './pages/Invoice/InvoicePage';
import InvoiceForm from './components/Home/Form/InvoiceFormContainer';
import { useEffect } from 'react';
import { auth } from './firebase/firebaseUtil';
import { setUser } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((authUser) => {
			dispatch(setUser(authUser));
		});
		return unsuscribe;
	}, []);

	return (
		<>
			<Nav />
			<InvoiceForm />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/invoice/:id" component={InvoicePage} />
			</Switch>
		</>
	);
}

export default App;

// TODO
// After cleaning mock data check that date issue
