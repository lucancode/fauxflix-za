import Header from "@/components/header";
import { Movie } from "@/types";
import requests from "./api/requests";
import Row from "@/components/nav_row";
import { useRecoilValue } from "recoil";
import { modalState } from "@/modalAtom";
import Popup from "@/components/popup";
import Head from "next/head";

// Alt+Shift+F to structure your code
export const getServerSideProps = async () => {
    // write the http request in an array so we don't have multiple awaits. Meaning an http response from the api will be returned once promise is returned for all api calls.
    const [fetchActionMovies, fetchComedyMovies, fetchHorrorMovies, fetchRomanceMovies, fetchDocumentaries] = await Promise.all([
      fetch(requests.pullActionMovies).then((res) => res.json()), //the response is formatted into json structure
      fetch(requests.pullComedyMovies).then((res) => res.json()),
      fetch(requests.pullHorrorMovies).then((res) => res.json()),
      fetch(requests.pullRomanceMovies).then((res) => res.json()),
      fetch(requests.pullDocumentaries).then((res) => res.json())
    ]);
  
    return {
      props: {
        // we want the results attributes from the api and keep them as props to pass the data throughout our project.
        fetchActionMovies: fetchActionMovies.results,
        fetchComedyMovies: fetchComedyMovies.results,
        fetchHorrorMovies: fetchHorrorMovies.results,
        fetchRomanceMovies: fetchRomanceMovies.results,
        fetchDocumentaries: fetchDocumentaries.results
      },
    };
  };
  
  interface Props {
    fetchActionMovies: Movie[];
    fetchComedyMovies: Movie[];
    fetchHorrorMovies: Movie[];
    fetchRomanceMovies: Movie[];
    fetchDocumentaries: Movie[];
  }

const movies = ({ fetchActionMovies, fetchComedyMovies, fetchHorrorMovies, fetchRomanceMovies, fetchDocumentaries }: Props) => {
    const showModal = useRecoilValue(modalState);
    return (
      <>
        <Head>
          <title>Fauxflix - ZA: Movies </title>
          <link rel="icon" href="" />
        </Head>
        <div className="p-10 mt-10 md:mt-10">
          <Header />
          <Row title="Action Movies" media={fetchActionMovies} />
          <Row title="Comedy Movies" media={fetchComedyMovies} />
          <Row title="Horror Movies" media={fetchHorrorMovies} />
          <Row title="Romance Movies" media={fetchRomanceMovies} />
          <Row title="Documentaries" media={fetchDocumentaries} />
          {showModal && <Popup />}
        </div>
      </>
    );
  
}

export default movies