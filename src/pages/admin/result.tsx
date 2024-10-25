import { useRouter } from "next/router";
import React from "react";

import { useGetResultMutation } from "@src/utils/services/ApiConnection";
import Loading from "@src/components/ui/loading";
import ResultCard from "@src/components/ui/resultcard";
import { NextPage } from "next";


const Home: NextPage<
  {
    security_key?: string;
  }
> = ({ security_key }) => {
  const { push } = useRouter();
  const [getResults, { data, isLoading }] = useGetResultMutation();
  React.useEffect(() => {
    if (!security_key) return;
    if (security_key === process.env.NEXT_PUBLIC_SECURITY_KEY) {
      getResults(undefined);
    } else {
      push("/login");
    }
  }, [security_key]);
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 space-y-4`}
    >
      <div className="grid md:grid-cols-3 grid-cols-1 justify-between gap-8 w-full pt-4">
        {isLoading
          ? [1, 2, 4, 5, 7, 8].map((val, i) => (
            <Loading key={`${val}-val-${i}-${val}`} />
          ))
          : data?.map((candidate) => (
            <ResultCard candidate={candidate} key={candidate.id} />
          ))}
      </div>
    </div>
  );
};
Home.getInitialProps = (ctx) => {
  const { query } = ctx;
  if (!query.security_key) {
    return {};
  }
  return Promise.resolve({
    security_key: query.security_key,
  });
};
export default Home;
