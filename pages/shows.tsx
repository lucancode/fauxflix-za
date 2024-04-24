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
  const [fetchAiringToday, fetchRatedTV, fetchPopularTV] = await Promise.all([
    fetch(requests.pullAiringToday).then((res) => res.json()), //the response is formatted into json structure
    fetch(requests.pullRatedTV).then((res) => res.json()),
    fetch(requests.pullPopularTV).then((res) => res.json()),
  ]);

  return {
    props: {
      // we want the results attributes from the api and keep them as props to pass the data throughout our project.
      fetchAiringToday: fetchAiringToday.results,
      fetchRatedTV: fetchRatedTV.results,
      fetchPopularTV: fetchPopularTV.results,
    },
  };
};

interface Props {
  fetchAiringToday: Movie[];
  fetchRatedTV: Movie[];
  fetchPopularTV: Movie[];
}

const tvShows = ({ fetchAiringToday, fetchRatedTV, fetchPopularTV }: Props) => {
  const showModal = useRecoilValue(modalState);
  return (
    <>
      <Head>
        <title>Fauxflix - ZA: TV Shows & Series </title>
        <link rel="icon" href="" />
      </Head>
      <div className="p-10 mt-10 md:mt-10">
        <Header />
        <Row title="Airing Today" media={fetchAiringToday} />
        <Row title="Popular Shows" media={fetchPopularTV} />
        <Row title="Top Rated TV" media={fetchRatedTV} />
        {showModal && <Popup />}
      </div>
    </>
  );
};

export default tvShows;
