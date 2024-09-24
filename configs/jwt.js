import jwt from "jsonwebtoken";

const creatToken = (id) => {
    try {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    } catch (error) {
        return null;
        
    }

};

const verifyToken = (token) => {
     try {
        return jwt.verify(token, process.env.JWT_SECRET);
     } catch (error) {
        return null;
        
     }
     
     
};

export { creatToken, verifyToken };