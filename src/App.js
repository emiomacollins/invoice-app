import React from 'react';
import './css/App.scss';
import 'normalize-css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Nav from './components/reusables/Nav';

function App() {
	return (
		<>
			<Nav />
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</>
	);
}

export default App;
