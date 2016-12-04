
const chai = require('chai');
let expect = chai.expect;

describe('Test Enviroment',()=>{
    it('Expect to pass', ()=>{
        expect(1).to.equal(1);
    });

    it('expect to fail',()=>{
        expect(1).to.not.equal(2);
    });
})