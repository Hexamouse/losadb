// app/api/heroes/route.js
import Mercenary from "@/data/Mercenary";

export async function GET() {
  try {
    // Check if Mercenary data is available
    if (!Mercenary || Mercenary.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No mercenaries found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response(JSON.stringify(Mercenary), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching mercenaries:', error);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
