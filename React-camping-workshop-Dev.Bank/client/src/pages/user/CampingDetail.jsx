import { useParams } from "react-router";
import axios from "axios";
import { readCamping } from "@/api/camping";
import { useEffect, useState } from "react";


function CampingDetail() {
    const { id } = useParams();
    // console.log(id)
    const[camping, setCamping] = useState([]);

    
    useEffect(() => {
        fetchCampingDetail(id);
    }, []);

    const fetchCampingDetail = async (id) => {
        try {
            const res = await readCamping(id);
            setCamping(res.data.result);
        } catch (error) {
            console.error("Error fetching camping detail:", error);
        }
    }
    console.log(camping);
  return (
    <div>CampingDetail</div>
  )
}

export default CampingDetail;