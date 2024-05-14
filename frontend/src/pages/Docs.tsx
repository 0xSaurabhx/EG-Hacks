import { Back } from "@/components/Back";
import { useState, useEffect } from 'react';
import {  useParams, useLocation } from "react-router-dom";


//@ts-ignore
const sanitizeHTML = (htmlString) => {
    return { __html: htmlString };
};

const Docs = () => {
    const { id } = useParams();
    const location = useLocation();
    const { title } = location.state || { title: '' }; 
    const [OldHtmlContent, setOldHtmlContent] = useState('');
    const [NewHtmlContent, setNewHtmlContent] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const Nresponse = await fetch(`https://eg-hacks-api.vercel.app/docs/get?chatid=${id}-new&title=${title}`);
                const Oresponse = await fetch(`https://eg-hacks-api.vercel.app/docs/get?chatid=${id}-old&title=${title}`);

                if (!Oresponse.ok && !Nresponse.ok) {
                    throw new Error('Failed to fetch HTML content');
                }
                const Nhtml = await Nresponse.text();
                const Ohtml = await Oresponse.text();
                setOldHtmlContent(Ohtml);
                setNewHtmlContent(Nhtml)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Back />
            <div className="justify-center overflow-hidden" style={{ display: 'flex' }}>
                <div className="px-10 w-full pt-200 max-w-screen-xl pt-12 " style={{ flex: 1 }}>
                    
                    {NewHtmlContent && (
                        <iframe
                            title="Embedded HTML Content"
                             className="overflow-hidden"
                            srcDoc={sanitizeHTML(NewHtmlContent).__html}
                            width="100%"
                            height="1000px"
                            
                        ></iframe>
                    )}
                </div>
                <div className="px-10 w-full pt-200 max-w-screen-xl pt-12 " style={{ flex: 1 }}>
                    
                    {OldHtmlContent && (
                        <iframe
                            title="Embedded HTML Content"
                             className="overflow-hidden"
                            srcDoc={sanitizeHTML(OldHtmlContent).__html}
                            width="100%"
                            height="1000px"
                            
                        ></iframe>
                    )}
                </div>
            </div>
        </>
    );
}

export default Docs;