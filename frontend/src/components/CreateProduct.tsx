import { useState, useEffect } from "react";

type Props = {
	onClose: () => void;
	onCreate: (product: {
		name: string;
		desc: string;
		price: number;
		users: string[]; 
	}) => Promise<void>; // fn async
};


export default function CreateProduct({ onClose, onCreate }: Props) {
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [price, setPrice] = useState<number>(0); // X
	const [allUsers, setAllUsers] = useState<{ _id: string; username: string }[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [selectedUserId, setSelectedUserId] = useState("");
	const [priceText, setPriceText] = useState("0.00");

	
	useEffect(() => {
		const token = localStorage.getItem("token");
		if(!token) return;

		fetch("http://localhost:3000/users", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((data) => {
			  if (Array.isArray(data)) {
			    setAllUsers(data);
			  } else {
			    console.error("Respuesta inesperada:", data);
			    setAllUsers([]); // Evita romper .map()
			  }
			})
			.catch((err) => {
				console.error("Error al obtener usuarios:", err);
				alert("No se pudieron cargar los usuarios");
			});
	}, []);

	const handleAddUser = (userId: string) => {
		if (!selectedUsers.includes(userId)) {
			setSelectedUsers((prev) => [...prev, userId]);
		}
	};

	return (
		<>
			{/* overlay */}
			<div className="fixed inset-0 bg-black bg-opacity-80 z-40" onClick={onClose} />

			{/* ventana */}
			<div className="fixed inset-0 flex justify-center items-center z-50">
				<div className="crtProd-modal">
					{/* encabezado */}
					<div className="crtProd-header">
						<h2 className="crtProd-title">Crear Nuevo Producto</h2>
						<p className="crtProd-subtitle">Completa información del producto</p>
					</div>

					{/* cuerpo */}
					<div className="crtProd-body">
						<div className="space-y-4">
							{/* nombre */}
							<div>
								<label className="block text-[#020817] text-[15px] font-normal leading-[14px] mb-3">
									Nombre del Producto
								</label>
								<input
									type="text"
									className="w-[450px] h-10 px-3 rounded-[10px] bg-[#F9F9FB] border border-[#BFDBFE] outline-none text-sm"
									placeholder="Ej: Laptop Gaming"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							{/* desc */}
							<div>
								<label className="block text-[#020817] text-[15px] font-normal leading-[14px] mb-3">
									Descripción
								</label>
								<textarea
									className="w-[450px] h-20 px-3 py-2 rounded-[10px] bg-[#F9F9FB] border border-[#BFDBFE] outline-none text-sm resize-none"
									placeholder="Describe las características del producto"
									value={desc}
									onChange={(e) => setDesc(e.target.value)}
								/>
							</div>

							{/* precio*/}
							<div>
								<label className="block text-[#020817] text-[15px] font-normal leading-[14px] mb-3">
							    	Precio ($)
							  	</label>
							  	
								<input
							    	type="text"
							    	inputMode="decimal"
							    	className="w-[450px] h-10 px-3 rounded-[10px] bg-[#F9F9FB] border border-[#BFDBFE] outline-none text-sm"
							    	placeholder="0.00"
							    	value={priceText}
							    	onChange={(e) => setPriceText(e.target.value.replace(",", "."))} // cambio coma por punto
							    	onFocus={(e) => {
							    		if (priceText === "0.00") setPriceText(""); // limpio si es 0.00
							    	}}
							    	onBlur={(e) => {
							    		if (priceText === "") setPriceText("0.00"); // vuelve a poner 0.00 si quedo vacío
							    	}}
							  	/>
							</div>

							{/* users asignados */}
							<div>
								<label className="block text-[#020817] text-[15px] font-normal leading-[14px] mb-3">
									Usuarios Asignados
								</label>
								<div className="flex items-center gap-2">
									<select
										className="w-[400px] h-10 px-3 rounded-[10px] bg-[#F9F9FB] border border-[#BFDBFE] outline-none text-sm"
									  	value={selectedUserId}
									  	onChange={(e) => setSelectedUserId(e.target.value)}
									>
										<option value="">Seleccionar usuario</option>
									  	{allUsers.map((user) => (
									    	<option key={user._id} value={user._id}>
									      		{user.username}
									    	</option>
									  	))}
									</select>
								
									<button
										className="w-[42px] h-[36px] rounded-[10px] bg-[#F9F9FB] border border-[#E2E8F0] text-xl text-gray-600 mb-2"
										onClick={() => {
											if (selectedUserId && !selectedUsers.includes(selectedUserId)) {
												setSelectedUsers((prev) => [...prev, selectedUserId]);
												setSelectedUserId(""); // reset select
											}
										}}
									>
									  +
									</button>

								</div>
								{/* usuarios seleccionados */}
								{selectedUsers.length > 0 ? (
									<div className="flex flex-wrap gap-2 mt-3">
										{selectedUsers.map((id) => {
											const user = allUsers.find((u) => u._id === id);
											if (!user) return null;
											return (
												<div
													key={id}
													className="flex items-center gap-2 px-3 py-[2px] rounded-full bg-[#FCE7F3] text-[#9D174D] text-[12px] font-semibold"
												>
													{user.username}
													<button
														onClick={() => setSelectedUsers((prev) => prev.filter((uid) => uid !== id)) }
														className="text-[#9D174D] text-xs font-bold focus:outline-none"
														aria-label={`Quitar ${user.username}`}
													>
														×
													</button>
												</div>
											);
										})}
									</div>
								) : (
									<p className="text-[14px] leading-4 text-[#64748B] mt-3">
										Selecciona al menos un usuario para el producto
									</p>
								)}
							</div>
						</div>

						{/* botones */}
						<div className="flex justify-end gap-2 mt-4">
							<button
								className="w-[125px] h-10 py-0 rounded-[10px] bg-[#F9F9FB] border border-[#E2E8F0] text-sm font-medium text-gray-700"
								onClick={onClose}
							>
								Cancelar
							</button>

							<button
								className="w-[125px] h-10 py-0 rounded-[10px] bg-gradient-to-r from-[#3B82F6] to-[#EC4899] text-white text-sm font-medium"
								onClick={async () => {
									const parsedPrice = parseFloat(priceText);
								
									if (!name.trim() || !desc.trim() || isNaN(parsedPrice) || parsedPrice <= 0 || selectedUsers.length === 0 ) {
										alert("Completar todos los campos!");
										return;
									}
									try {
										await onCreate({ name, desc, price: parsedPrice, users: selectedUsers });
										onClose();
									} catch (err) {
										console.error("Error al crear producto:", err);
										alert("No se pudo crear el producto.");
									}
								}}
							>
								Crear Producto
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
