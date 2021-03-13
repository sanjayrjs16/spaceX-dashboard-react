import React from 'react'

interface TableItems  {
    details: {
        flight_number: any,
        launch_date_utc: any,
        launch_site:  any,
        mission_name: any,
        rocket: any,
        launch_success: boolean
        rocket_name: any,
    }[]
}
const TableRow: React.FC<TableItems> = (props) => {
    return (
        <>
        {props.details!=null?
                props.details.map((item) => {
                    return (
                        <tr key={item.flight_number}>
                            <td >{item.flight_number}</td>
                            <td>{item.launch_date_utc}</td>
                            <td>{item.launch_site.site_name}</td>
                            <td>{item.mission_name}</td>
                            <td>{item.rocket.second_stage.payloads[0].orbit}</td>
                            <td>{String(item.launch_success)}</td>
                            <td>{item.rocket.rocket_name}</td>
                        </tr>);
                })
            :"Loading"}
            
        </>
    )
}
export default TableRow;