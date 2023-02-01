import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import JobDataService from '../services/job.service.js';

export const Table = ({
    getJobId
}) => {
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        const data = await JobDataService.getAllJobs();
        //console.log(data.docs);
        setJobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const deleteHandler = async (id) => {
        await JobDataService.deleteJob(id);
        getJobs();
    }
    const filterHandler = async () => {
        const data = await JobDataService.getFiltred();
        const newData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        //console.log(newData);
        setJobs(newData);
    }
    return (
        <>
            <div className="box-btn">
                <button className="btn-refresh" onClick={getJobs}>JOB LIST</button>
                <button className="search-btn" onClick={filterHandler} >Search Job</button>
            </div>
            {/* <pre>{JSON.stringify(jobs, undefined, 3)}</pre> */}
            <hr className="divider"></hr>
            <table className="table" cellSpacing="0">
                <tbody>
                    {jobs.map((doc, index) => {
                        return (
                            <tr key={doc.id} className='t-row'

                                style={{
                                    backgroundColor:
                                        doc.priority == 'Urgent'
                                            ? 'orangeRed'
                                            : doc.priority == 'Regular' ? 'yellow'
                                                : 'deepSkyBlue'
                                }}

                            >
                                <td className="jobs-cont">{doc.job}</td>
                                <td>{doc.priority}</td>
                                <td className="align-right">
                                    <button className="btn btn-edit"
                                        onClick={(e) => getJobId(doc.id)}
                                    >
                                        Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-delete"
                                        onClick={(e) => deleteHandler(doc.id)} >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </>
    );
}