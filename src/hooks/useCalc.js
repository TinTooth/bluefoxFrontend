const useCalc = () => {
    const getPrice = (item) =>{
        if (item.product.pricebydozen) {
            let price = (item.quantity/12)*item.product.price;
            return price;
        }
        else {
            let price = item.quantity*item.product.price
            return price;
        }
    }

    const getWorkTime = (items) => {
        let result = 0;
        
        items.forEach(item => {
            if( item.product.pricebydozen){
                result += (item.quantity/12)*item.product.work_time;
            }
            else {
                result += item.quantity*item.product.work_time;
            }
        });
        return result 
    }


    
    return [getPrice,getWorkTime];
}
 
export default useCalc;