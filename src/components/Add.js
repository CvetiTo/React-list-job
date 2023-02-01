import { useEffect, useState } from 'react';
import JobDataService from '../services/job.service.js';

export const Add = ({
    id,
    setJobId,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [values, setValues] = useState({
        job: '',
        priority: '',
    });
    const [errors, setErrors] = useState({});
    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const newJob = values;
        //console.log(newJob);
        try {
            if (id !== undefined && id !== '') {
                await JobDataService.updateJob(id, newJob);
                alert('Updated successfully!');
                setJobId('');
                setIsEdit(false);
            } else {
                await JobDataService.addJobs(newJob);
                alert('new Job added!');
            }

        } catch (err) {
            console.error(err);
        }
        setValues({
            job: '',
            priority: '',
        });
    };

    const minLength = (e, limit) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < limit,
        }));
    }
    const isValidEnglishLetters = (e) => {
        let regex = /^[a-zA-Z\s]{1,70}$/.test(e.target.value);
        setErrors(state => ({
            ...state,
            [e.target.name]: regex ? false : true,
        }));
    }
    //console.log(values.job, values.priority);
    const editHandler = async () => {
        try {
            const docSnap = await JobDataService.getJob(id);
            //console.log('record is:', docSnap.data());
            setValues(docSnap.data());

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        //console.log('Id is:', id);
        if (id != undefined && id != '') {
            editHandler();
            setIsEdit(true);
        }
    }, [id]);

    return (
        <div> {
            isEdit
            ? <div className='modal'>
                <form onSubmit={submitHandler} >
                    <div>
                        <p className='modal-desc'>
                            {values.job}
                        </p>

                    </div>
                    <div>
                        <select id="priority" name='priority' className='input-cont'
                            value={values.priority}
                            onChange={changeHandler} onBlur={(e) => minLength(e, 1)}>
                            <option value=""></option>
                            <option value="Urgent">Urgent</option>
                            <option value="Regular">Regular</option>
                            <option value="Trivial">Trivial</option>
                        </select>
                    </div>
                    {errors.priority &&
                        <p className="form-error" style={{ color: "red" }} >
                            Priority should be required!
                        </p>
                    }
                    <div className='btn-update'>
                        <button type="submit" disabled={Object.values(errors).some(x => x)}
                            className="btn btn-create" >Update</button>
                    </div>
                </form>
            </div>
            : <form onSubmit={submitHandler} >
                <div>
                    <p className='label-cont'>
                        <label htmlFor="job" >Job:</label>
                    </p>
                    <input name='job' className='input-content'
                        id="job" type="text" placeholder="Job"
                        value={values.job} required
                        onChange={changeHandler}
                        onBlur={isValidEnglishLetters}
                    />
                </div>
                {errors.job &&
                    <p className="form-error" style={{ color: "red" }} >
                        Job should be required, max 70 char, and only English letters!
                    </p>
                }
                <div>
                    <p className='label-cont'>
                        <label htmlFor="priority" >Priority:</label>
                    </p>
                    <select id="priority" name='priority' className='input-cont'
                        value={values.priority} required
                        onChange={changeHandler} onBlur={(e) => minLength(e, 1)}>
                        <option value=""></option>
                        <option value="Urgent">Urgent</option>
                        <option value="Regular">Regular</option>
                        <option value="Trivial">Trivial</option>
                    </select>
                </div>
                {errors.priority &&
                    <p className="form-error" style={{ color: "red" }} >
                        Priority should be required!
                    </p>
                }
                <div>
                    <button type="submit" disabled={Object.values(errors).some(x => x)}
                        className="btn btn-create" >Create</button>
                </div>
            </form>
        }

        </div>
    );
}