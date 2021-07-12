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
import { auth, firestore } from './firebase/firebaseUtil';
import { setUser } from './redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { withUser } from './Helpers/withUser';
import { fetchInvoices, getFilteredInvoices } from './redux/invoicesSlice';
import { useState } from 'react';

function App() {
	const dispatch = useDispatch();

	// to avoid showing stuff before the cached user is initialized by firebase
	const [authInitialized, setAuthInitialized] = useState(false);

	// const invoices = useSelector(getFilteredInvoices);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((authUser) => {
			dispatch(setUser(authUser));
			setAuthInitialized(true);
			if (!authUser) return;

			// const invoicesRef = firestore.collection(`users/${authUser.uid}/invoices`);
			// const batch = firestore.batch();

			// invoices.forEach((invoice, i) => {
			// 	const newDocumentRef = invoicesRef.doc();
			// 	batch.set(newDocumentRef, {
			// 		...invoice,
			// 		createdAt: new Date(invoice.createdAt).toISOString(),
			// 		paymentDue: new Date(invoice.paymentDue).toISOString(),
			// 		id: newDocumentRef.id,
			// 	});
			// });
			// batch.commit();
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

// TODO
// After cleaning mock data check that date issue
