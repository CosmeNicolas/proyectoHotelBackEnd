import jwt from 'jsonwebtoken';
import 'dotenv/config';

const validarJWT = (req, res, next) =>{
    const token = req.header("x-token")
    if(!token) {
        return res.status(401).json({
            message: "No hay token en la peticion",
        });
    }
    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT);
        req.nombreCompleto = payload.nombreCompleto;
        req.email = payload.email;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error.message);
        if(error.name === "JsonWebTokenError"){
            return res.status(401).json({
                mensaje: 'token invalido',
            })
        } else if (error.name === "TokenExpiredError"){
            return res.status(401).json({
                mensaje: 'token expirado',
            })
        } else {
            return res.status(401).json({
                mensaje: 'error en autenticacion',
            })
        }
    }
}
export default validarJWT