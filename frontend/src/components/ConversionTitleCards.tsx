import { API_URL } from "@/lib/utils"
import axios from "axios";
import { useEffect, useState } from "react";

const ConversionTitleCards = () => {

    const [conversionTitles, setConversionTitles] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userid = user.id;
        console.log('User ID:', userid);
    
        if (userid) {
            const url = `${API_URL}chatid/get?userid=${userid}`;
            axios.get(url)
                .then(response => {
                    setConversionTitles(response.data);
                    
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        }
    }, []);
    

    return (
        <div className="flex flex-col items-center  gap-6 bg-gray-50 p-8  md:w-1/4 overflow-y-auto">
            <h2 className="text-2xl mt-20 font-bold tracking-tight sm:text-3xl">Conversion History</h2>
            <div className="flex w-full max-w-md flex-col items-start justify-center gap-4 overflow-y-auto">
                {!conversionTitles.length ? (
                    <div className="text-center pb-8 pt-8">
                        No Conversion History
                    </div>
                ) : (
                    conversionTitles.map((item, index) => (
                        <div key={index} className="rounded-md border border-gray-200 bg-white p-4 shadow-sm ">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <div className="text-sm text-gray-500 ">2024-05-10</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900">
                                    {item.con_id}
                                </pre>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
    
}

export default ConversionTitleCards
