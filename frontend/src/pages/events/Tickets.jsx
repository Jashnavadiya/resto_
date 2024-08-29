import React, { useState } from 'react'
import './tickets.css'
import {Link} from 'react-router-dom'
import Popup from '../../components/Popup';

const Tickets = () => {
  const [ticketpopup, setTicketPopup] = useState(false);
  const [ticket,setTicket]=useState({
    name:"",
    type:"",
    available:"",
    description:''
  })
  
  const [savedTicket,setsavedTicket]=useState(false)

  const handleInputchange=(e)=>{
    const {name,value}=e.target;
    setTicket({...ticket,[name]:value})
    
  }

  const handleSaveTicketInfo=()=>{
    // save ticket info to your database
    console.log(ticket);
    setsavedTicket(true)
    setTicketPopup(false);
  }

  return (
    <>
      <div className='flex-col h-full justify-center' style={{ backgroundColor: "#FAFAFB", display: 'flex' }}>
        <div className='w-11/12 m-auto h-fit p-5 mt-5' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", borderRadius: "7px", backgroundColor: "white" }}>
          <h2>
            <div className="flex align-middle justify-center">
              <div className="basic-info" ><Link to="../basicinfo" style={{ color: "#FE724C" }}>Basic-Info</Link></div>
              <div className="line orange"></div>
              <div className="tickets" style={{ color: "#FE724C" }}>Tickets</div>
              <div className="line orange"></div>
              <div className="description">Description</div>
              <div className="line"></div>
              <div className="review">Review</div>
            </div>
          </h2>
          <div className='flex justify-center align-middle' style={{ height: "78vh" }}>
            <div className={`w-1/3 text-center ${savedTicket?"bg-green-100":""} flex-col h-fit m-auto py-10 justify-center align-middle`} style={{ border: `1px solid ${savedTicket?"green":"orange"}`, borderRadius: "15px" }}>
              <img src={savedTicket?"../../../green_ticket.png":"../../../red_ticket.png"} className='m-auto mb-5' alt="" />
              <button className='addticketbtn outline-none ' style={{ border: `1px solid ${savedTicket?"green":"orange"}`}} onClick={() => setTicketPopup(true)}>+ Add tickets for your events</button>
            </div>

          </div>
        </div>
        <button className='m-auto w-fit px-5 py-2' style={{ backgroundColor: "#FE724C", color: "white" }}>Next</button>
        {ticketpopup &&
          <Popup title=""
            onClose={() => setTicketPopup(false)}>
            <h1 className='flex justify-end text-xl'> <i class="fa-solid fa-xmark cursor-pointer" onClick={() => setTicketPopup(false)}></i></h1>
            <div>
              <label className="form-control w-full mt-3">
                <div className="label">
                  <span className="label-text">Ticket Name</span>
                </div>
                <input type="text" placeholder="Enter Event Name" value={ticket.name} onChange={handleInputchange} name='name' className="input input-bordered w-full max-w-lg" style={{ margin: 0 }} />
              </label>
              <label className="form-control w-full mt-3">
                <div className="label">
                  <span className="label-text">Ticket Type</span>
                </div>
                <input type="text" placeholder="Enter Event Name" value={ticket.type} onChange={handleInputchange} name='type' className="input input-bordered w-full max-w-lg" style={{ margin: 0 }} />
              </label>
              <label className="form-control w-full mt-3">
                <div className="label">
                  <span className="label-text">Ticket Available</span>
                </div>
                <input type="text" placeholder="Enter Event Name" value={ticket.available} onChange={handleInputchange} name='available' className="input input-bordered w-full max-w-lg" style={{ margin: 0 }} />
              </label>
              <label className="form-control w-full mt-3">
                <div className="label">
                  <span className="label-text">Ticket Description</span>
                </div>
                <input type="text" placeholder="Enter Event Name" value={ticket.description} onChange={handleInputchange} name='description' className="input input-bordered w-full max-w-lg" style={{ margin: 0 }} />
              </label>
             <div className='flex pt-3'> 
             <button className='m-auto w-fit px-5 py-2' onClick={handleSaveTicketInfo} style={{ backgroundColor: "#FE724C", color: "white" }}>Save</button>
             </div>
            </div>
          </Popup>

        }
      </div>
    </>
  )
}

export default Tickets