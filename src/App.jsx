import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // REF HOOK
  const passwordRef = useRef(null);

  // CALLBACK HOOK
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%&*_-+=/|?€<>~";
    }

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPassToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGen();
  }, [length, numberAllowed, characterAllowed, passwordGen]);

  return (
    <div className="w-full max-w-lg mx-auto shadow-lg rounded-lg px-6 py-5 my-10 bg-gray-900 text-lime-50">
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-5">
        Password Generator
      </h1>
      <div className="flex items-center shadow-md rounded-lg overflow-hidden mb-6 bg-gray-800">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-4 text-gray-900 text-lg"
          placeholder="Generated password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassToClipBoard}
          className="text-yellow-400 hover:text-white border-l border-yellow-400 hover:bg-yellow-500 font-medium rounded-none px-4 py-2 transition-colors"
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col gap-4 text-sm">
        <div className="flex items-center justify-between">
          <label className="text-white font-semibold">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer w-1/2"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="numberInput" className="text-white font-semibold">
            Include Numbers
          </label>
          <input
            type="checkbox"
            id="numberInput"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="cursor-pointer transform scale-125"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="characterInput" className="text-white font-semibold">
            Include Special Characters
          </label>
          <input
            type="checkbox"
            id="characterInput"
            defaultChecked={characterAllowed}
            onChange={() => setCharacterAllowed((prev) => !prev)}
            className="cursor-pointer transform scale-125"
          />
        </div>
      </div>
      <button
        onClick={passwordGen}
        className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded-md transition-all"
      >
        Generate New Password
      </button>
    </div>
  );
}

export default App;
