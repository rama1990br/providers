var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app.js');
var should = chai.should();

chai.use(chaiHttp);


describe('Providers', function() {
  it('should list ALL providers on /providers GET', function(done) {
  chai.request(server)
    .get('/providers')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;	
      res.body.should.be.a('array');
      res.body[0].should.have.property('provider_id');
      res.body[0].should.have.property('provider_name');
      res.body[0].should.have.property('provider_street_address');
      res.body[0].should.have.property('provider_city');
      res.body[0].should.have.property('provider_state');
      res.body[0].should.have.property('provider_zipcode');
      res.body[0].should.have.property('hospital_referral_region_description');
      res.body[0].should.have.property('total_discharges');
      res.body[0].should.have.property('average_covered_charges');
      res.body[0].should.have.property('average_total_payments');
      res.body[0].should.have.property('average_medicare_payments');
      done();
    });
  });

  it('should return 20 records by default', function(done) {
  chai.request(server)
    .get('/providers')
    .end(function(err, res){
      res.should.have.status(200);
      res.body.length.should.equal(20);
      done();
    });
  });

});
 