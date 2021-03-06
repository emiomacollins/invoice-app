/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './css/App.scss';
import 'normalize-css';

import Home from './pages/Home/Home';
import Nav from './components/reusables/Nav';
import InvoicePage from './pages/Invoice/InvoicePage';
import InvoiceForm from './components/Home/Form/InvoiceFormContainer';

import { auth } from './firebase/firebaseUtil';

import { resetInvoices } from './redux/invoicesSlice';
import { setUser } from './redux/userSlice';
import { chechInternetConnection } from './redux/uiSlice';
import Message from './components/reusables/Message';
import { Fragment } from 'react';

function App() {
	const dispatch = useDispatch();
	// to avoid showing stuff before the cached user is initialized by firebase
	const [authInitialized, setAuthInitialized] = useState(false);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((authUser) => {
			dispatch(setUser(authUser));
			setAuthInitialized(true);
			if (!authUser) dispatch(resetInvoices());
		});

		dispatch(chechInternetConnection());
		return unsuscribe;
	}, []);

	return (
		<Fragment>
			<Message />
			<Nav />
			{authInitialized ? (
				<Fragment>
					<InvoiceForm />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/invoice/:id" component={InvoicePage} />
					</Switch>
				</Fragment>
			) : null}
		</Fragment>
	);
}

export default App;
