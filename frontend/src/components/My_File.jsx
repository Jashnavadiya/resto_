import axios from 'axios'
import React, { useEffect, useState } from 'react'

function My_File() {
    const [resData, setResdata] = useState([])
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get('http://localhost:5000/addResto/66c866a0e9c42bad8405c958')
            console.log(data.data)
            setResdata([data.data])
        }
        fetchData()
    }, [])
    return (
        <div>
            {
                resData && resData.map((data, index) => {
                    return <div>
                        <h1>{data.name}</h1>
                        <>
                            {
                                data.category && data.category.map((catData, index) => {
                                    return <div>
                                        <h2 style={{ color: "red" }}>{catData.name}</h2>
                                        {
                                            catData.subcategories && catData.subcategories.map((subData, index) => {
                                                return <div>
                                                    <h3 style={{ color: "green" }}>{subData.name}</h3>
                                                    {
                                                        subData.item && subData.item.map((itemData, index) => {
                                                            return <div>
                                                                <h4 style={{ color: "blue" }}>{itemData.name}</h4>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            })
                                        }
                                    </div>
                                })
                            }
                        </>
                    </div>
                })
            }
        </div>
    )
}

export default My_File