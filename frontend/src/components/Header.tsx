import headerIcon from '../assets/header-icon.svg'
import headerLogout from '../assets/header-logout.svg'

type HeaderProps = {
	user: string;
	onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
	return (
		<header className="header-main">
			{/* título header */}
			<div className="flex items-start gap-4">
				<img src={headerIcon} alt="Logo" className="w-10 h-10 rounded-[12px] object-cover" />

				<div className="h-10 flex flex-col justify-center">
					<h1 className="title-gestion">Gestión de productos</h1>
					<p className="subtitle-bienvenido">
  						Bienvenido, <span className="user-highlight">{user}</span>
					</p>
				</div>
			</div>

			<button className="btn-logout" onClick={onLogout}> 
				<img src={headerLogout} alt="logout" className="w-4 h-4" />
				Cerrar Sesión 
			</button>
		</header>
	);
}