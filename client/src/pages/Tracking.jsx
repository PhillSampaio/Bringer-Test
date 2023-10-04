import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import '../App.css'
import logo from '../bps_logo_gray.png'
import { TrackingList } from '../components/TrackingList'

export function Tracking() {

    const defaultTrackingNumber = 'BPS1EP58YI5SKBR'
    const [searchParams, setSearchParams] = useSearchParams({'tracking_number' : defaultTrackingNumber})
    const number = searchParams.get('tracking_number')
    const [data,setData] = useState({})

    function search() {
        
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            }
        };
        fetch('http://localhost:5000/Tracking_parcel/' + number, requestOptions)
        .then(response => response.json())
        .then(data => {
            setData(data)
        });   
    }

    function inputChange(value) {
        setSearchParams({'tracking_number' : value})
    } 

    return (
        <>           
            <div className="tracking-page">
                <div className="bps-page-logo">
                    <img src={logo} />
                </div>

                <div className="tracking-block">
                    <div className="tracking-title">BPS Tracking</div>
                    <p className="tracking-text">Enter your tracking number:</p>
                    <div className="tracking-input">
                        <input value={number} onChange={e => inputChange(e.target.value)} />
                    </div>
                    <div className="tracking-btn-search">
                        <button onClick={ search }>Search</button>                        
                    </div>
                    <div className="tracking-btn-map">
                        <button disabled={true}>Show Map</button>
                    </div>
                </div>

                <TrackingList data={data}  />                
            </div>
        </>
    )
}