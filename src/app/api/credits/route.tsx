export async function GET() {
  const response = await fetch("https://openrouter.ai/api/v1/credits", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
  });

  if (!response.ok) {
    return new Response("Failed to fetch credits", { status: 500 });
  }

  const data = (await response.json()) as {
    data: {
      total_credits: number;
      total_usage: number;
    };
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
