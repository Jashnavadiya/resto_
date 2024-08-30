import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
const Revviewevent = () => {
    const [event, setEvent] = useState(JSON.parse(localStorage.getItem('event'))||{
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
            name: "",
            type: "",
            available: "",
            description: ''
        },
        info: {
            desc: '',
            terms: ''
        },
        status:false
    });
    const nav = useNavigate();



    const handleSubmit = async(e) => {
        const { name } = e.target;


        if (name === 'live') {
          
            setEvent({...event,status:true})
            console.log(event);
            
            

            
        } else if (name === 'prev') {
            let response=await axios.put(`http://localhost:5000/api/v1/event/update/${event._id}`,event)
            localStorage.setItem('event',JSON.stringify({...event,...response.data.data}))
            console.log(response.data.data);
            nav('../description');
        }
    };
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);

    const [events,setevents]=useState(JSON.parse(localStorage.getItem('events'))||[])

    useEffect(()=>{
        setevents([...events,event]);
        const hi=async()=>{
            if(event.status){
                let response=await axios.put(`http://localhost:5000/api/v1/event/update/${event._id}`,event)
                localStorage.setItem('event',JSON.stringify({...event,...response.data.data}))
                console.log(response.data.data);
                localStorage.setItem('events',JSON.stringify(events))
                localStorage.setItem('event',JSON.stringify(''))
                nav('../')
            }
        }
        hi()
    },[event])
   
    return (
        <>
            <div className='flex-col h-full justify-center' style={{ backgroundColor: "#FAFAFB", display: 'flex' }}>
                <div className='w-11/12 m-auto h-max p-5 mt-5' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", borderRadius: "7px", backgroundColor: "white" }}>
                    <h2>
                        <div className="flex align-middle justify-center">
                            <div className="basic-info">
                                <Link to="../basicinfo" style={{ color: "#FE724C" }}>Basic-Info</Link>
                            </div>
                            <div className="line orange"></div>
                            <div className="tickets">
                                <Link to="../ticket" style={{ color: "#FE724C" }}>Tickets</Link>
                            </div>
                            <div className="line orange"></div>
                            <div className="description" >
                                <Link to="../description" style={{ color: "#FE724C" }}>description</Link>
                            </div>
                            <div className="line orange" ></div>
                            <div className="review" style={{ color: "#FE724C" }}>Review</div>
                        </div>
                    </h2>
                    <div className='flex-col justify-center align-middle' >
                        <h2 className='text-2xl font-bold text-center'> Confirm Event Details</h2>
                        <div className='flex'>
                            <div className='w-4/12 pe-5'>
                                <img src={event.images[0]} alt="" />
                            </div>
                            <div className='w-8/12'><label className="form-control w-full mt-3">
                                <div className="label">
                                    <span className="label-text">Event Name</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter Event Name"
                                    value={event.name}
                                    name='name'
                                    className="input input-bordered w-full max-w-lg"
                                    disabled
                                    style={{ margin: 0 }}
                                />
                            </label>
                                <label className="form-control w-full mt-3">
                                    <div className="label">
                                        <span className="label-text">Event City</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Event City"
                                        value={event.city}
                                        name='city'
                                        className="input input-bordered w-full max-w-lg"
                                        disabled
                                        style={{ margin: 0 }}
                                    />
                                </label>

                                <div className='flex w-full mt-3'>
                                    <label className="form-control w-full">
                                        <div style={{ marginBottom: '15px' }}>
                                            <div className="label">
                                                <span className="label-text">Event Date</span>
                                            </div>
                                            <DatePicker
                                                selected={date}
                                                onChange={date => setDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                customInput={
                                                    <button
                                                        type="button"
                                                        style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px 30px ', borderRadius: '4px', cursor: 'pointer' }}
                                                    >
                                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} />
                                                        {date ? date.toLocaleDateString('en-GB') : 'Select Date'}
                                                    </button>
                                                }
                                                disabled
                                            />
                                        </div>
                                    </label>
                                    <label className="form-control w-full">
                                        <div style={{ marginBottom: '15px' }}>
                                            <div className="label">
                                                <span className="label-text">Event Start Time</span>
                                            </div>
                                            <DatePicker
                                                selected={startTime}
                                                onChange={date => setStartTime(date)}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                dateFormat="HH:mm"
                                                minTime={date && new Date() > date ? new Date() : new Date().setHours(0, 0)}
                                                maxTime={new Date().setHours(23, 59)}
                                                open={openStart}
                                                onClickOutside={() => setOpenStart(false)}
                                                onCalendarClose={() => setOpenStart(false)}
                                                onCalendarOpen={() => setOpenStart(true)}
                                                customInput={
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenStart(!openStart)}
                                                        style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px 30px ', borderRadius: '4px', cursor: 'pointer' }}
                                                    >
                                                        {startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Start Time'}
                                                    </button>
                                                }
                                                disabled
                                            />
                                        </div>
                                    </label>
                                    <label className="form-control w-full">
                                        <div>
                                            <div className="label">
                                                <span className="label-text">Event Ending Time</span>
                                            </div>
                                            <DatePicker
                                                selected={endTime}
                                                onChange={date => setEndTime(date)}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                dateFormat="HH:mm"
                                                minTime={startTime ? startTime : new Date().setHours(0, 0)}
                                                maxTime={new Date().setHours(23, 59)}
                                                open={openEnd}
                                                onClickOutside={() => setOpenEnd(false)}
                                                onCalendarClose={() => setOpenEnd(false)}
                                                onCalendarOpen={() => setOpenEnd(true)}
                                                customInput={
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenEnd(!openEnd)}
                                                        style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px 30px ', borderRadius: '4px', cursor: 'pointer' }}
                                                    >
                                                        {endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select End Time'}
                                                    </button>
                                                }
                                                disabled
                                            />
                                        </div>
                                    </label>
                                </div>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Event Price</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Event Price"
                                        name='price'
                                        value={event.price}
                                        disabled
                                        className="input input-bordered w-full max-w-lg"
                                        style={{ margin: 0 }}
                                    />
                                </label>

                                <label className="form-control w-full mt-3">
                                    <div className="label">
                                        <span className="label-text">Ticket Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Ticket Name"
                                        value={event.tickets.name}
                                        name='name'
                                        disabled
                                        className="input input-bordered w-full max-w-lg"
                                        style={{ margin: 0 }}
                                    />
                                </label>
                                <label className="form-control w-full mt-3">
                                    <div className="label">
                                        <span className="label-text">Ticket Type</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Ticket Type"
                                        value={event.tickets.type}
                                        name='type'
                                        disabled
                                        className="input input-bordered w-full max-w-lg"
                                        style={{ margin: 0 }}
                                    />
                                </label>
                                <label className="form-control w-full mt-3">
                                    <div className="label">
                                        <span className="label-text">Ticket Available</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Ticket Available"
                                        value={event.tickets.available}
                                        name='available'
                                        disabled
                                        className="input input-bordered w-full max-w-lg"
                                        style={{ margin: 0 }}
                                    />
                                </label>
                                <label className="form-control w-full mt-3">
                                    <div className="label">
                                        <span className="label-text">Ticket Description</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Ticket Description"
                                        value={event.tickets.description}
                                        name='description'
                                        disabled
                                        className="input input-bordered w-full max-w-lg"
                                        style={{ margin: 0 }}
                                    />
                                </label>

                                <div className='h-screen'>
                                <div className='w-full h-1/2'>
                                    <label className="form-control w-full h-full">
                                        <div className="label">
                                            <span className="label-text text-lg">Event Description</span>
                                        </div>
                                        <textarea
                                            className="textarea w-full h-full"
                                            name='desc'
                                            value={event.info.desc}
                                            placeholder="Event Description"
                                            disabled
                                        ></textarea>
                                    </label>
                                </div>

                                <div className='w-full h-1/2'>
                                    <label className="form-control w-full h-full">
                                        <div className="label">
                                            <span className="label-text text-lg">Terms And Conditions</span>
                                        </div>
                                        <textarea
                                            className="textarea w-full h-full"
                                            name='terms'
                                            value={event.info.terms}
                                            placeholder="Terms and Conditions"
                                            disabled
                                        ></textarea>
                                    </label>
                                </div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className='text-center my-6 '>
                    <button
                        className='m-auto w-fit mx-5 px-5 py-2'
                        name='prev'
                        onClick={handleSubmit}
                        style={{ backgroundColor: "#FE724C", color: "white" }}
                    >
                        Previous
                    </button>
                    <button
                        className='m-auto w-fit mx-5 px-5 py-2'
                        name='live'
                        onClick={handleSubmit}
                        style={{ backgroundColor: "#FE724C", color: "white" }}
                    >
                        Make It Live
                    </button>
                </div>
            </div>
        </>
    )
}

export default Revviewevent
