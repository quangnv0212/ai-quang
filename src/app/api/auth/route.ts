export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = body.accessToken as string;
  const expireInSeconds = body.expireInSeconds as string;
  const encryptedAccessToken = body.encryptedAccessToken as string;
  if (!accessToken || !encryptedAccessToken) {
    return Response.json(
      { message: "Access Token is not found" },
      {
        status: 400,
      }
    );
  }
  const expiresDate = new Date();
  return Response.json(body, {
    status: 200,
    headers: {
      "Set-Cookie": `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
    },
  });
}
