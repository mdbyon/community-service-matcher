import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from '../../HomePage';
import {PieChart} from '../../PieChart';

configure({ adapter: new Adapter() });

describe('Home Page with no data' ,() =>{
    let wrapper;
    let props;
    var spy = sinon.spy();

    beforeEach(() => {
        props = {
            profile:{
                points : 0,
            },

            requests:{

                requestPreferences: spy,
                completedPreferences: false,
            }
        }
        wrapper = shallow(<HomePage {...props}/>);
      });

    it('should render a div', () =>{
        expect(wrapper.find('div.homeContainer').length).to.equal(1);
    })

    it('should not render a pie chart of points' ,() =>{
        expect(wrapper.find('PieChart').length).to.equal(0);
    })

    it('if no preferences prop, then redirect to preferences page' ,() => {
        expect(wrapper.find('Redirect.toPreferences').length).to.equal(1);
    })

})

describe('Home Page with data' , () =>{
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            profile:{
                points : 100,
            },

            requests:{
                completedPreferences: true,
            }
        }
         wrapper = shallow(<HomePage {...props}/>);
      });
    
    it('should render a pie chart of points' ,() =>{
        expect(wrapper.find('PieChart').length).to.equal(1);
    })

    it('should pass a prop to the pie chart on users point total', ()=>{
        expect(wrapper.find('PieChart').props().profile).to.equal(props.profile);
    })
    it('does not redirect' ,() => {
        expect(wrapper.find('Redirect.toPreferences').length).to.equal(0);
    })

})