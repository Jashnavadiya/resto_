import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Homeevent.css'
const HomeEvent = () => {

    const [events, setEvents] = useState([]);

    const nav = useNavigate()
    const handleNewEvent = () => {
        nav('../basicinfo')
    }

    useState(() => {
        let hi = async () => {
            let hii = await axios.get('http://localhost:5000/api/v1/event/all')
            console.log(hii.data.data);
            setEvents(hii.data.data)
        }
        hi()
        localStorage.setItem('event', JSON.stringify(''))
    }, [events])

    const handleDel = async (id) => {
        console.log('hi');

        let hi = events.filter((ele) => ele._id !== id)
        setEvents(hi)
        localStorage.setItem('events', JSON.stringify(hi));
        await axios.delete(`http://localhost:5000/api/v1/event/delete/${id}`)
    }

    const handleStatus = async (index, id) => {
        let [hi] = events.filter((ele) => ele._id === id);
        hi.status = !hi.status;
        console.log(hi);

        let response = await axios.put(`http://localhost:5000/api/v1/event/update/${id}`, hi)
        console.log(response.data.data);

        console.log();

        setEvents(prevevents => {
            const updatedevents = [...prevevents];
            updatedevents[index] = hi;
            return updatedevents
        }
        )
    }
    const handletap = (id) => {
        let [hi] = events.filter((ele) => ele._id === id);
        hi.status = !hi.status;
        localStorage.setItem('event', JSON.stringify(hi));
        nav('../basicinfo')
    }
    return (
        <>
            <div className="p-5">
                <h3 className="flex justify-between items-center w-full my-7">
                    <span className="text-xl md:text-2xl font-semibold">Manage Events</span>
                    <button
                        className="btn_create bg-[#FE724C] px-4 py-2 text-white rounded"
                        onClick={handleNewEvent}
                    >
                        <span className="hidden sm:inline">+ Create new Event</span>
                        <span className="inline sm:hidden">+</span>
                    </button>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 w-full m-auto">
                    {events ? events.map((ele, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg shadow-md"
                        >
                            <div className="event_img">
                                <img
                                    className="w-full h-auto object-cover rounded-t-lg"
                                    onClick={() => handletap(ele._id)}
                                    src={ele.images[0]}
                                    alt=""
                                />
                            </div>
                            <div className="p-5">
                                <h2 className="text-lg md:text-xl font-semibold flex justify-between">
                                    <span>{ele.name}</span>
                                    <div className="dropdown dropdown-end">
                                        <div
                                            tabIndex={0}
                                            role="button"
                                            className="btn btn-circle btn-ghost btn-xs text-info"
                                        >
                                            <i className="text-black fa-solid fa-ellipsis-vertical"></i>
                                        </div>
                                        <div
                                            tabIndex={0}
                                            className="card compact dropdown-content bg-base-100 rounded-box z-[10] w-30 shadow"
                                        >
                                            <div tabIndex={0} className="card-body">
                                                <button onClick={() => handleDel(ele._id)}>
                                                    <i className="fa-solid fa-trash"></i> Delete
                                                </button>
                                                <button onClick={() => handleStatus(i, ele._id)}>
                                                    <i className="fa-solid fa-pen"></i> Change Status
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </h2>
                                <h3>
                                    <i className="fa-solid fa-location-dot"></i> {ele.city}
                                </h3>
                                <h3 className="flex justify-between items-center">
                                    <div className="w-10/12">
                                        <i className="fa-regular fa-clock"></i> {ele.time.start} to {ele.time.end}
                                    </div>
                                    <div
                                        className={`w-4 h-4 p-0 rounded-full ${ele.status ? 'bg-green-700' : 'bg-gray-700'}`}
                                    ></div>
                                </h3>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center col-span-full">Add Something</div>
                    )}
                </div>
                <div className="fixed bottom-0 w-10/12 ms-auto left-0 right-0 bg-white shadow-sm py-3">
                    <div className="flex justify-center md:justify-end w-full md:w-10/12 mx-auto">
                        <div className="w-full md:w-1/2">
                            <div className="flex items-center py-1">
                                <div className="w-4 h-4 rounded-full bg-green-700"></div>
                                <div className="px-5 py-1 bg-green-700 text-white rounded-lg ml-4">Live Event</div>
                            </div>
                            <div className="flex items-center py-1">
                                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                <div className="px-5 py-1 bg-gray-300 text-white rounded-lg ml-4">Paused Event</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HomeEvent
