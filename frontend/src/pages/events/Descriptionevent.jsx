import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const Descriptionevent = () => {
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
    const [info,setInfo]=useState({
        desc:'',
        terms:''
    })
    
    const nav = useNavigate();


    const handleInputArea = (e) => {
        const { name, value } = e.target;
        // setEvent((prevEvent) => {
        //     const updatedEvent = { ...prevEvent };
        //     if (name === 'desc') {
        //         updatedEvent.info.desc = value;
        //     } else if (name === 'terms') {
        //         updatedEvent.info.terms = value;
        //     }
        //     // Save updated event to localStorage
        //     localStorage.setItem('event', JSON.stringify(updatedEvent));
        //     return updatedEvent;
        // });
        setInfo({...info,[name]:value})
    };

    const handleSubmit = async(e) => {
        const { name } = e.target;
        if (name === 'next') {
            nav('../review');
        } else if (name === 'prev') {
            nav('../ticket');
        }
        let response=await axios.put(`http://localhost:5000/api/v1/event/update/${event._id}`,event)
        localStorage.setItem('event',JSON.stringify({...event,...response.data.data}))
        console.log(response.data.data);
    };
    
    useEffect(()=>{
        setEvent({...event,info})
    },[info])
    useEffect(()=>{
        console.log(event);
        localStorage.setItem('event',JSON.stringify(event))
        
    },[event])
    useEffect(()=>{
        setInfo(event.info)
    },[])
    return (
        <>
            <div className='flex-col h-full justify-center' style={{ backgroundColor: "#FAFAFB", display: 'flex' }}>
                <div className='w-11/12 m-auto h-fit p-5 mt-5' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", borderRadius: "7px", backgroundColor: "white" }}>
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
                            <div className="description" style={{ color: "#FE724C" }}>Description</div>
                            <div className="line orange"></div>
                            <div className="review">Review</div>
                        </div>
                    </h2>
                    <div className='flex-col justify-center align-middle' style={{ height: "78vh" }}>
                        <div className='w-full h-1/2'>
                            <label className="form-control w-full h-full">
                                <div className="label">
                                    <span className="label-text text-lg">Event Description</span>
                                    <span className="label-text-alt text-lg">
                                        <i className="fa-regular fa-pen-to-square cursor-pointer" onClick={() => setTicketPopup(true)}></i>
                                    </span>
                                </div>
                                <textarea
                                    className="textarea w-full h-full"
                                    name='desc'
                                    value={event.info.desc}
                                    onChange={handleInputArea}
                                    placeholder="Bio"
                                ></textarea>
                            </label>
                        </div>
                        <div className='w-full h-1/2'>
                            <label className="form-control w-full h-full">
                                <div className="label">
                                    <span className="label-text text-lg">Terms And Conditions</span>
                                    <span className="label-text-alt text-lg">
                                        <i className="fa-regular fa-pen-to-square cursor-pointer" onClick={() => setTicketPopup(true)}></i>
                                    </span>
                                </div>
                                <textarea
                                    className="textarea w-full h-full"
                                    name='terms'
                                    value={event.info.terms}
                                    onChange={handleInputArea}
                                    placeholder="Bio"
                                ></textarea>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='text-center my-6'>
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
                        name='next'
                        onClick={handleSubmit}
                        style={{ backgroundColor: "#FE724C", color: "white" }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Descriptionevent;
