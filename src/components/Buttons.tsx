
const Buttons = (
	{ name, onClick } : 
	{ name: string, onClick: () => void }
	) => {
	  return (
	<div className="buttons">
	  <button type="button" className="button" onClick={onClick} >{name}</button>
	</div>
  );
}

export default Buttons;