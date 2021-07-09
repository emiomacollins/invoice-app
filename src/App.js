import React from 'react';
import './css/App.scss';
import 'normalize-css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Nav from './components/reusables/Nav';
import InvoicePage from './pages/Invoice/InvoicePage';
import InvoiceForm from './components/Home/InvoiceForm';

function App() {
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
