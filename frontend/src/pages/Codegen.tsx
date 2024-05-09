
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"

export default function Codegen() {
  
  return (
    <>
    <Header />
     <div className="flex min-h-screen w-full">
      <div className="flex flex-col items-center  gap-6 bg-gray-100 p-8  md:w-3/4 overflow-y-auto">
        <h1 className="text-3xl font-bold tracking-tight mt-20 sm:text-4xl">Legacy to Modern Code Converter</h1>
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="file-upload">Upload Legacy Code</Label>
            <Input accept=".js,.ts,.py,.pas,.dfm,.cob,.cbl,.vb,.vbs" id="file-upload" required type="file" />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="target-language">Convert to</Label>
            <Select >
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
          <Button className="w-full">Convert</Button>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm w-full">
            <h3 className="text-lg font-semibold">Converted Code</h3>
            <div className="flex items-center justify-between">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 ">
                {`Modern code`}
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
      

