import { type FC } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@src/components/ui/card";
import { ICandidate, useVoteCandidateMutation } from "@src/utils/services/ApiConnection";
import { cn } from "@src/utils/function/utils";
import Image from "next/image";
import Button from "./button";
import { useToast } from "./use-toast";

const VoteCard: FC<{
    candidate: ICandidate;
}> = ({ candidate }) => {
    const [voteCandidate, { data }] = useVoteCandidateMutation()
    console.log(data)
    const toast = useToast()
    const handleVote = async () => {
        try {
            const data = await voteCandidate(candidate.id).unwrap()
            toast.toast({
                title: "Success",
                description: "You have successfully voted",
                variant: "default",
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.toast({
                title: "Error",
                description: error?.data?.message || "An error occurred",
                variant: "destructive",
            })
        }
    }
    return (
        <Card key={candidate.id} className={cn("md:w-[380px] w-full")}>
            <CardHeader>
                <Image
                    src={candidate.image}
                    alt={candidate.full_name}
                    width={500}
                    height={500}
                    className="w-full h-auto"
                />
                <CardTitle>{candidate.full_name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <CardDescription>Manifesto: {candidate.manifesto}</CardDescription>
                <CardDescription className="capitalize">
                    Position: {candidate.position.replace("_", " ")}
                </CardDescription>
                <CardDescription>Level: {candidate.level}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleVote}>Vote</Button>
            </CardFooter>
        </Card>
    );
};

export default VoteCard;