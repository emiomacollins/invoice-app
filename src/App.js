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
import { withUser } from './Helpers/withUser';

import { resetInvoices } from './redux/invoicesSlice';
import { setUser } from './redux/userSlice';

function App() {
	const dispatch = useDispatch();
	// to avoid showing stuff before the cached user is initialized by firebase
	const [authInitialized, setAuthInitialized] = useState(false);

	// const invoices = useSelector(getFilteredInvoices);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((authUser) => {
			dispatch(setUser(authUser));
			setAuthInitialized(true);
			if (!authUser) dispatch(resetInvoices());

			// if (authUser) uploadInvoices(authUser,invoices);
		});
		return unsuscribe;
	}, []);

	return authInitialized ? (
		<>
			<Nav />
			<InvoiceForm />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/invoice/:id" component={withUser(InvoicePage)} />
			</Switch>
		</>
	) : null;
}

export default App;
