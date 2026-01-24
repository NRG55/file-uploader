import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { getUserByUsername, getUserById } from '../db/queries.js';

const verifyCallback = async (username, password, done) => {   
    try {
        const user = await getUserByUsername(username);

        if (!user) {           
            return done(null, false, { message: "Incorrect username" });
        };
        
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        };

        return done(null, user);

    } catch (error) {
        return done(error);
    };
};

passport.use(new LocalStrategy(verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);

        done(null, user);

    } catch (error) {
        done(error);
    };
});

export default passport;