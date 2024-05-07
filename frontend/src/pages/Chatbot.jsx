import React from "react";
import "./Chatbot.css";
import gptLogo from "../assets/chatgpt.svg";
import addBtn from "../assets/add-30.png";
import msgIcon from "../assets/message.svg";
import home from "../assets/home.svg";
import saved from "../assets/bookmark.svg";
import rocket from "../assets/rocket.svg";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Header } from "../components/Header";
function Chatbot() {
  return (
    <>
      <Header />
      <div className="App ">
        <div className="sideBar ">
          <div className="upperSide ">
            <div className="upperSideTop">
              <img src={gptLogo} alt="" className="logo" />
              <span className="brand">Code</span>
            </div>
            <button className="midBtn">
              <img src={addBtn} alt="new chat" className="addBtn" />
              New Chat
            </button>
            <div className="upperSideBottom">
              <button className="query">
                <img src={msgIcon} alt="Query" />
                What is programming?
              </button>
              <button className="query">
                <img src={msgIcon} alt="Query" />
                How to use an API
              </button>
            </div>
          </div>

          <div className="lowerSide">
            <div className="listItems">
              <img src={home} alt="" className="listitemsImg" />
              Home
            </div>
            <div className="listItems">
              <img src={saved} alt="" className="listitemsImg" />
              Saved
            </div>
            <div className="listItems">
              <img src={rocket} alt="" className="listitemsImg" />
              UpgradeToPro
            </div>
          </div>
        </div>

        <div className="main grid grid-span-7">
          <div className="flex min-h-screen w-full">
            <div className="flex flex-col items-center justify-center gap-6 color p-8 dark:bg-gray-800 md:w-1/2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Legacy to Modern Code Converter
              </h1>
              <div className="flex w-full max-w-md flex-col items-center justify-center gap-4">
                <div className="grid w-full gap-2">
                  <Label htmlFor="file-upload">Upload Legacy Code</Label>
                  <Input id="file-upload" type="file" />
                </div>
                <div className="grid w-full gap-2">
                  <Label htmlFor="target-language">Convert to</Label>
                  <Select id="target-language">
                    <SelectTrigger className="text-gray-500 dark:text-gray-400">
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
                <div className="rounded-md border border-gray-200 color p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950">
                  <h3 className="text-lg font-semibold">Converted Code</h3>
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-100 dark:text-gray-50">
                    {``}
                  </pre>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 color p-8 dark:bg-gray-900 md:w-1/2">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Conversion History
              </h2>
              <div className="flex w-full max-w-md flex-col items-start justify-center gap-4">
                <div className="rounded-md border border-gray-200 color p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">chat</h3>
                    <div className="text-sm text-gray-100 dark:text-gray-400"></div>
                  </div>
                  <p className="text-gray-100 dark:text-gray-400"></p>
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-100 dark:text-gray-50">
                    {``}
                  </pre>
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 dark:text-gray-50">
                    {``}
                  </pre>
                </div>
                <div className="rounded-md border border-gray-200  color p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">chat</h3>
                    <div className="text-sm text-gray-100 dark:text-gray-400"></div>
                  </div>
                  <p className="text-gray-100 dark:text-gray-400"></p>
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-100 dark:text-gray-50">
                    {``}
                  </pre>
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900 dark:text-gray-50">
                    {``}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
