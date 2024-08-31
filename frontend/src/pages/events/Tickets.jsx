import React, { useEffect, useState } from 'react'
import './tickets.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Popup from '../../components/Popup';
import toast from 'react-hot-toast';

const Tickets = () => {
  const nav = useNavigate()


  const [ticketpopup, setTicketPopup] = useState(false);
  const [ticket, setTicket] = useState({
    name: "",
    type: "",
    available: "",
    description: ''
  })
  const [event, setEvent] = useState(JSON.parse(localStorage.getItem('event')) || {
    name: "",
    city: "",
    images: [],
    time: {
      date: "",
      start: "",
      end: ""
    },
    price: '',
    tickets: {
      name: '',
      type: '',
      available: '',
      description: ''
    },
    info: {
      desc: '',
      terms: ''
    },
    status: false
  });



  const [savedTicket, setsavedTicket] = useState(false)

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value })

  }

  const handleSaveTicketInfo = () => {
    // save ticket info to your database
    console.log(ticket);
    setEvent({ ...event, tickets: ticket })
    console.log(event);

    setsavedTicket(true)
    setTicketPopup(false);
  }

  const handleSubmit = async (e) => {
    const { name } = e.target
    if (name == 'prev') {
      nav('../basicinfo')
    }
    if (event.tickets.name !== '' && event.tickets.available !== '' && event.tickets.description !== '' && event.tickets.type !== '') {
      if (name == 'next') {
        nav('../description')
  
      }
      let response = await axios.put(`http://localhost:5000/api/v1/event/update/${event._id}`, event)
      localStorage.setItem('event', JSON.stringify({ ...event, ...response.data.data }))
      console.log(response.data.data);
    }
    else{
      toast.error("Fill All The Field")
    }
  }
  useEffect(() => {
    localStorage.setItem('event', JSON.stringify(event))

    if (event.tickets.name !== '' && event.tickets.type !== '' && event.tickets.available !== '' && event.tickets.description !== '') {
      setTicket(event.tickets)
      setsavedTicket(true)
    }
  }, [event])

  useEffect(() => {
    console.log(event);

  }, [ticket])
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
            <div className={`w-1/3 text-center ${savedTicket ? "bg-green-100" : ""} flex-col h-fit m-auto py-10 justify-center align-middle`} style={{ border: `1px solid ${savedTicket ? "green" : "orange"}`, borderRadius: "15px" }}>
              <h1 className='flex w-11/12 justify-end bg-transparent text-lg m-auto'>{savedTicket ? <i class="fa-regular fa-pen-to-square cursor-pointer" onClick={() => setTicketPopup(true)}></i> : ""}</h1>
              <img src={savedTicket ? "../../../green_ticket.png" : "../../../red_ticket.png"} className='m-auto mb-5' alt="" />
              <button className='addticketbtn outline-none ' style={{ border: `1px solid ${savedTicket ? "green" : "orange"}` }} onClick={() => setTicketPopup(true)}>{savedTicket ? "Tickets Added !" : "+ Add tickets for your events"}</button>
            </div>

          </div>
        </div>
        <div className='text-center my-6'>
          <button className='m-auto w-fit mx-5 px-5 py-2' name='prev' onClick={handleSubmit} style={{ backgroundColor: "#FE724C", color: "white" }}>Previous</button>
          <button className='m-auto w-fit mx-5 px-5 py-2' name='next' onClick={handleSubmit} style={{ backgroundColor: "#FE724C", color: "white" }}>Next</button>
        </div>

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