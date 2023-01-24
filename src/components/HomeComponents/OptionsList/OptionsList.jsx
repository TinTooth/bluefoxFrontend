import "./OptionsList.css"

const OptionsList = ({type,options}) => {
    return !type.includes("Size") ? (
        <div className="option-list">
            <h2 className="type">{type}</h2>
            {options.map((o,i) => {
                return o.type === type ? (<div key = {i} className="option">{o.description}</div>):null;
            })}
        </div>
      ):
            <div className="cake-size-container option-list">
                <div className="row">
                    <div className="size h">Cake Size</div>
                    <div className="servings h">Serves</div>
                </div>
                    {options.map((o,i)=>{
                        return o.type === "Cake Size" ? ( 
                            <div className = 'row' key = {i}>
                                <div className="size">{o.description}</div>
                                <div className="servings">{o.serves}</div>
                            </div>
                        ):null
                    })}
            </div>
      

}
 
export default OptionsList;