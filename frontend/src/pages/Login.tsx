import { useState } from "react"
import { useNavigate } from "react-router-dom"
import login from '../assets/login.svg';
import userIcon from '../assets/user-icon.png';
import lockIcon from '../assets/lock-icon.png';

export default function Login() {
	const [user, setUser] = useState("")
	const [pass, setPass] = useState("")
	const navigate = useNavigate(); // hook
	
	return (
		<div className="min-h-screen flex items-center justify-center"
		style={{
        	background: "linear-gradient(135deg, #EBF4FF, #FDF2F8, #DBEAFE)",
      	}}
		>

			<div className="login-box w-full max-w-md flex flex-col items-center gap-6">
				<img src={login} alt="Logo" className="w-16 h-16 rounded-full object-cover" />
				
				<h1 className="text-iniciarSesion">Iniciar Sesión</h1>
				<p className="login-subtext">Ingresa tus credenciales para acceder </p>

				<form onSubmit={handleLogin} className="w-full flex flex-col items-center gap-4">
  					<div className="flex flex-col gap-4">
    					{/* user */}
    					<label htmlFor="user" className="label-login">Usuario</label>
						<div className="input-group">
    						<img src={userIcon} className="icon-input" />
    					  	<input
    					    	className="input-text"
    					    	id="user"
    					    	type="text"
    					    	required
    					    	value={user}
    					    	onChange={(e) => setUser(e.target.value)}
    					    	placeholder="Ingresa tu usuario"
    					  	/>
    					</div>
						
						{/* pass */}
						<label htmlFor="user" className="label-login">Contraseña</label>
    					<div className="input-group">
    						<img src={lockIcon} className="icon-input" />
    					  	<input
    					    	className="input-text"
    					    	type="password"
    					    	placeholder="Ingresa tu contraseña"
    					    	id="pass"
    					    	value={pass}
    					    	onChange={(e) => setPass(e.target.value)}
    					    	required
    					  	/>
    					</div>
    					<button type="submit" className="btn-login"> Iniciar Sesión </button>
  					</div>
				</form>
			</div>
		</div>
	);

	async function handleLogin(e:React.FormEvent){
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				headers: {'Content-Type': 'application/json', },
				body: JSON.stringify({ username: user, password: pass }),
			});

			if(!res.ok) throw new Error('Credenciales incorrectas');

			const data = await res.json();
			console.log('Token jwt: ',data.access_token);
			localStorage.setItem('token', data.access_token);
			navigate("/main");
		} catch(err){
			console.error('Error al iniciar sesión:', err);
			alert('Login fallido');
		}
	}
}