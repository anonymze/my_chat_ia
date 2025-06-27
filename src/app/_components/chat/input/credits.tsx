import { getCreditsQuery } from "@/app/queries/credits-queries";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export const Credits = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["credits"],
    queryFn: getCreditsQuery,
  });

  return (
    <>
      {!isError && (
        <div className="w-fit justify-start bg-transparent md:w-auto md:px-2">
          {isLoading || !data ? (
            <>...</>
          ) : (
            <>
              {(data.data.total_credits - data.data.total_usage).toFixed(2)} $
            </>
          )}
        </div>
      )}
    </>
  );
};
