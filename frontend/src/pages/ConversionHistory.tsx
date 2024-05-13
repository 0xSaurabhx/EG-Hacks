import {useParams} from "react-router-dom";
import {Back}  from "@/components/Back";
import { useEffect, useState } from "react";
import axios from "axios";

const ConversionHistory = () => {
    const { id } = useParams();
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://pub-ed6294b09052471093b13f036a7fe802.r2.dev/${id}.json`);
            setData(result.data);
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Back/>
            <div className="flex justify-center">
                <div className="px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div >
                        <div className="text-5xl font-extrabold">
                            Conversion History
                        </div>
                        <div className="pt-4">
                            <pre>{data}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConversionHistory
