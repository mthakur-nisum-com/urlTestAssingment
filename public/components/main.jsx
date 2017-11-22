import React,{Component} from 'react';
import {render} from 'react-dom';
import LinksObjPane from './LinksObjPane.jsx';
import styles from '../stylesheets/main.css';
import reducer from '../javascripts/reducer/reducer';
import { Provider,connect } from 'react-redux';
import { createStore  } from 'redux';
const store=createStore(reducer);
class MainComponent extends React.Component {
	render(){
		return(
			<div className="col-md-12">
				<div className="row">
					<div className="col-md-12 col-sm-12">
						<LinksObjPane/>
					</div>
				</div>
			</div>
		)
	}
}
module.exports={
	renderComponent:function(element){
		render(<Provider store={store}><MainComponent/></Provider>,document.getElementById(element))
	}
}
