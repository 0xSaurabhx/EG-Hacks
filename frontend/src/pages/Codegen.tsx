
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { useState } from "react"
import axios from 'axios'
export default function Codegen() {
  const [dropInputs, setDropInputs] = useState({
    from: "",
    to: "",
    file: null,
  });
  const [convertedCode, setConvertedCode] = useState('');
  const handleFileChange = (event) => {
    setDropInputs(prevState => ({
      ...prevState,
      file: event.target.files[0],
    }));
  };

  const handleFromChange = (event) => {
    setDropInputs(prevState => ({
      ...prevState,
      from: event.target.value,
    }));
  };

  const handleToChange = (event) => {
    setDropInputs(prevState => ({
      ...prevState,
      to: event.target.value,
    }));
  };
 
  const handleConvert = async () => {
    const { from, to, file } = dropInputs;
    if (file && from && to) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://127.0.0.1:8181/convert', formData, {
          params: {
            from: from,
            to: to,
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response:', response);
        if (response.status === 200) {
          setConvertedCode(response.data);
        } else {
          console.error('Conversion failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during conversion:', error);
      }
    }
  };
  

  return (
    <>
    <Header />
     <div className="flex min-h-screen w-full">
      <div className="flex flex-col items-center  gap-6 bg-gray-100 p-8  md:w-3/4 overflow-y-auto">
        <h1 className="text-3xl font-bold tracking-tight mt-20 sm:text-4xl">Legacy to Modern Code Converter</h1>
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="file-upload">Upload Legacy Code</Label>
            <Input accept=".pas,.dfm,.cob,.cbl,.vb,.vbs" id="file-upload" required type="file" onChange={handleFileChange} />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="target-language">Legacy code</Label>
            <Select onChange={handleFromChange} >
              <SelectTrigger className="text-gray-500 ">
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">Cobol</SelectItem>
                <SelectItem value="python">Virtual basic</SelectItem>
                <SelectItem value="csharp">Delphi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="target-language">Convert to</Label>
            <Select onChange={handleToChange}>
              <SelectTrigger className="text-gray-500 ">
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">Java</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleConvert} className="w-full">Convert</Button>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm w-full">
            <h3 className="text-lg font-semibold">Converted Code</h3>
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 ">
              {convertedCode}
              </pre>
              <CopyIcon className="rounded-full cursor-pointer" size="icon" variant="outline" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center  gap-6 bg-gray-50 p-8  md:w-1/4 overflow-y-auto">
        <h2 className="text-2xl mt-20 font-bold tracking-tight sm:text-3xl">Conversion History</h2>
        <div className="flex w-full max-w-md flex-col items-start justify-center gap-4 overflow-y-auto">
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Legacy Code Conversion</h3>
              <div className="text-sm text-gray-500 ">Date</div>
            </div>
          
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900">
                {` Legacy Code
            `}
              </pre>
             
            </div>
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 ">
                {`modern code
                `}
              </pre>
             
            </div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Legacy Code Conversion</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Date</div>
            </div>
           
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 ">
                {`Legacy code`}
              </pre>
              
            </div>
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 ">
                {` Modern Code
           `}
              </pre>
   
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   
  )
}



function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}
      

