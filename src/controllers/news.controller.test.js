import app  from '../app';
import supertest from "supertest";
import User from "../models/user";
import mongoose from "mongoose";

const request = supertest(app);
let token = "";

describe("Getting hackernews feed", () => {
    beforeAll(async () => {
        const res = await request.post('/users/register').send({
            username: "user",
            password: "password"
        });
        token = res.body.token;
    });


    it('Gets the hackernews endpoint defaults to 25 results without login', async (done) => {
        // Sends GET Request to /test endpoint
        const res = await request.get('/news/histoire');
        expect(res.status).toBe(401);
        done()
    });
    
    it('Gets the hackernews endpoint specifying the number of results without login', async (done) => {
        // Sends GET Request to /test endpoint
        const res = await request.get('/news/histoire?perPage=5')
        expect(res.status).toBe(401);
        done()
    });
    
    it('Gets the hackernews endpoint specifying the number of results after login', async (done) => {
        // Sends GET Request to /test endpoint
        const res = await request.get('/news/histoire?perPage=5').set("authorization", "Bearer " + token);
        expect(res.status).toBe(200);
        expect(res.body.hits.length).toBe(5);
        done()
    });

    it('Gets the hackernews endpoint defaults to 25 results after login', async (done) => {
        // Sends GET Request to /test endpoint
        const res = await request.get('/news/histoire').set("authorization", "Bearer " + token);
        expect(res.status).toBe(200);
        expect(res.body.hits.length).toBe(25);
        done()
    });

    afterAll( async () =>{
        await User.deleteMAny();
        await mongoose.connection.close()
    });
});