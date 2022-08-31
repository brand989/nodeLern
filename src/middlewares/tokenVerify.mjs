import express from "express"
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log('err token', err)
                return res
                    .status(401)
                    .json({
                        error: true,
                        message: "Unauthorized access"
                    });
            }

            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).json({
            error: true,
            message: "No token provided"
        });
    }
};