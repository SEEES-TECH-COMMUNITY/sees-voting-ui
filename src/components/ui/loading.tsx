import { Skeleton } from "./skeleton";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@src/components/ui/card";
import { cn } from "@src/utils/function/utils";

import { type FC } from "react";

const Loading: FC = () => {
    return (
        <Card className={cn("md:w-[380px] w-full")}>
            <CardHeader>
                <Skeleton className="h-200 w-full" />
                <CardTitle>
                    <Skeleton className="h-4 w-[250px]" />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-12 w-full" />
            </CardFooter>
        </Card>
    );
};

export default Loading;
