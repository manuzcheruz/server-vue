import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

//Assertion style
chai.should();

chai.use(chaiHttp);

describe('Cat Facts API', () => {

    /**
     * Test the GET route
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
})
