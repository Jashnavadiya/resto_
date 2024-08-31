import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Basicinfo.css'
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
const BasicInfoEvents = () => {
    const nav = useNavigate()
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
    const [editingEvent,setEditingevent]=useState(false)



    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);

    const handleStartTimeChange = (time) => {
        const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
        setStartTime(time);
        setEvent(prevEvent => ({
            ...prevEvent,
            time: {
                ...prevEvent.time,
                start: formattedTime
            }
        }));
    };
    
    const handleEndTimeChange = (time) => {
        const formattedTime = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
        setEndTime(time);
        setEvent(prevEvent => ({
            ...prevEvent,
            time: {
                ...prevEvent.time,
                end: formattedTime
            }
        }));
    };


    const handleDateChange = (selectedDate) => {
        const formattedDate = selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        setDate(selectedDate);
        setEvent((prevEvent) => ({
            ...prevEvent,
            time: {
                ...prevEvent.time,
                date: formattedDate
            }
        }));
    };
    



    // Combine date with time for start and end
    // const startDateTime = new Date(date);
    // startDateTime.setHours(startTime.getHours(), startTime.getMinutes());

    // const endDateTime = new Date(date);
    // endDateTime.setHours(endTime.getHours(), endTime.getMinutes());

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newFiles = Array.from(e.dataTransfer.files);
        setEvent((prevEvent) => ({
            ...prevEvent,
            images: [...prevEvent.images, ...newFiles]
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);

        // Helper function to convert file to base64
        const fileToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };

        // Convert all new files to base64
        Promise.all(newFiles.map(fileToBase64)).then(base64Files => {
            setEvent((prevEvent) => ({
                ...prevEvent,
                images: [...prevEvent.images, ...base64Files]
            }));
        });
    };

    const removeFile = (index) => {
        setEvent((prevEvent) => ({
            ...prevEvent,
            images: prevEvent.images.filter((_, i) => i !== index)
        }));
    };

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    }


    const handleSubmit = async(e) => {
        if(editingEvent){
            let response=await axios.put(`http://localhost:5000/api/v1/event/update/${event._id}`,event)
        localStorage.setItem('event',JSON.stringify({...event,...response.data.data}))
        console.log(response.data.data);
        }else{
            console.log(event);
            
            let response=await axios.post(`http://localhost:5000/api/v1/event/add`,event)
        localStorage.setItem('event',JSON.stringify({...event,...response.data.data}))
        console.log(response.data.data);
        }
        nav("../ticket")
    }

    useEffect(() => {
        localStorage.setItem('event',JSON.stringify(event))
        console.log(event);
      console.log(localStorage.getItem('event'));
      
    }, [event])
    useEffect(()=>{
        console.log(event._id!==undefined);
        console.log(event._id);
        
        if(event._id!==undefined){
            setEditingevent(true)
            
        }
    },[])
    return (
        <>
            <div className='flex-col h-full justify-center' style={{ backgroundColor: "#FAFAFB", display: 'flex' }}>
                <div className='w-11/12 m-auto h-fit mt-7 p-5' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", borderRadius: "7px", backgroundColor: "white" }}>
                    <h2>
                        <div className="flex align-middle justify-center">
                            <div className="basic-info" style={{ color: "#FE724C" }}>Basic-Info</div>
                            <div className="line orange"></div>
                            <div className="tickets">Tickets</div>
                            <div className="line"></div>
                            <div className="description">Description</div>
                            <div className="line"></div>
                            <div className="review">Review</div>
                        </div>
                    </h2>
                    <div className=''>

                        <div className='event_flyer'>
                            <h2>
                                Event Flyer
                            </h2>
                            <h2>
                                1080x1080 (3 MB size)
                            </h2>
                            <div
                                className="dropzone"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <img src="../../../upload.png" alt="Upload" />
                                <p>Drag and Drop Here</p>
                                <p className='text-gray-500 font-normal'>Or</p>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    id="fileInput"
                                />
                                <label htmlFor="fileInput" className="upload-btn">
                                    Browse Files
                                </label>
                                <div className="file-list">
                                    {event.images.map((file, index) => (
                                        <div key={index} className="file-item">
                                            {file.startsWith('data:image') ? (
                                                <img src={file} alt={`Preview ${index}`} className="preview-image" />
                                            ) : (
                                                file.name
                                            )}
                                            <button
                                                className="remove-file-btn"
                                                onClick={() => removeFile(index)}
                                                aria-label={`Remove ${file.name}`}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text">Event Name</span>
                            </div>
                            <input type="text" placeholder="Enter Event Name" value={event.name} onChange={handleInputchange} name='name' className="input input-bordered w-full max-w-lg" style={{ margin: 0 }} />
                        </label>
                        <label className="form-control w-full mt-3">
                            <div className="label">
                                <span className="label-text">Event City</span>
                            </div>

                            <input type="text" placeholder="Enter Event Place" value={event.city} onChange={handleInputchange} name='city' className="input input-bordered w-full max-w-lg" style={{ margin: 0 }} />
                        </label>

                        <div className='flex w-1/2 mt-3'>

                            <label className="form-control w-full">
                                <div style={{ marginBottom: '15px' }}>
                                    <div className="label">
                                        <span className="label-text">Event Date</span>
                                    </div>
                                    <DatePicker
                                        selected={date}
                                        onChange={(date) => {
                                            setDate(date);
                                            setEvent(prevEvent => ({
                                                ...prevEvent,
                                                time: {
                                                    ...prevEvent.time,
                                                    date
                                                }
                                            }));
                                        }}
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
                                        onChange={handleStartTimeChange}
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
                                        onChange={handleEndTimeChange}
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
                                    />
                                </div>
                            </label>
                        </div>
                        <label className="form-control w-full "></label>
                        <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Event price</span>
                            </div>
                            <input type="text" placeholder="Enter Event Name" name='price' value={event.price} onChange={handleInputchange} className="input input-bordered w-full max-w-lg" style={{ margin: 0 }} />
                        </label>

                    </div>
                </div>
                <button className='m-auto w-fit px-5 py-2 my-5' onClick={handleSubmit} style={{ backgroundColor: "#FE724C", color: "white" }}>Next</button>

            </div>
        </>
    )
}

export default BasicInfoEvents
