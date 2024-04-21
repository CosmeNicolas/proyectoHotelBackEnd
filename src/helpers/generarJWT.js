import jwt from "jsonwebtoken";
import "dotenv/config";

const generarJWT = async (nombreCompleto, email) => {
  try {
    const payload = { nombreCompleto, email };
    const token = await jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    console.error("Error al generar token:", error.message);
    throw new Error("No se pudo generar");
  }
};
export default generarJWT;
