import React,{Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import actions from '../javascripts/actions/actions';
import constants from '../javascripts/constants/constants';
import LinkedInput from 'react-linked-input';
let result= null,_this;
const exp = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
class LinksObjPane extends React.Component {
	constructor(){
		super();
		_this=this;
	}
	updateChange(e){
		this.setState({
			linkValue:e.currentTarget.value
		})
	}
	handleCick(){
		if(this.state.linkValue && exp.test(this.state.linkValue)) {
			//this.props.dispatch(actions.addLink(this.state.linkValue))
			this.props.dispatch({url:constants.addLink.url,actionType:constants.addLink.actionType,requestType:constants.addLink.requestType,data:{linkValue:_this.state.linkValue}})
			this.refs['linkUrl'].value=null;
		}
		else {
			if(!this.state.linkValue) {
				window.alert('url is empty')
			}
			else {
				if(!exp.test(this.state.linkValue)) {
					window.alert('invalid url')
				}
			}
		}
	}
	openUserLink(){
		window.open(this.userLink)
	}
	handeDeleteLink(){
		_this.props.dispatch({url:constants.deleteLink.url,actionType:constants.deleteLink.actionType,requestType:constants.deleteLink.requestType,data:{id:this.id}})
	}
	render(){
		return(
			<div className="row">
				<div className="col-md-12 col-lg-12">
					<h1>Custom Urls</h1> 
				</div>
				<div className="col-md-12 col-lg-12">
					<div className="row">
						<h2 className="col-md-7 col-lg-7 ">Add your Favorite Urls here</h2>
						
					</div>
				</div>
				<div className="col-md-6 col-lg-6">
					<input type="text" className="form-control" placeholder="enter your url here..." onChange={this.updateChange.bind(this)} ref="linkUrl"/>
				</div>
				<div className="col-md-6 col-lg-6 col-sm-12">
					<button type="button" className="btn btn-success col-lg-4 col-md-4 col-sm-12 add-link-btn col-xs-12 form-group" onClick={this.handleCick.bind(this)} >Add Link</button>
				</div>
				<div className="col-md-12 col-lg-12">
					<ul className="url-list row">{this.props.linkList.length?this.props.linkList.map(function(userObj,index){
							return <li key={userObj.id} >
								<a href={userObj.userLink} target="_blank" >{userObj.encodeText}</a>
								<button className="btn btn-danger delete-btn btn-xs " onClick={_this.handeDeleteLink.bind(userObj)}>x</button>
						</li>
					}):<p className="col-md-12">No urls have been added</p>}</ul>
				</div>
			</div>

		)
	}
	componentDidMount(){
		this.props.dispatch({url:constants.getLinks.url,actionType:constants.getLinks.actionType,requestType:constants.getLinks.requestType})
	}
}
const matchStatetoProps= function(state){
	console.log(state)
	return {
		linkList:state
	}
}
const matchPropsToDispatch = function(dispatch){
	return {
		dispatch:(userObj)=>{
			actions.handleAjax(dispatch,userObj)
		}
	}
}
export default connect(matchStatetoProps,matchPropsToDispatch)(LinksObjPane);