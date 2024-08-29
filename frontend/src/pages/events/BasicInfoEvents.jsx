import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
const BasicInfoEvents = () => {
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
    return (
        <>
            <div className='w-full'>
                <h2>

                </h2>
                <div className='w-screen'>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Event Name</span>
                        </div>
                        <input type="text" placeholder="Enter Event Name" className="input input-bordered w-full max-w-lg" />
                    </label>
                    <label className="form-control w-full ">
                        <div className="label">
                            <span className="label-text">Event City</span>
                        </div>

                        <input type="text" placeholder="Enter Event Place" className="input input-bordered w-full max-w-xs" />
                    </label>

                    <div className='flex w-1/2'>

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
                        <input type="text" placeholder="Enter Event Name" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
            </div>
        </>
    )
}

export default BasicInfoEvents
