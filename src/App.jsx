import { useState, useRef, useCallback } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const letters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characters = letters;

    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length
      );
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  }, [length, includeNumbers, includeSymbols]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  }, [password]);

  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Password Generator
        </h1>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full p-2 border rounded mb-2"
          />

          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Length Slider */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Length: {length}
          </label>

          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Options */}
        <div className="mb-4">
          <label
            htmlFor="includeNumbers"
            className="block mb-2"
          >
            <input
              type="checkbox"
              id="includeNumbers"
              checked={includeNumbers}
              onChange={(e) =>
                setIncludeNumbers(e.target.checked)
              }
              className="mr-2"
            />
            Include Numbers
          </label>

          <label
            htmlFor="includeSymbols"
            className="block"
          >
            <input
              type="checkbox"
              id="includeSymbols"
              checked={includeSymbols}
              onChange={(e) =>
                setIncludeSymbols(e.target.checked)
              }
              className="mr-2"
            />
            Include Symbols
          </label>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={generatePassword}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;