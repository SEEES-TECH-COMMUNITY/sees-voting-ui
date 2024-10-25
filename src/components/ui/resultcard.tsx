import { type FC } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@src/components/ui/card";
import {  IResults } from "@src/utils/services/ApiConnection";
import { cn } from "@src/utils/function/utils";
import Image from "next/image";

const ResultCard: FC<{
    candidate: IResults;
}> = ({ candidate }) => {
    return (
        <Card key={candidate.id} className={cn(" w-full")}>
            <CardHeader>
                <Image
                    src={candidate.image}
                    alt={candidate.full_name}
                    width={750}
                    height={1000}
                    className="w-full h-auto aspect-square object-contain"
                />
                <CardTitle>{candidate.full_name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <CardDescription className="capitalize">
                    Position: {candidate.position.replaceAll("_", " ")}
                </CardDescription>
                <CardDescription>Level: {candidate.level}</CardDescription>
                <CardDescription>Votes: {candidate.voteCount}</CardDescription>
            </CardContent>
        </Card>
    );
};

export default ResultCard;
