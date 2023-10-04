import { TrackingListItem } from '../components/TrackingListItem'

export function TrackingList({ data }) {
    
    return (
        <>
            {data && data.parcel_tracking_items ? 
            <div className="tracking-block">
                <div className="tracking-btns-header">
                    <div className="tracking-btns-left">
                        <button className="tracking-btn">{data.tracking_number}</button>
                    </div>
                    <div className="tracking-btns-right">
                        <button className="tracking-btn">{data.external_tracking_number}</button>                       
                    </div>
                </div>

                <br />
                <br />

                <div className="tracking-status-block">
                        <div className="tracking-status-list">

                            {data.parcel_tracking_items.map( item => {
                                return <TrackingListItem item={item} key={item.id} />      
                            })}
                        </div>
                    </div>                    
            </div>        
         : null}
        </>
    )
}