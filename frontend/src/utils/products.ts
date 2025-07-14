export async function getProducts(): Promise<any[]>{
	const token = localStorage.getItem("token")

	const res = await fetch("http://localhost:3000/products", {
		headers: {Authorization: `Bearer ${token}`,},
	});

	if (!res.ok) throw new Error("Error al intentar obtener los productos")
	return res.json()
}
