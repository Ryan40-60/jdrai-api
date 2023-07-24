import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../database/models/user.model.js";
import dbService from "../services/db.service.js";
import envConfig from "./env.config.js";

// Options for the JWT strategy
const jwtOptions = {
  secretOrKey: envConfig.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT verification function
const jwtVerify = async (payload, done) => {
  try {
    // Retrieve the user from the database
    const user = await dbService.findOne(User, {
      id: payload.sub,
    });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
};

// Initialize the JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
