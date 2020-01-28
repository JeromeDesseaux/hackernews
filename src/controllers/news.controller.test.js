import app  from '../app';
import supertest from "supertest";

const request = supertest(app)

it('Gets the hackernews endpoint defaults to 25 results', async done => {
    // Sends GET Request to /test endpoint
    const res = await request.get('/news/histoire')
    expect(res.status).toBe(200);
    expect(res.body.hits.length).toBe(25);
    done()
});

it('Gets the hackernews endpoint specifying the number of results', async done => {
    // Sends GET Request to /test endpoint
    const res = await request.get('/news/histoire?perPage=5')
    expect(res.status).toBe(200);
    expect(res.body.hits.length).toBe(5);
    done()
});