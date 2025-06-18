import { useState } from "react";

export default function List() {
  const [nameList, setNameList] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  const appendName = () => {
    // const trimmedName = name.trim();

    // if (trimmedName === "") return; // prevent empty input
    // if (nameList.includes(trimmedName)) return; // prevent duplicates

    // setNameList([...nameList, trimmedName]);
    // setName("");

    if (nameList.includes(name)) {
      setName("");
      return;
    }
    setNameList([...nameList, name]);
    setName("");
  };
  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
        className="border rounded-md p-3"
        placeholder="Enter your name"
      />
      <button
        onClick={() => appendName()}
        className="border rounded-md bg-red-500 p-3 px-5 cursor-pointer"
      >
        add
      </button>

      <div className="border p-3">
        <h1>Name List</h1>
        <div>
          {nameList.map((name, i) => (
            <p className="flex gap-2" key={i}>
              <span>{i + 1}</span>
              <span>{name}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
