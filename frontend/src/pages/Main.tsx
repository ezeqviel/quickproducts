import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

import Header from "../components/Header"
import Toolbar from "../components/Toolbar"
import ProductList from "../components/ProductList"
import CreateProduct from "../components/CreateProduct"
import ProductDetails from "../components/ProductDetails"

import type { Product } from "../components/ProductList"

export default function Main() {
	const navigate = useNavigate()
	const [user, setUser] = useState<string>("")
	const [showModal, setShowModal] = useState(false)
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) {
			navigate("/login")
			return
		}

		try {
			const decoded: any = jwtDecode(token)
			if (Date.now() >= decoded.exp * 1000) {
				localStorage.removeItem("token")
				navigate("/login")
				return
			}
			setUser(decoded.username)
		} catch (err) {
			console.error("Token inválido:", err)
			localStorage.removeItem("token")
			navigate("/login")
			return
		}

		async function fetchProducts() {
			try {
				const res = await fetch("http://localhost:3000/products", {
					headers: { Authorization: `Bearer ${token}` },
				})

				if (!res.ok) throw new Error("Error al obtener productos")

				const data = await res.json()

				setProducts(
					data.map((p: any, index: number) => {
						console.log("Producto recibido del backend: ", p) // debug
						if (!p._id) {
							console.error("Producto sin _id:", p);
							throw new Error("Producto sin _id");
						}
						return {
							id: index + 1,
							name: p.name,
							desc: p.desc,
							price: p.price,
							_id: p._id,
							users: p.users ?? [], 			// details
      						createdAt: p.createdAt ?? "",	// details
						}
					})
				)
			} catch (err) {
				console.error(err)
				alert("Error al obtener productos")
			}
		}
		fetchProducts()
	}, [])

	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [searchText, setSearchText] = useState("")

	const handleCreateProduct = async (nuevoProducto: {
		name: string
		desc: string
		price: number
	}) => {
		try {
			const token = localStorage.getItem("token")
			if (!token) throw new Error("No se encontró token")

			const res = await fetch("http://localhost:3000/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(nuevoProducto),
			})

			if (!res.ok) throw new Error("Error al crear producto")

			const creado = await res.json()

			setProducts((prev) => {
				const nuevoProducto = {
					name: creado.name,
					desc: creado.desc,
					price: creado.price,
					users: creado.users,
					createdAt: creado.createdAt,
					_id: creado._id,
					id: prev.length + 1,
				}
				return [...prev, nuevoProducto]
			})
		} catch (err) {
			console.error("Error al crear producto:", err)
			alert("No se pudo crear el producto")
		}
	}

	const handleDeleteProduct = async (_id: string) => {
		try {
			const token = localStorage.getItem("token")
			if (!token) throw new Error("No se encontró token")

			console.log("elimino el prdct con _id: ", _id) // 🔍 debug

			const res = await fetch(`http://localhost:3000/products/${_id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			})

			if (!res.ok) throw new Error("Error al eliminar producto")

			setProducts((prev) => prev.filter((p) => p._id !== _id))
		} catch (err) {
			console.error("Error al eliminar producto:", err)
			alert("No se pudo eliminar el producto")
		}
	}

	const filteredProducts = products.filter(
		(p) =>
			p.name.toLowerCase().includes(searchText.toLowerCase()) ||
			p.desc.toLowerCase().includes(searchText.toLowerCase())
	)

	console.log("Productos actuales:", products) // 🔍 debug

	return (
		<div className="min-h-screen bg-gray-100 px-6 py-4 flex flex-col gap-6 relative">
			<Header
				user={user}
				onLogout={() => {
					localStorage.removeItem("token")
					navigate("/login")
				}}
			/>
			
			<Toolbar onCreate={() => setShowModal(true)} onSearch={(text) => setSearchText(text)} />

			<ProductList
				products={filteredProducts}
				onView={(p) => {
					const safeProduct = {
				    	...p,
				    	users: p.users ?? [],       	// para evitar errores de tipo
				    	createdAt: p.createdAt ?? "", 	// seguro por si falla
				  	};
					setSelectedProduct(safeProduct);
				}}
				onDelete={handleDeleteProduct}
			/>

			{showModal && (
				<CreateProduct
					onClose={() => setShowModal(false)}
					onCreate={handleCreateProduct}
				/>
			)}

			{selectedProduct && (
				<ProductDetails
					product={selectedProduct}
					onClose={() => setSelectedProduct(null)}
				/>
			)}
		</div>
	)
}
