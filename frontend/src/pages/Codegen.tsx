
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Navigate } from 'react-router-dom';
import { API_URL } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { useState } from "react"
import axios from 'axios'
import { Spinner } from "@/components/Spinner";
import ConversionTitleCards from "@/components/ConversionTitleCards";

//@ts-ignore

export default function Codegen() {

  const [convertedCode, setConvertedCode] = useState('');
  
  
  const [isConverting, setIsConverting] = useState(false);
  const isAuthenticated = localStorage.getItem('user') !== null;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userid = user.id;
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  const [dropInputs, setDropInputs] = useState({
    from: "",
    to: "",
    file: null,
    userid: userid, // Add userid to state
  });
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(convertedCode);
      console.log('Code copied to clipboard');
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  function getFileExtension() {
    switch (dropInputs.to) {
      case "java":
        return "java";
      case "python":
        return "py";
      case "csharp":
        return "cs";
      default:
        return "";
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    setDropInputs(prevState => ({
      ...prevState,
      file: file,
      fileName: fileNameWithoutExtension,
    }));
};


  const handleConvert = async () => {
    setIsConverting(true);
    console.log('Convert button clicked');
    const { from, to, file, userid } = dropInputs;
    console.log('Inputs:', { from, to, file, userid });
    if (file && from && to) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('from', from);
      formData.append('to', to);
      formData.append('userid', userid); // Append userid to formData
      console.log('FormData:', formData);
      try {
        console.log('Making API request...');
        const response = await axios.post(API_URL + "/convert", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response:', response);
        if (response.status === 200) { 
          setIsConverting(false);

          setConvertedCode(response.data);
        } else {
          console.error('Conversion failed with status:', response.status);
        }
      } catch (error) {
        console.error('API request failed with error:', error);
      }
    } else {
      console.error('Missing input(s):', { from, to, file, userid });
    }
  };


  return (
    <>
      <Header />
      <div className="flex min-h-screen w-full">
  <div className="flex flex-col items-center gap-6 bg-gray-100 p-8 md:w-3/4 overflow-y-auto">
    <h1 className="text-3xl font-bold tracking-tight mt-20 sm:text-4xl">Legacy to Modern Code Converter</h1>
    <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4"> {/* Increase max-width here */}
      <div className="grid w-full gap-2">
        <Label htmlFor="file-upload" className="w-full">Upload Legacy Code</Label> {/* Add w-full class here */}
        <Input accept=".pas,.dfm,.cob,.cbl,.vb,.vbs" id="file-upload" required type="file" onChange={handleFileChange} className="w-full"/> {/* Add w-full class here */}
      </div>
      <div className="grid w-full gap-2">
        <label htmlFor="from-language" className="py-1 pr-2 text-sm font-semibold w-full">Legacy code</label> {/* Add w-full class here */}
        <select
          id="from-language"
          onChange={(e) => setDropInputs(prevState => ({ ...prevState, from: e.target.value }))}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select target language</option>
          <option value="cobol">Cobol</option>
          <option value="vb">Virtual basic</option>
          <option value="delphi">Delphi</option>
        </select>
      </div>
      <div className="grid w-full gap-2">
        <label htmlFor="to-language" className="py-1.5 pr-2 text-sm font-semibold w-full">Convert to</label> {/* Add w-full class here */}
        <select
          id="to-language"
          onChange={(e) => setDropInputs(prevState => ({ ...prevState, to: e.target.value }))}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select target language</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="csharp">C#</option>
        </select>
      </div>
      <Button onClick={handleConvert} className="w-full">Convert</Button> {/* Already full width */}
      {isConverting && <Spinner />}
      {convertedCode && (
        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm w-full">
          <h3 className="text-lg font-semibold">Converted Code</h3>
          <div className="bg-gray-900 rounded-md p-2">
            <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-100">
              {convertedCode}
            </pre>
          </div>
          <div className="flex items-center justify-center mt-2">
            <button onClick={copyCode} className="rounded-md bg-gray-800 text-white px-3 py-1 mr-2 hover:bg-gray-700">
              Copy
            </button>
            <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(convertedCode)}`} download={`${dropInputs.fileName}.${getFileExtension()}`} className="rounded-md bg-gray-800 text-white px-3 py-1 hover:bg-gray-700">
  Download
</a>

          </div>
        </div>
      )}
    </div>
  </div>
        <ConversionTitleCards/>
      </div>
    </>

  )
}




