import {Component} from 'react';
import firebase from 'firebase';
import {firebaseDb} from '../utils/firebase/firebase';
import _ from 'lodash';

const RestaurantCard = ({name,onPing,onSubscribe,onUnsubscribe,subscriptionKey,icon}) => (
	<div className="col-sm-12 col-md-4 col-lg-3">
		<div className="panel panel-default">
			<div className="panel-body">
				<div className="row">
					<div className="col-sm-6">
						<h4>{name}</h4>
					</div>
					<div className="col-sm-6 text-center">
						<img src={icon != null ? icon : ""} style={{height:50, width: 100}} className="img-thumbnail"/>
					</div>
				</div>
				<div className="row" style={{marginTop: 5}}>
					<div className="col-sm-12 col-md-6">
	    				<button className="btn btn-block btn-success" onClick={onPing}>Ping!</button>
					</div>
					<div className="col-sm-12 col-md-6">
	    				{subscriptionKey ? 
	    					<button className="btn btn-block btn-danger" onClick={onUnsubscribe}>Unsubscribe</button>:
	    					<button className="btn btn-block btn-primary" onClick={onSubscribe}>Subscribe</button>
	    				}
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default class RestaurantsGrid extends Component {
	constructor(){
		super();
		this.state = {
			searchTerm : null,
			restaurants: []
		}
	}
	componentDidMount(){
		this.firebasePingsRef = firebaseDb.ref("pings");
		this.firebaseRef = firebaseDb.ref("restaurants");
		this.subscriptionsRef = firebaseDb.ref("users/" + this.props.userId + "/subscriptions");
		this.firebaseRef.once("value", (data) => {
			let restData = _.filter(data.val(), (value) => value !== undefined);
			this.subscriptionsRef.on("value", (subData) => {
				let subs = subData.val();
				if(subs !== null){
					restData = restData.map((rest) => {
						let currentSub = _.find(subs,(sub,index) => {
							sub.uniqueId = index;
							return sub.key === rest.key
						});
						if(currentSub){
							rest.subscriptionKey = currentSub.uniqueId;
						}
						else{
							rest.subscriptionKey = null;
						}
						return rest;
					});
				}
				else{
					restData = restData.map((rest) => {
						rest.subscriptionKey = null;
						return rest;
					});
				}
				this.setState({
					restaurants: restData
				});
			});
			
		});
	}
	onSearchChange(){
		this.setState({
			searchTerm: this.searchInput.value.toLowerCase()
		});
	}
	onSubscribe(key){
		let newSubKey = this.subscriptionsRef.push().key;
		let updates = {};
		updates[newSubKey] = {key: key};
		this.subscriptionsRef.once("value",(data) => {
			let subs = data.val();
			if(data.val() !== null){
				let subsArray = _.filter(subs, (value) => value !== undefined);
				let isExist = _.find(subsArray, (value) => value.key === key);
				if(!isExist){
					this.subscriptionsRef.update(updates);
				}
			}
			else{
				this.subscriptionsRef.update(updates);
			}
		});
	}
	onUnsubscribe(subscriptionKey){
		this.subscriptionsRef.child(subscriptionKey).remove();
	}
	onPing(restName,restKey){
		let newPingKey = this.firebasePingsRef.push().key;
		let updates = {};
		updates[newPingKey] = {
			text: this.props.userName + " pinged " + restName + " is here!",
			time: firebase.database.ServerValue.TIMESTAMP,
			restKey: restKey,
			icon: this.props.userPhoto != null ? this.props.userPhoto : "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"
		};
		this.firebasePingsRef.update(updates);
		alert("Ping sent!")
	}
  	render() {
		let filteredRests = this.state.restaurants;

  		if(this.state.searchTerm){
			filteredRests = _.filter(this.state.restaurants, (x) => x.name.toLowerCase().indexOf(this.state.searchTerm) > -1);
  		}

	    return (
    		<div className="panel panel-default">
    			<div className="panel-body">
    				<div className="form-horizontal">
    					<div className="form-group">
	    					<div className="col-sm-12 col-md-4 col-lg-6">
	    						<input 
	    							className="form-control" 
	    							placeholder="Search..." 
	    							ref={(searchInput) => this.searchInput = searchInput}
	    							onChange={() => this.onSearchChange()}/>
	    					</div>
    					</div>
    				</div>
    				<div className="row" style={{maxHeight: "700px", overflowY: "auto"}}>
    					{filteredRests.map((rest) => {
    						return (
    							<RestaurantCard 
    								key={rest.key} 
    								name={rest.name}
    								icon={rest.icon}
    								onPing={() => this.onPing(rest.name,rest.key)}
    								subscriptionKey={rest.subscriptionKey} 
    								onSubscribe={() => this.onSubscribe(rest.key)}
    								onUnsubscribe={() => this.onUnsubscribe(rest.subscriptionKey)}/>
    						)
						})}
    				</div>
    			</div>
			</div>
	    );
    }
};
