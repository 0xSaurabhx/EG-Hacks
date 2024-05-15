import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams, useLocation } from "react-router-dom";
import { Back } from '@/components/Back';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const Debug = () => {
  const { id } = useParams();
  const location = useLocation();

  const { title } = location.state || { title: '' }; 
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://eg-hacks-api.vercel.app/debug/get?chatid=${id}-new&title=${title}`);
      const data = await response.text();
      setCode(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div >
            <div className="text-5xl   font-extrabold">
              Debug
            </div>
            <div className="pt-5 mt-5 p-10 bg-gray-900 text-white">
            {/* <SyntaxHighlighter language="javascript" style={docco}>
                {code}
                </SyntaxHighlighter> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug;
