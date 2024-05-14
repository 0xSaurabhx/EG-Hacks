import { Back } from "@/components/Back";
import { useState, useEffect } from 'react';

//@ts-ignore
const sanitizeHTML = (htmlString) => {
    return { __html: htmlString };
};

const Docs = () => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://eg-hacks-api.vercel.app/docs/get?chatid=f715250a-371d-42d1-adf3-29af8e297e52-new&title=from%20cobol%20to%20python%20-%20tes.cob');
                if (!response.ok) {
                    throw new Error('Failed to fetch HTML content');
                }
                const html = await response.text();
                console.log(html); // Log the fetched HTML content
                setHtmlContent(html);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Back />
            <div className="flex justify-center overflow-hidden">
                <div className="px-10 w-full pt-200 max-w-screen-xl pt-12 ">
                    {htmlContent && (
                        <iframe
                            title="Embedded HTML Content"
                             className="overflow-hidden"
                            srcDoc={sanitizeHTML(htmlContent).__html}
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
