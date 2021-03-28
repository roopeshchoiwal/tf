import infraJson from '../dummyData/questions';
import { should, expect, assert } from 'chai';

describe("SCENARIO: Model Creation", ()=>{
    Object.keys(infraJson).forEach((key)=>{
        it(`Should pass creation with dummy Data for ${key} : `, ()=>{
            let s = new infraJson[key].model(infraJson[key].right);
            let result = s.save();
            return result.then((doc)=> {
                doc.should.be.a('object');
            }).catch((err)=>{
                throw err;
            });
        });
    
    });
    
});