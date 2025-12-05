import React, { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";

const Generator = () => {
  const [password, setPassword] = useState("MySecret123!");
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  // Generate password
  const createPassword = () => {
    let chars = "";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) return; // prevent empty password

    let newPass = "";
    for (let i = 0; i < length; i++) {
      newPass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(newPass);
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine password strength
  const getStrength = (pwd) => {
    let strength = 0;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    if (pwd.length < 8 || strength <= 1) return "Weak";
    if (pwd.length < 12 || strength === 2) return "Medium";
    return "Strong";
  };

  const strength = getStrength(password);

  const bgColor = strength === "Weak" ? "bg-red-100" : strength === "Medium" ? "bg-yellow-100" : "bg-green-100";
  const borderColor = strength === "Weak" ? "border-red-500" : strength === "Medium" ? "border-yellow-400" : "border-green-500";

  return (
    <div className={`flex flex-col pt-10 justify-center items-center min-h-screen `}>
      <div className={`text-center border border-solid rounded-xl p-6 w-[400px] bg-white shadow-lg ${borderColor}`}>
        <h3 className="text-2xl font-bold mb-5">PASSWORD GENERATOR</h3>

        {/* Password Display */}
        <div className="border py-3 px-4 flex justify-between items-center rounded mb-5 bg-gray-50">
          <p className="text-lg break-words">{password}</p>
          <div className="flex gap-3">
            <Copy
              size={20}
              className="cursor-pointer hover:scale-110 hover:text-blue-500 transition-transform"
              onClick={handleCopy}
            />
            <RefreshCw
              size={20}
              className="cursor-pointer hover:scale-110 hover:text-green-500 transition-transform"
              onClick={createPassword}
            />
          </div>
        </div>
        {copied && <p className="text-green-500 mb-3">Copied!</p>}

        {/* Strength Meter */}
        <div className="mb-5">
          <p className="font-semibold mb-1">Strength: {strength}</p>
          <div className="w-full h-2 bg-gray-300 rounded">
            <div
              className={`h-2 rounded ${
                strength === "Weak" ? "bg-red-500" : strength === "Medium" ? "bg-yellow-400" : "bg-green-500"
              }`}
              style={{
                width: strength === "Weak" ? "33%" : strength === "Medium" ? "66%" : "100%",
              }}
            ></div>
          </div>
        </div>

        {/* Password Length Slider */}
        <div className="mb-5">
          <label className="block mb-1 font-semibold">Password Length: {length}</label>
          <input
            type="range"
            min="6"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
              className="accent-blue-500"
            />
            Uppercase
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
              className="accent-blue-500"
            />
            Lowercase
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
              className="accent-blue-500"
            />
            Numbers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
              className="accent-blue-500"
            />
            Symbols
          </label>
        </div>
      </div>
    </div>
  );
};

export default Generator;
