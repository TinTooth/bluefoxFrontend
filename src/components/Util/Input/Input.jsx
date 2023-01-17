import "./input.css"

const Input = ({type = "text",name,value,onChange,title, textArea = false, 
                                select = false, options, number = false}) => {
        
   

    return textArea ? ( 
        <>
    <label>
        {title}
    </label>
         <textarea 
         type={type}
         name = {name}
         value = {value}
         onChange = {onChange} 

         />
         </>

    ): number ? (
        <>
        <label>
            {title}
        </label>
        <input
        type= "number"
        name = {name}
        value = {value}
        onChange = {onChange} 
        min = "1"
        max = "24"
        />
        </>
        
        
    
    ): select ? (
            <>
         <label>
            {title}
        </label>
            <select name = {name} onChange = {onChange}>
                <option value = 'noneSelected'> Select Option</option>
                {options.map((o,i) => {
                    return (
                        <option key = {i} value = {o.description}>{o.description}</option>
                        )
                    })}
            </select>
                    </>
     ):
        <>
     <label>
        {title}
    </label>
        <input 
        type={type}
        name = {name}
        value = {value}
        onChange = {onChange} 
        />
        </>
}
 
export default Input;