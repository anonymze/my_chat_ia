import type { QueryKey } from "@tanstack/react-query";

export async function getCreditsQuery({ queryKey }: { queryKey: QueryKey }) {
  const response = await fetch("/api/credits", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch credits");
  }

  const data = (await response.json()) as {
    data: {
      total_credits: number;
      total_usage: number;
    };
  };

  return data;
}
