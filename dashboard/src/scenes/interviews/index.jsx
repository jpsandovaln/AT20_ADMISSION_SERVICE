import MUIDataTable from "mui-datatables";
import axios from "axios";
import { useState, useEffect } from "react";

    const TableInterview = () => {
    const [interviews, setInterviews] = useState( [] )

    const endpoint = 'http://localhost:8080/api/v1/interview/interviews';

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data;
            console.log(data)
            setInterviews(data);
        });
    }
    useEffect( ()=> {
        getData()
    }, []);

    const columns = [
        {
            name:"id",
            label:"ID"
        },
        {
            name:"host_global_id",
            label:"Host"
        },
        {
            name:"guest_global_id.name",
            label:"Guest"
        },
        {
            name:"meeting_name",
            label:"Meeting"
        },
        {
            name:"description",
            label:"Description"
        },
        {
            name:"date",
            label:"Date"
        },
    ]

        return(
            <MUIDataTable
            title={"Show interviews"}
            data={interviews}
            columns={columns}
            />
        )
}
export default TableInterview;