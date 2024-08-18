const db = require('../../db-config')
const request = require('supertest')
const server = require('../server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('[GET] "/"', () => {
    test('responds with 200 status code',  async () => {
        const response = await request(server).get('/api/schemes')
        expect(response.status).toBe(200)
    })
    test('responds with all the schemes',  async () => {
        const response = await request(server).get('/api/schemes')
        expect(response.body).toHaveLength(7)
    })
})
describe('[GET] "/:scheme_id"', () => {
    test('responds with 200 status code',  async () => {
        const response = await request(server).get('/api/schemes/1')
        expect(response.status).toBe(200)
    })
    test('responds with proper object',  async () => {
        const scheme = {
            scheme_id: 1,
            scheme_name: "World Domination",
            steps: [
                {
                    instructions: "solve prime number theory",
                    step_id: 2,
                    step_number: 1
                },
                {
                    instructions: "crack cyber security",
                    step_id: 1,
                    step_number: 2
                },
                {
                    instructions: "blackmail world leaders",
                    step_id: 3,
                    step_number: 3
                }
            ]
        }
        const response = await request(server).get('/api/schemes/1')
        expect(response.body).toMatchObject(scheme)
    })
})
describe('[GET] "/:scheme_id/steps"', () => {
    test('responds with 200 status code',  async () => {
        const response = await request(server).get('/api/schemes/1/steps')
        expect(response.status).toBe(200)
    })
    test('responds with correct number of steps',  async () => {
        const response = await request(server).get('/api/schemes/1/steps')
        expect(response.body).toHaveLength(3)
    })
})
describe('[POST] "/"', () => {
    test('responds with 201 status code',  async () => {
        const scheme = {scheme_name: 'mylife'}
        const response = await request(server).post('/api/schemes').send(scheme)
        expect(response.status).toBe(201)
    })
    test('inserts new scheme',  async () => {
        const scheme = {scheme_name: 'mylife'}
        const response = await request(server).post('/api/schemes').send(scheme)
        expect(response.body).toMatchObject({scheme_id: 8})
    })
})
describe('[POST] "/:scheme_id/steps"', () => {
    test('responds with 201 status code',  async () => {
        const step = {instructions: 'live life', step_number:4}
        const response = await request(server).post('/api/schemes/1/steps').send(step)
        expect(response.status).toBe(201)
    })
    test('inserts new step to scheme',  async () => {
        const step = {instructions: 'live life', step_number:4}
        const response = await request(server).post('/api/schemes/1/steps').send(step)
        expect(response.body).toHaveLength(4)
    })
})