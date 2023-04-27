const BASE_URL = ENV['base_url'];

export async function GET(request: Request) {
  return new Response('Hello, Next.js!');
}
