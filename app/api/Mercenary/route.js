// app/api/heroes/route.js
import Mercenary from "@/data/Mercenary";

export async function GET() {
  return new Response(JSON.stringify(Mercenary), {
    headers: { 'Content-Type': 'application/json' },
  });
}     