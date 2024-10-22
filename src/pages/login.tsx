/* eslint-disable @typescript-eslint/no-explicit-any */
import localFont from "next/font/local";

import { signIn } from "next-auth/react";
import * as XLSX from 'xlsx';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// If using Node.js, require the library
// const XLSX = require('xlsx');

// Function to handle the file input in a browser
// HTML input element to upload the Excel file
// <input type="file" id="fileInput" onchange="handleFile(event)" />


interface IGoogle extends React.SVGAttributes<SVGElement> {
  className?: string;
}

const Google: React.FC<IGoogle> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 26 26"
      fill="none"
    >
      <path
        d="M23.6226 10.8786H22.75V10.8337H13V15.167H19.1224C18.2292 17.6895 15.8291 19.5003 13 19.5003C9.41033 19.5003 6.49996 16.5899 6.49996 13.0003C6.49996 9.4107 9.41033 6.50033 13 6.50033C14.6569 6.50033 16.1644 7.12541 17.3122 8.14645L20.3764 5.08224C18.4415 3.27903 15.8535 2.16699 13 2.16699C7.01725 2.16699 2.16663 7.01762 2.16663 13.0003C2.16663 18.983 7.01725 23.8337 13 23.8337C18.9827 23.8337 23.8333 18.983 23.8333 13.0003C23.8333 12.2739 23.7585 11.5649 23.6226 10.8786Z"
        fill="#FFC107"
      />
      <path
        d="M3.41577 7.95795L6.97506 10.5682C7.93815 8.18383 10.2706 6.50033 13 6.50033C14.657 6.50033 16.1644 7.12541 17.3122 8.14645L20.3764 5.08224C18.4416 3.27903 15.8535 2.16699 13 2.16699C8.83894 2.16699 5.23035 4.5162 3.41577 7.95795Z"
        fill="#FF3D00"
      />
      <path
        d="M13 23.8337C15.7982 23.8337 18.3408 22.7628 20.2632 21.0214L16.9103 18.1841C15.7861 19.0391 14.4123 19.5015 13 19.5004C10.1822 19.5004 7.78967 17.7037 6.88834 15.1963L3.35559 17.9182C5.14851 21.4265 8.78959 23.8337 13 23.8337Z"
        fill="#4CAF50"
      />
      <path
        d="M23.6226 10.878H22.75V10.833H13V15.1663H19.1225C18.6952 16.3669 17.9256 17.416 16.9087 18.184L16.9103 18.1829L20.2632 21.0201C20.026 21.2357 23.8333 18.4163 23.8333 12.9997C23.8333 12.2733 23.7586 11.5643 23.6226 10.878Z"
        fill="#1976D2"
      />
    </svg>
  );
};


export default function Home() {

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex items-center justify-center`}
    >
      
      <button
        className="flex space-x-3 w-fit bg-white border-grey-375 border text-grey-650 hover:bg-grey-125 data-[state=active]:bg-grey-125 data-true:bg-grey-125 px-4 py-3 rounded-full"
        type="button"
        onClick={() => signIn("google",{
          callbackUrl: "https://subtle-empanada-cf1358.netlify.app"
        })}
      >
        <Google className="w-6 h-auto" />
        <span>Login with Google</span>
      </button>

    </div>
  );
}
