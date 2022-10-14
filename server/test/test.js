process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHTTP = require("chai-http");
const server = require("../index");

chai.use(chaiHTTP);


describe("API test", () => {

    it("Test get all the csv data", (done) => {

        chai.request(server)
            .get("/files/data")
            .end((err, res) => {


                res.should.have.status(200);
                res.body.should.be.a('array');
                done();

            });

    });


    it("Test get all the csv files", (done) => {

        chai.request(server)
            .get("/files/list")
            .end((err, res) => {


                res.should.have.status(200);
                res.body.should.be.a('object');

                done();

            });

    });


})
