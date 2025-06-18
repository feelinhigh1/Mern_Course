// import Student from "./student";
// import Counter from "../components/Counter";

// import Alert from "@/components/Alert";
import Modal from "@/components/Modal";

// import List from "../components/List";

export default function Home() {
  return (
    <>
      {/* <Student name="def" /> */}
      {/* <Counter /> */}
      {/* <List /> */}
      {/* <div className="mt-20">
        <Alert message="This is a success alert!" type="success" />
        <Alert message="This is a danger alert!" type="danger" />
      </div> */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Modal
          title="Hello from the Modal!"
          content="This modal manages its own open/close state internally."
        />
      </div>
    </>
  );
}
