import React, { useState } from 'react'

const HomeEvent = () => {

    const [events, setEvents] = useState([
        {
            name: "saturday night with alexa",
            city: "Mumbai,india",
            image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80",
            time: {
                date: "",
                start: "9 PM",
                end: "1 AM",
            },
            tickets: [{ price: 20 }],
            status: "live"
        },
        {
            name: "saturday night with alexa",
            city: "Mumbai,india",
            image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80",
            time: {
                date: "",
                start: "9 PM",
                end: "1 AM",
            },
            tickets: [{ price: 20 }],
            status: "live"
        },
        {
            name: "saturday night with alexa",
            city: "Mumbai,india",
            image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80",
            time: {
                date: "",
                start: "9 PM",
                end: "1 AM",
            },
            tickets: [{ price: 20 }],
            status: "live"
        },
        {
            name: "saturday night with alexa",
            city: "Mumbai,india",
            image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80",
            time: {
                date: "",
                start: "9 PM",
                end: "1 AM",
            },
            tickets: [{ price: 20 }],
            status: "live"
        },
        {
            name: "saturday night with alexa",
            city: "Mumbai,india",
            image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80",
            time: {
                date: "",
                start: "9 PM",
                end: "1 AM",
            },
            tickets: [{ price: 20 }],
            status: "live"
        },
        {
            name: "saturday night with alexa",
            city: "Mumbai,india",
            image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80",
            time: {
                date: "",
                start: "9 PM",
                end: "1 AM",
            },
            tickets: [{ price: 20 }],
            status: "live"
        },
        {
            name: "saturday night with alexa",
            city: "Mumbai,india",
            image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80",
            time: {
                date: "",
                start: "9 PM",
                end: "1 AM",
            },
            tickets: [{ price: 20 }],
            status: "live"
        },

    ]);


    return (
        <>
            <div>
                <h3 className=' w-11/12 m-auto'>
                    <span> Manage Events</span> <button>+ Create new Event</button>
                </h3>
                <div className='grid grid-cols-4 w-11/12 m-auto gap-4'>
                    {events.map((ele) => {
                        return <div>
                            <img src={ele.image} alt="" />
                            <h2 className='text-xl font-semibold'>{ele.name}</h2>
                            <h3> <i className="fa-solid fa-location-dot"></i> {ele.city}</h3>
                            <h3 className='flex justify-between w-10/12 align-middle content-center'><div><i className="fa-regular fa-clock"></i> {ele.time.start} to {ele.time.end}</div><div className='w-4 h-4 my-auto rounded-full bg-slate-400'> </div></h3>
                        </div>
                    })}
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
