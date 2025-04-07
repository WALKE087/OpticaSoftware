import jwt from "jsonwebtoken";

const JWT_SECRET = import.meta.env.JWT_SECRET;

const parseCookies = (cookieString: string) => {
  return cookieString.split(";").reduce((acc: any, cookie: string) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {});
};

export async function protectRoute(Astro: any, requiredRole?: string) {
  const cookieHeader = Astro.request.headers.get("Cookie");
  let token = null;

  if (cookieHeader) {
    const cookies = parseCookies(cookieHeader);
    token = cookies["token"];
  }

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      rol_id: string;
    };

    if (requiredRole && decoded.rol_id !== requiredRole) {
      return null;
    }
    return { userId: decoded.id, role: decoded.rol_id };
  } catch (error) {
    console.error("Token no válido:", error);
    return null;
  }
}
