
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import "./WorkCalendar.css";


const WorkCalendar = ({orders,setcurrentOrder,setSelectedDate}) => {
   
  
  const eventClick = (e) => {
    let currentOrder = orders.filter(o => o.id == e.event.id);
    setcurrentOrder(currentOrder[0])
  }

  const getEvents = () => {     
      let eventsarray = []
      orders.forEach(order => {
      if (order.status === "Accepted") {
        let newEvent = { 
          id: order.id, 
          title:`# ${order.id} ${order.user.last_name}`,
          start: order.deliver_date
        }
        eventsarray.push(newEvent);
      }});
      
      return eventsarray
  }    
  
    return (
      <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height = "100%"
        headerToolbar={{
          center: 'dayGridMonth,dayGridWeek',
        }}
         events = {getEvents()}
         dateClick={(e) => setSelectedDate(e.dateStr)}
         eventClick ={eventClick}
         eventColor = '#2b3547'
    
      />
      
    </div>
     );
}
 
export default WorkCalendar;