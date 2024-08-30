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
        localStorage.setItem('event', JSON.stringify(hi));
        nav('../basicinfo')
    }
    return (
        <>
            <div>
                <h3 className=' w-11/12 m-auto'>
                    <span> Manage Events</span> <button onClick={handleNewEvent}>+ Create new Event</button>
                </h3>
                <div className='grid grid-cols-4 w-11/12 m-auto gap-4'>
                    {console.log(events)
                    }
                    {events ? events.map((ele, i) => {
                        return <div  key={i}>
                            <div className='event_img' >
                                <img className='' onClick={()=>handletap(ele._id)} src={ele.images[0]} alt="" />

                                <span></span>
                            </div>
                            <h2 className='text-xl font-semibold flex w-full justify-between'><span>{ele.name}</span>
                            <div className="dropdown dropdown-end " style={{ position: "" }}>
                                    <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </div>
                                    <div
                                        tabIndex={0}
                                        className="card compact dropdown-content bg-base-100 rounded-box z-[10] w-30 shadow">
                                        <div tabIndex={0} className="card-body">
                                            <button onClick={() => handleDel(ele._id)}><i class="fa-solid fa-trash" ></i> Delete</button>
                                            <button onClick={() => handleStatus(i, ele._id)}><i class="fa-solid fa-pen"></i> Edit</button>
                                        </div>
                                    </div>
                                </div>
                                </h2>
                            <h3> <i className="fa-solid fa-location-dot"></i> {ele.city}</h3>
                            <h3 className='flex justify-between w-11/12 align-middle'><div className='w-10/12'><i className="fa-regular fa-clock"></i> {ele.time.start} to {ele.time.end}</div>
                                <div className={`w-4 h-4 p-0  my-auto rounded-full ${ele.status ? 'bg-green-700' : 'bg-gray-700'}`}></div>
                            </h3>
                        </div>
                    }) : "Add Somthing"}
                </div>
                <div className='fixed bottom-0 left-0 right-0 bg-white shadow-sm py-3'>
                    <div className='w-1/2 ms-auto  '>
                        <div className='flex py-1'>
                            <div className='w-4 h-4 my-auto rounded-full bg-green-700'> </div> <div className='px-5 ms-5 py-0 bg-green-700 w-fit'> Live Event</div>
                        </div>
                        <div className='flex py-1'>
                            <div className='w-4 h-4 my-auto rounded-full bg-gray-700'> </div> <div className='px-5 ms-5 py-0 bg-gray-700 w-fit'> Paused Event</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeEvent
