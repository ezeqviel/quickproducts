import type { Product } from "./ProductList";
import moneySym from '../assets/dtls-money.svg'
import usersIcon from '../assets/dtls-users.svg'
import calIcon from '../assets/dtls-clndr.png'

type Props = {
	product: Product;
	onClose: () => void;
};

export default function ProductDetails({ product, onClose }: Props) {
	return (
		<>
			{/* overlay */}
			<div className="fixed inset-0 bg-black bg-opacity-80 z-40" onClick={onClose} />

			{/* modal container */}
			<div className="fixed inset-0 flex justify-center items-center z-50">
				<div className="prodDet-modal flex flex-col justify-between gap-y-5 py-6 px-6 relative">

					{/* cerrar */}
					<button
						className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
						onClick={onClose}
					>
						×
					</button>

					{/* nombre */}
					<div className="space-y-1">
						<h2 className="prodDet-title">
							{product.name}
						</h2>
						<p className="text-sm text-[#64748B]">Detalles completos del producto</p>
					</div>

					{/* precio */}
					<div className="space-y-1">
						<p className="text-sm text-[#64748B] font-medium flex items-center gap-2">
							<img src={moneySym} alt="$" className="w-4 h-4" /> Precio
						</p>
						<p className="text-2xl font-bold text-blue-600">${product.price}</p>
					</div>

					{/* descripción */}
					<div className="space-y-1">
						<p className="text-sm text-[#64748B] font-semibold">Descripción</p>
						<div className="bg-[#F1F5F9cc] rounded-xl px-3 py-2">
							<p className="text-sm text-[#020817]">{product.desc}</p>
						</div>
					</div>

					{/* usuarios */}
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<img src={usersIcon} alt="Usuarios" className="w-4 h-4" />
							<span className="font-semibold text-sm text-[#64748B]">
								Usuarios asignados ({product.users.length})
							</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{product.users.map((u) => (
								<div key={u._id} className="px-3 py-1 rounded-full bg-[#FCE7F3]">
									<span className="text-xs font-semibold text-[#9D174D]">{u.username}</span>
								</div>
							))}
						</div>
					</div>

					{/* fecha */}
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<img src={calIcon} alt="Calendario" className="w-4 h-4" />
							<span className="font-semibold text-sm text-[#64748B]">Fecha de creación</span>
						</div>
						<p className="text-sm text-[#020817] bg-[#F1F5F9cc] px-3 py-1 rounded">
							{product.createdAt
								? new Date(product.createdAt).toLocaleString("es-AR", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})
								: "Sin fecha"}
						</p>
					</div>

				</div>
			</div>
		</>
	);
}
