import { useParams, useLocation, Link } from "react-router-dom";
import { Back } from "@/components/Back";
import { useEffect, useState } from "react";
import axios from "axios";

const ConversionHistory = () => {
    const { id } = useParams();
    const location = useLocation();
    const { title } = location.state || { title: '' }; 
    const [data, setData] = useState('');
    const docsUrl = id?.replace('-new', '') 
    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(data);
            console.log('Code copied to clipboard');
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://pub-ed6294b09052471093b13f036a7fe802.r2.dev/${id}.json`);
            setData(result.data);
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Back />
            <div className="flex justify-center">
                <div className="px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div>
                        <div className="text-5xl font-extrabold">
                            {title ? title : 'Conversion History'} {/* Displaying the title */}
                        </div>
                        <div className="pt-4">
                            <div className="bg-gray-900 rounded-md p-2">
                                <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-100">
                                    {data}
                                </pre>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-2">
                            <button onClick={copyCode} className="rounded-md bg-gray-800 text-white px-3 py-1 mr-2 hover:bg-gray-700">
                                Copy
                            </button>
                            <Link to={`/docs/${docsUrl}`} state={{ title: title }}>
                                <button className="rounded-md bg-gray-800 text-white px-3 py-1 hover:bg-gray-700">
                                    Docs
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConversionHistory;
