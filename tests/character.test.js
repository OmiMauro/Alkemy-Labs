import { expect } from 'chai'
import request from 'supertest'
import { initServer } from '../index.js'

describe('Characters of World Disney', () => {
  it('GET all /character', async done => {
    const response = await request(initServer).get('/api/v1/character')
    console.log(response.body)
    expect(response.status).equal(200)
    done()
  })
  it('POST one /character', async done => {
    const response = await request(initServer)
      .post('/api/v1/character')
      .send({
        image: 'no tiene imagen',
        name: 'Jack',
        dateBirth: '2020-11-19T00:00:00.000Z',
        weigth: 90.1,
        history: 'From Australia'
      })
    const { character } = response.body
    expect(response.status).to.be.equal(201)
    expect(character.name).to.be.equal('Jack')
    expect(character.dateBirth).equal('2020-11-19T00:00:00.000Z')
    expect(character.weigth).equal(90.1)
    done()
  })
  it('PUT one /character/:id', () => {})
  it('GET one /character/:id', () => {})
  it('DELETE one /character/:id', () => {})
})
