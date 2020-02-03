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
    
    // it('Gets the hackernews endpoint specifying the number of results', async (done) => {
    //     // Sends GET Request to /test endpoint
    //     const res = await request.get('/news/histoire?perPage=5')
    //     expect(res.status).toBe(401);
    //     // expect(res.body.hits.length).toBe(5);
    //     done()
    // });

    afterAll( async () =>{
        await User.deleteMany();
        await mongoose.connection.close()
    });
});