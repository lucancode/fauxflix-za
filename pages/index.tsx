import { Inter } from "next/font/google";
import Header from "@/components/header";
import Banner from "@/components/banner";
import { Movie } from "@/types";
import requests from "./api/requests";
import Row from "@/components/row";
import { useRecoilValue } from "recoil";
import { modalState } from "@/modalAtom";
import Popup from "@/components/popup";
import Head from "next/head";

// Alt+Shift+F to structure your code
export const getServerSideProps = async () => {
  // write the http request in an array so we don't have multiple awaits. Meaning an http response from the api will be returned once promise is returned for all api calls.
  const [fetchUpcoming, fetchPopular, fetchRated, fetchTrending] =
    await Promise.all([
      fetch(requests.pullUpcoming).then((res) => res.json()), //the response is formatted into json structure
      fetch(requests.pullPopular).then((res) => res.json()),
      fetch(requests.pullRated).then((res) => res.json()),
      fetch(requests.pullTrending).then((res) => res.json()),
    ]);

  return {
    props: {
      // we want the results attributes from the api and keep them as props to pass the data throughout our project.
      fetchUpcoming: fetchUpcoming.results,
      fetchPopular: fetchPopular.results,
      fetchRated: fetchRated.results,
      fetchTrending: fetchTrending.results,
    },
  };
};

const inter = Inter({ subsets: ["latin"] });
// use state mngmt to bypass prop drilling when previewing movies

interface Props {
  fetchUpcoming: Movie[];
  fetchPopular: Movie[];
  fetchRated: Movie[];
  fetchTrending: Movie[];
}

export default function Home({
  fetchUpcoming,
  fetchPopular,
  fetchRated,
  fetchTrending,
}: Props) {
  const showModal = useRecoilValue(modalState);
  return (
    <div className="p-10 lg:space-y-18 lg:pl-9">
      <Head>
        <title>Fauxflix - ZA: Watch Movie & TV Series Clips</title>
        <link rel="icon" href="" />
      </Head>
      {/** server-side rendering is only on the pages file (not allowed on components) */}
      <Header />
      <Banner fetchUpcoming={fetchUpcoming} />
      <Row title="Popular" media={fetchPopular} />
      <Row title="Top Rated" media={fetchRated} />
      <Row title="Trending" media={fetchTrending} />
      {showModal && <Popup />}
    </div>
  );
}
