export function TrackingListItem ({item}) {
    return  (
        <div className="tracking-status-item" key={item.id}>
            <div className="tracking-date">
                <div className="tracking-mon-year">{item.date}</div>
                <div className="tracking-hour">{item.time}</div>
            </div>
            <div className="tracking-status-place">
                <div className={`tracking-status ${item.state === 'delivered' ? "txt-green" : ""} ${item.state === 'shipped' ? "txt-black" : ""}`}>{item.stateDescription}</div>
                <div className="tracking-place">{item.location}</div>
                {item.taxDue ? 
                    <button className="tracking-tax-btn">Go to Pay Taxes</button>
                 : null}
            </div>
        </div>
    )
}