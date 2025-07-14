import { useState } from "react"
import searchIcon from '../assets/toolbar-lupa.svg'
import newProdIcon from '../assets/toolbar-newProd.svg'

type ToolbarProps = { // tipo para las props
  onCreate: () => void;
  onSearch: (text: string) => void;
};

export default function Toolbar({ onCreate, onSearch }: ToolbarProps) {
	const [inputValue, setInputValue] = useState("")

	// control de input para lupa
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    	setInputValue(e.target.value)
    	onSearch(e.target.value)
  	}

	return (
    	<section className="toolbar-container">
      	
		{/* <input className="input-search" onChange={handleChange} value={inputValue} type="text" placeholder="Buscar productos por nombre o descripción" /> */}
      	<div className="search-container">
  			<img src={searchIcon} className="search-icon" />
  			<input
    			placeholder="Buscar productos por nombre o descripción"
    			className="search-input"
    			type="text"
    			onChange={handleChange}
    			value={inputValue}
  			/>
		</div>
		<button className="btn-newProd" onClick={onCreate}>
			<img src={newProdIcon} alt="crear" className="w-4 h-4"/>
			Crear Producto
		</button>
    	</section>
  	)
}