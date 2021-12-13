import { expect } from 'chai'
import request from 'supertest'
import { app, server } from '../index.js'

const api = request(app)
describe('Characters of World Disney', () => {
  /* it('GET all /character', async () => {
    const res = await request(app).get('/api/v1/character')
    console.log(res.body, res.statusCode)
    expect(res.statusCode).equal(200)
    // expect(res.body).toHaveProperty('character')
  }) */
  it('POST one /character', async () => {
    const res = await api.post('/api/v1/character').send({
      image: 'no tiene imagen',
      name: 'Jack',
      dateBirth: '2020-11-19T00:00:00.000Z',
      weigth: 90.1,
      history: 'From Australia'
    })
    const { character } = res.body
    expect(res.statusCode).equal(201)
    /*  expect(character.name).to.be.equal('Jack')
    expect(character.dateBirth).equal('2020-11-19T00:00:00.000Z')
    expect(character.weigth).equal(90.1) */
  })
  it('PUT one /character/:id', () => {})
  it('GET one /character/:id', () => {})
  it('DELETE one /character/:id', () => {})
})
