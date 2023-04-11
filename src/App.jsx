import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLogin from './pages/Login/PageLogin';
import PageHome from './pages/Home/PageHome';
import PageSignUp from './pages/SignUp/PageSignUp';
import PageAccount from './pages/Account/PageAccount';
import AuthGuard from './guards/AuthGuard';
import RoleGuard from './guards/RoleGuard';
import PageProduct from './pages/Products/PageProduct';

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<PageHome/>} />
				<Route path="/login" element={<PageLogin />} />
				<Route path="/signup" element={<PageSignUp />} />
				<Route path='/products/:id' element={<PageProduct/>} />
				<Route path="/account" element={
					<AuthGuard>
						<RoleGuard requiredRoles={['ROLE_ADMIN', 'ROLE_USER']}>
							<PageAccount/>
						</RoleGuard>
					</AuthGuard>} />
			</Routes>
		</Router>
	);
}

export default App
