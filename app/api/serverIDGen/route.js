import { ServerIDConvert, ServerIDConvertToAddress } from '../../../lib/tools/serverIDGen';

export async function POST(req) {
  const { ip, port, gameServerID } = await req.json();

  if (ip && port) {
    const gameServerIDResult = ServerIDConvert(ip, port);
    return new Response(JSON.stringify({ gameServerID: gameServerIDResult.toString() }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else if (gameServerID) {
    const { ip: ipAddress, port: portNumber } = ServerIDConvertToAddress(BigInt(gameServerID));
    return new Response(JSON.stringify({ ip: ipAddress, port: portNumber }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ error: 'Invalid parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}