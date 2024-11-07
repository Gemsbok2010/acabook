export default function authHeader() {
  const user = localStorage.getItem("userId");
  localStorage.getItem("username");

  if (user && user.accessToken) {
    return { "x-auth-token": user.accessToken };
  } else {
    return {};
  }
}
