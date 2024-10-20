import localFont from "next/font/local";

import { signIn } from "next-auth/react";
import * as XLSX from 'xlsx';
import { redirect } from "next/navigation";

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
function handleFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Load the first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Extract column 2 and 3
    const extractedData = jsonData.map(row => [row[1], row[2]]); // row[1] -> Names, row[2] -> Mat. No

    // Log or use the extracted data
    console.log(JSON.stringify(extractedData));
  };

  reader.readAsArrayBuffer(file);
}

// HTML input element to upload the Excel file
// <input type="file" id="fileInput" onchange="handleFile(event)" />

export default function Home() {

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <button
        className="flex space-x-3 w-full"
        type="button"
        onClick={() => signIn("google", {
          callbackUrl: "/"
        })}
      >
        {/* <Google className="w-6 h-auto" /> */}
        <span>Login with Google</span>
      </button>

    </div>
  );
}
