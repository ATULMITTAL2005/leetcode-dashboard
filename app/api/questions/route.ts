export default function GET() {
  return new Response(
    JSON.stringify({
      message: "Hello, this is a GET request response from the API route.",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
