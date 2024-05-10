import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Navigate } from 'react-router-dom';
import {API_URL} from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { useState } from "react"
import axios from 'axios'
import { Spinner } from "@/components/Spinner";
// @ts-ignore

export default function Codegen() {

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
  const [convertedCode, setConvertedCode] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const handleFileChange = (event) => {
    setDropInputs(prevState => ({
      ...prevState,
      file: event.target.files[0],
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
            const response = await axios.post(API_URL+"/convert", formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('Response:', response);
            if (response.status === 200) {
              setConvertedCode(response.data);
              setIsConverting(false)
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
      <div className="flex flex-col items-center  gap-6 bg-gray-100 p-8  md:w-3/4 overflow-y-auto">
        <h1 className="text-3xl font-bold tracking-tight mt-12 sm:text-4xl">Legacy to Modern Code Converter</h1>
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="file-upload">Upload Legacy Code</Label>
            <Input accept=".pas,.dfm,.cob,.cbl,.vb,.vbs" id="file-upload" required type="file" onChange={handleFileChange} />
          </div>
          <div className="grid w-full gap-2">
      <label htmlFor="from-language" className="py-1 pr-2 text-sm font-semibold">Legacy code</label>
      <select 
        id="from-language" 
        onChange={(e) => setDropInputs(prevState => ({...prevState, from: e.target.value}))}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Select target language</option>
        <option value="cobol">Cobol</option>
        <option value="vb">Virtual basic</option>
        <option value="delphi">Delphi</option>
      </select>
    </div>
<div className="grid w-full gap-2">
      <label htmlFor="to-language" className="py-1.5  pr-2 text-sm font-semibold">Convert to</label>
      <select 
        id="to-language" 
        onChange={(e) => setDropInputs(prevState => ({...prevState, to: e.target.value}))}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Select target language</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
        <option value="csharp">C#</option>
      </select>
      
    </div>
    <Button onClick={handleConvert} className="w-full">Convert</Button>
    {isConverting && <Spinner />}
    {convertedCode && (
      <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm w-full">
        <h3 className="text-lg font-semibold">Converted Code</h3>
        <div className="flex items-center justify-between">
          <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 ">
            {convertedCode}
          </pre>
          <CopyIcon className="rounded-full cursor-pointer" size="icon" variant="outline" />
        </div>
        <div className="flex mt-5 h-5 justify-between">
    <Button className="w-15">Ask</Button>
    <Button className="w-15">Debug</Button>
    <Button className="w-15">Optimize</Button>
    <Button className="w-15">Explain</Button>
    </div>
      </div>
    )}
   
   
        </div>
      </div>
      <div className="flex flex-col items-center  gap-6 bg-gray-50 p-8  md:w-1/4 overflow-y-auto">
        <h2 className="text-2xl mt-12 font-bold tracking-tight sm:text-3xl">Conversion History</h2>
        <div className="flex w-full max-w-md flex-col items-start justify-center gap-4 overflow-y-auto">
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Legacy Code Conversion</h3>
              <div className="text-sm text-gray-500 ">2024-05-10</div>
            </div>
          
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900">
                {` Legacy Code- COBOL
                IDENTIFICATION DIVISION.
                PROGRAM-ID. HELLO-WORLD.
                PROCEDURE DIVISION.
                    DISPLAY 'Hello, World!'.
                    STOP RUN.
                
            `}
              </pre>
             
            </div>
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 ">
                {`modern code- C#
                
                using System;
                
                class HelloWorld
                {
                    static void Main()
                    {
                        Console.WriteLine("Hello, World!");
                    }
                }
                `}
              </pre>
             
            </div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm ">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Legacy Code Conversion</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">2024-05-10</div>
            </div>
           
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 ">
                {`Legacy code- VB
                Module Module1
                Sub Main()
                    Dim num As Integer = 5
                    Dim factorial As Integer = 1
                    For i = 1 To num
                        factorial *= i
                    Next
                    Console.WriteLine("Factorial of " & num & " is " & factorial)
                End Sub
            End Module
            
                `}
              </pre>
              
            </div>
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 ">
                {`Modern Code- Java
                
                using System;

                class Program {
                    static void Main() {
                        int num = 5;
                        int factorial = 1;
                        for (int i = 1; i <= num; i++) {
                            factorial *= i;
                        }
                        Console.WriteLine("Factorial of " + num + " is " + factorial);
                    }
                }
                
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
      

