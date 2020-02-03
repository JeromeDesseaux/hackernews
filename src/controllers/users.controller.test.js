import app  from '../app';
import supertest from "supertest";
import mongoose from "mongoose";
import User from "../models/user";

const request = supertest(app);

describe("User registration", () => {
    it('Should register correctly and return token', async (done) => {
        const res = await request.post('/users/register').send({
            username: "johntest",
            password: "password"
        });
        expect(res.status).toBe(201);
        expect(res.body.user).toBeDefined();
        expect(res.body.token).toBeDefined();
        done()
    });

    it('Should return an error for existing user', async (done) => {
        const res = await request.post('/users/register').send({
            username: "johntest",
            password: "password"
        });
        expect(res.status).toBe(500);
        done()
    });

    it('Should return token on login', async (done) => {
        const res = await request.post('/users/login').send({
            username: "johntest",
            password: "password"
        });
        expect(res.status).toBe(201);
        expect(res.body.user).toBeDefined();
        expect(res.body.token).toBeDefined();
        done()
    });

    it('Should return error on wrong credentials login', async (done) => {
        var res = await request.post('/users/login').send({
            username: "johntestt",
            password: "password"
        });
        expect(res.status).toBe(401);
        var res = await request.post('/users/login').send({
            username: "johntest",
            password: "passwordd"
        });
        expect(res.status).toBe(401);
        var res = await request.post('/users/login').send({
            username: "johntestt",
            password: "passwordd"
        });
        expect(res.status).toBe(401);
        done()
    });

    afterAll( async () =>{
        await User.deleteMany();
        await mongoose.connection.close()
    });
});