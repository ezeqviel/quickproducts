import prodListIcon from '../assets/pl-prod.svg'
import showDetailsIcon from '../assets/pl-show.svg'
import deleteProdIcon from '../assets/pl-trash.svg'

export type Product = {
	id: number;
  	name: string;
  	desc: string;
  	price: number;
  	users: { _id: string; username: string }[];
  	createdAt: string; 
  	_id: string; // mongodb
};

type ProductListProps = {
  products: Product[];
  onView: (product: Product) => void;
  onDelete: (id: string) => void; 
};

const formatearPrecio = (precio: number) =>
	new Intl.NumberFormat('es-AR', {
    	style: 'currency',
    	currency: 'ARS',
    	minimumFractionDigits: 2,
  	}).format(precio)


export default function ProductList({ products, onView, onDelete }: ProductListProps) {
  return (
    <section className="productlist-container">
    	<h2 className="productlist-title">
  			<img src={prodListIcon} alt="Productos" className="w-5 h-5" />
  			Productos ({products.length})
		</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="pl-table-header-row">
              <th className="pl-table-header-cell text-left">Nombre</th>
              <th className="pl-table-header-cell text-left">Descripción</th>
              <th className="pl-table-header-cell text-left">Precio</th>
              <th className="pl-table-header-cell text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p)=>(
              <tr key={p._id} className="pl-row"> 
                <td className="px-4 py-2 pl-cell-name">{p.name}</td>
                <td className="px-4 py-2 pl-cell-desc">{p.desc}</td>
                <td className="px-4 py-2 pl-cell-precio">{formatearPrecio(p.price)}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex justify-end gap-2">
					<div className="flex justify-end gap-2">
						<button className="pl-btn-show" onClick={()=> onView(p)}>
					  		<img src={showDetailsIcon} alt="Ver" className="pl-icon-btn" />
						</button>
						<button className="pl-btn-delete" onClick={() => onDelete(p._id)}>
							<img src={deleteProdIcon} alt="Eliminar" className="pl-icon-btn" />
						</button>
					</div>
				  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
