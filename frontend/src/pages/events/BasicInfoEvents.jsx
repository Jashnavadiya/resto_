import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Basicinfo.css'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
const BasicInfoEvents = () => {

    const [event, setEvent] = useState({
        name: "",
        city: "",
        time: {
            date: "",
            start: "",
            end: ""
        },
        price: ''
    })



    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);

    // Function to handle start time change
    const handleStartTimeChange = (time) => {
        setStartTime(time);
    };

    // Function to handle end time change
    const handleEndTimeChange = (time) => {
        setEndTime(time);
    };

    // Combine date with time for start and end
    const startDateTime = new Date(date);
    startDateTime.setHours(startTime.getHours(), startTime.getMinutes());

    const endDateTime = new Date(date);
    endDateTime.setHours(endTime.getHours(), endTime.getMinutes());


    const [files, setFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEvent({...event, [name]: value });
    }

    useEffect(()=>{
        console.log('hi');
        
    },[event])
    return (
        <>
            <div className='flex-col h-full justify-center' style={{ backgroundColor: "#FAFAFB", display: 'flex' }}>
                <div className='w-11/12 m-auto h-fit p-5' style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", borderRadius: "7px", backgroundColor: "white" }}>
                    <h2>
                        <div className="flex align-middle justify-center">
                            <div className="basic-info" style={{color:"#FE724C"}}>Basic-Info</div>
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
                                <img src="../../../public/upload.png" alt="Upload" />
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
                                    {files.map((file, index) => (
                                        <div key={index} className="file-item">
                                            {file.name}
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

                            <label className="form-control w-full ">
                                {/* Date Picker */}
                                <div style={{ marginBottom: '15px' }}>
                                    <div className="label">
                                        <span className="label-text">Event Date</span>
                                    </div>
                                    <DatePicker
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        customInput={
                                            <button
                                                type="button"
                                                style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '5px 30px ', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} />
                                                {date.toLocaleDateString('en-GB')}
                                            </button>
                                        }
                                    />
                                </div>
                            </label>
                            <label className="form-control w-full ">
                                {/* Start Time Picker */}
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

                                                {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </button>
                                        }
                                    />
                                </div>
                            </label>
                            <label className="form-control w-full ">
                                {/* End Time Picker */}
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

                                                {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
               <Link className='w-fit m-auto my-5' to="/ticket" > <button className='m-auto w-full px-5 py-2'  style={{backgroundColor:"#FE724C",color:"white"}}>Next</button></Link>
               
            </div>
        </>
    )
}

export default BasicInfoEvents
