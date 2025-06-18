import { useState } from "react";

interface Props {
  name?: string;
}

export default function Student(props: Props) {
  const [boolean, setBoolean] = useState(false);

  return (
    <div>
      <p>{`The current value is: ${boolean}`}</p>
      <button onClick={() => setBoolean(!boolean)}>Click to change</button>
      <p>{`${props.name}`}</p>
    </div>
  );
}
