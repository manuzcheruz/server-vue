import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.should();

chai.use(chaiHttp);

/**
 * Grouped tests for the facts api, targeting a test db 
 */
describe('Cat Facts API', () => {

    /**
     * Test the GET method
     */
    describe('GET /cat/fromSource', () => {
        it('Should get all the cat facts', (done) => {
            chai.request(app)
                .get('/cat/fromSource')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(5);
                done();
            })
        })

        it('Should not get the cat facts', (done) => {
            chai.request(app)
                .get('/cat/fromSourcee')
                .end((err, res) => {
                    res.should.have.status(404);
                done();
            })
        })
    })

    /**
     * Testing the PUT method
     */
    describe('PUT /cat/facts/:id', () => {
        it('Should update a fact with given id', (done) => {
            const id = 1;
            const data = {
                text: 'this is testing the put method'
            };
            chai.request(app)
                .put('/cat/facts/' + id)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('string').eq('fact was successfully updated!');
                done();
            })
        })

        it('Should not update a fact', (done) => {
            const id = 100;
            chai.request(app)
                .put('/cat/facts/' + id)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('string').eq('fact with the given id does not exist!');
                done();
            })
        })
    })

    /**
     * Testing the delete method
     */
    describe('DELETE /cat/facts/:id', () => {
        it('Should delete a fact with given id', (done) => {
            const id = 1;
            chai.request(app)
                .delete('/cat/facts/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('string').eq('fact was successfully deleted!');
                done();
            })
        })

        it('Should not delete a fact', (done) => {
            const id = 100;
            chai.request(app)
                .delete('/cat/facts/' + id)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('string').eq('fact with the given id does not exist!');
                done();
            })
        })
    })
})
