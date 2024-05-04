import { expect } from 'chai';
import request from 'supertest';
import app from '../../server.js'; // Assuming your server.js file exports the app

describe('Server Tests', () => {
  let server;

  before(() => {
    server = app.listen(0); // Start the server on a dynamic port (0) for testing
  });

  after(() => {
    server.close(); // Close the server after testing
  });

  it('should return status 200 for GET / with Error UR not authenticated', async () => {
    const res = await request(server).get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('Error', 'UR not authenticated');
  });

  it('should return status 200 and success message for POST /register', async () => {
    const res = await request(server)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
        profile_name: 'Test User',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('Status', 'Success');
  });

  it('should return status 200 and success message for POST /login', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        username: 'fresh2',
        password: '123',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('Status', 'Success');
  });

  it('should return status 200 for GET /', async () => {
    const res = await request(server)
      .post('/login')
      .send({
        username: 'fresh2',
        password: '123',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('Status', 'Success');
    res.get('/');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('Status', 'Success');
  });

  it('should return status 200 and success message for GET /logout', async () => {
    const res = await request(server).get('/logout');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('Status', 'Success');
  });

  it('should return status 200 and an array for POST /chord/findchord', async () => {
    const res = await request(server)
      .post('/chord/findchord')
      .send({
        chord_note: 'C',
        chord_tension: 'Major',
      });
    expect(res.status).to.equal(200);
    console.log(res.body)
    expect(res.body).to.be.an('array');
  });

  it('should return status 200 and an array for POST /scale/findscale', async () => {
    const res = await request(server)
      .post('/scale/findscale')
      .send({
        scale_note: 'C',
        scale_tension: 'Major',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return status 200 and an array for POST /eartrain/question', async () => {
    const res = await request(server)
      .post('/eartrain/question')
      .send({
        difficulty_name: 'Easy',
        category_name: 'Note',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return status 200 and an array for GET /eartrain/note', async () => {
    const res = await request(server).get('/eartrain/note');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return status 200 and an array for GET /eartrain/chord', async () => {
    const res = await request(server).get('/eartrain/chord');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return status 200 and an array for POST /quiz/question', async () => {
    const res = await request(server)
      .post('/quiz/question')
      .send({
        difficulty_name: 'Easy',
        category_name: 'Quiz',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return status 200 and success message for POST /user/score', async () => {
    const res = await request(server)
      .post('/user/score')
      .send({
        profile_name: 'Test User',
        difficulty_name: 'Easy',
        category_name: 'Quiz',
        score: 80,
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('Status', 'Success');
  });

  it('should return status 200 and an array for POST /user/getscore', async () => {
    const res = await request(server)
      .post('/user/getscore')
      .send({
        profile_name: 'Test User',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
