import Image from "next/image";
import Header from "../components/header";

const account = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="p-6 relative space-y-2 w-2/4">
          <img src="https://rb.gy/vltoq2" alt="GIF" className="relative top-0 left-0 m-auto"/>
          <h4 className="font-bold md:text-lg text-center">This Feature Is Not Available Yet.</h4>
          <p className="md:text-sm text-xs w-full text-center">
            I am diligently working on perfecting the final details. Thank you
            for your patience as I strive to ensure excellence in every aspect
            of this application. Stay tuned for the unveiling of the enhanced
            experience!
          </p>
        </div>
      </div>
    </>
  );
};

export default account;
