// import Student from "./student";
// import Counter from "../components/Counter";

import Alert from "@/components/Alert";
// import List from "../components/List";

export default function Home() {
  return (
    <>
      {/* <Student name="def" /> */}
      {/* <Counter /> */}
      {/* <List /> */}
      <div className="mt-20">
        <Alert message="This is a success alert!" type="success" />
        <Alert message="This is a danger alert!" type="danger" />
      </div>
    </>
  );
}
