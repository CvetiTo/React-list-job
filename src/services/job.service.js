import { db } from '../firebase-config.js';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
} from 'firebase/firestore';

const jobCollectionRef = collection(db, 'jobs');

class JobDataService {
    addJobs = (newJob) => {
        return addDoc(jobCollectionRef, newJob);
    }

    updateJob = (id, updatedJob) => {
        const jobDoc = doc(db, 'jobs', id);
        return updateDoc(jobDoc, updatedJob);
    }
    deleteJob = (id) => {
        const jobDoc = doc(db, 'jobs', id);
        return deleteDoc(jobDoc);
    }
    getAllJobs = () => {
        return getDocs(jobCollectionRef);
    }
    getJob = (id) => {
        const jobDoc = doc(db, 'jobs', id);
        return getDoc(jobDoc);
    }
    getFiltred = () => {
        return getDocs(query(jobCollectionRef, orderBy("priority", "desc")));

    }
}

export default new JobDataService();