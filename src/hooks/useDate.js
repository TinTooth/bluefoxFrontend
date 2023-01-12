const useDate = () => {
  
    const getDay = (input) =>{
        let day = "";
        switch (new Date(`${input}T00:00:00`).getDay()) {
            case 0:
               day = "Sunday";
              break;
            case 1:
               day = "Monday";
              break;
            case 2:
               day = "Tuesday";
              break;
            case 3:
              day = "Wednesday";
              break;
            case 4:
              day = "Thursday";
              break;
            case 5:
              day = "Friday";
              break;
            case 6:
              day = "Saturday";
          };
          return day
    }

    const getMonth = (input) => {
        let day = ''
        switch (new Date(`${input}T00:00:00`).getMonth()) {
            case 0:
               day = "January";
              break;
            case 1:
               day = "February";
              break;
            case 2:
               day = "March";
              break;
            case 3:
              day = "April";
              break;
            case 4:
              day = "May";
              break;
            case 5:
              day = "June";
              break;
            case 6:
              day = "July";
            case 7:
              day = "August";
            case 8:
              day = "September";
            case 9:
              day = "October";
            case 10:
              day = "November";
            case 11:
              day = "December";
          };
          return day
    }
    
    const getDateString = (input) => {
        let day = getDay(input);
        let month = getMonth(input)
        let result = `${day}, ${month} ${new Date(`${input}T00:00:00`).getDate()}`;
        return result

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

  const getWeekWorkTime = (input,items) => {
    let date = new Date(`${input}T00:00:00`)
    let daysAhead = 6-date.getDay()
    let daysBehind = 6-daysAhead
    let acceptedOrders = items.filter(item => item.order.status === "Accepted")
    let itemsInRange = []
    for (let i = 0; i <=daysAhead; i++) {
        let date = new Date(`${input}T00:00:00`)
        date.setDate(date.getDate() + i)
        let itemsinDay = acceptedOrders.filter(item => item.order.deliver_date == date.toJSON().slice(0,10))
        itemsInRange = [...itemsInRange,...itemsinDay]
    }
    for (let i = 1; i <= daysBehind; i++) {
      let date = new Date(`${input}T00:00:00`)
      date.setDate(date.getDate() - i)
      let itemsinDay = acceptedOrders.filter(item => item.order.deliver_date == date.toJSON().slice(0,10))
      itemsInRange = [...itemsInRange,...itemsinDay]
    }
    return getWorkTime(itemsInRange);
  }

  const getLikelihood = (totalHours) => {
    let result = '';
    if (totalHours < 15) {
      result = 'Lisa Will Likey Be Able to Fullfill this Order! ';
    }
    else if (totalHours > 15 && totalHours < 25) {
      result = 'Pretty Busy Week for Lisa! She may not be able to accept this Order. ';
    }
    else if (totalHours > 25) {
      result = 'That is an Extremely busy week for Lisa. It is Highly Unlikely She will be able to accept your order. ';
    }
  

    return result
  }



    
  return [getDateString,getWeekWorkTime,getLikelihood,getWorkTime, getMonth, getDay]
}
 
export default useDate;