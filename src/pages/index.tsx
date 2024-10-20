import { Input } from "@src/components/ui/input";
import Loading from "@src/components/ui/loading";
import VoteCard from "@src/components/ui/votecard";
import { useGetAllCandidatesQuery } from "@src/utils/services/ApiConnection";
import { useEffect, useMemo } from "react";

import { useDebounceValue } from "usehooks-ts";

export default function Home() {
    const { data, isSuccess, isLoading } = useGetAllCandidatesQuery(undefined);

    const [search, setSearch] = useDebounceValue("", 500);
    const filteredData = useMemo(
        () =>
            data?.filter(
                (candidate) =>
                    candidate.full_name.toLowerCase().includes(search.toLowerCase()) ||
                    candidate.position.toLowerCase().includes(search.toLowerCase()) ||
                    candidate.level.toLowerCase().includes(search.toLowerCase())
            ),
        [data, search]
    );

    return (
        <main className="flex min-h-screen flex-col bg-primary-375/10 p-6 space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight text-secondary sm:text-[5rem] text-center py-2">
                SEEES <span className="text-primary">ELECTION</span> 2022/2023
            </h1>
            <div>
                <Input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search For nominee"
                    className="w-full"
                />
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 justify-between gap-8 w-full pt-4">
                {isLoading
                    ? [1, 2, 4, 5, 7, 8].map((val, i) => (
                        <Loading key={`${val}-val-${i}-${val}`} />
                    ))
                    : (filteredData?.length ?? 0) > 0
                        ? filteredData?.map((candidate) => (
                            <VoteCard candidate={candidate} key={candidate.id} />
                        ))
                        : null}
            </div>
            {data && !isLoading && isSuccess && (filteredData?.length ?? 0) < 1 && (
                <p className="text-center font-medium w-full">No Candidates Found</p>
            )}
        </main>
    );
}
