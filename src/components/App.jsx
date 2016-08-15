import {Component} from 'react';
import _ from 'lodash';
import {firebaseDb,firebaseAuth,firebaseGoogleAuthProvider} from '../utils/firebase/firebase';

import RestaurantsGrid from './RestaurantsGrid';
import Feed from './Feed';
import Header from './Header'

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			user: null,
		}
	}
	componentDidMount(){
		firebaseAuth.onAuthStateChanged((user) => {
		  if (user) {
		    this.firebaseUsersRef = firebaseDb.ref("users/" + user.uid);
				this.firebaseUsersRef.once("value", (data) => {
					let userFromDB = data.val();
					if(userFromDB === null){
						this.firebaseUsersRef.set({
							name: user.displayName
						});
						this.setState({
							user: {
								uid: user.uid,
								name: user.displayName,
								profileImage: user.providerData[0].photoURL
							}
						});
						if (!Notification) {
						    alert('Desktop notifications not available in your browser. Try Chromium.'); 
						    return;
					  	}
					  	if (Notification.permission !== "granted"){
					  		Notification.requestPermission();
					  	}
					}
					else{
						this.setState({
							user: {
								uid: user.uid,
								name: userFromDB.name,
								profileImage: user.providerData[0].photoURL
							}
						});
						if (!Notification) {
						    alert('Desktop notifications not available in your browser. Try Chromium.'); 
						    return;
					  	}
					  	if (Notification.permission !== "granted"){
					  		Notification.requestPermission();
					  	}	
					}
				});
		  } else {
		  	firebaseAuth.getRedirectResult().then((result) => {
		  		if(result.user == null){
		  			firebaseAuth.signInWithRedirect(firebaseGoogleAuthProvider);
		  		}
		  		else{
		  			this.firebaseUsersRef = firebaseDb.ref("users/" + result.user.uid);
					this.firebaseUsersRef.once("value", (data) => {
						let userFromDB = data.val();
						if(userFromDB === null){
							this.firebaseUsersRef.set({
								name: result.user.displayName
							});
						}
						else{
							this.setState({
								user: {
									uid: result.user.uid,
									name: userFromDB.name,
									profileImage: result.user.providerData[0].photoURL
								}
							});
						}
					});
		  		}
			}).catch((error) => {
			  alert("Authentication error");
			});
		  }
		});
		this.firebasePingsRef = firebaseDb.ref("pings");
		this.firebasePingsRef.limitToLast(1).on("value", (data) => {
			if(this.state.user){
				this.subscriptionsRef = firebaseDb.ref("users/" + this.state.user.uid + "/subscriptions");
				let pings = data.val();
				if(pings){
					this.subscriptionsRef.once("value", (subData) => {
						let subs = subData.val();
						for(let i in pings){
							let isSubbedPing = _.find(subs, (sub) => pings[i].restKey === sub.key);
				  			if(isSubbedPing){
				  				if (Notification && Notification.permission == "granted"){
				  					new Notification('Food !', {
								      body: pings[i].text,
								      tag: i,
								      icon: pings[i].icon != null ? pings[i].icon : "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"
								    });
				  				}
				  			}
						}
					});
				}
			}
		});
	}
  	render() {
	    return (
	    	<div className="container-fluid">
	    		{this.state.user !== null ?
	    			<div>
		    			<div className="row">
		    				<div className="col-sm-12">
		    					<Header 
		    						userName={this.state.user.name}
		    						profileImage={this.state.user.profileImage}/>
	    					</div>
		    			</div>
		    			<div className="row">
			    			<div className="col-md-2 hidden-xs hidden-sm">
			    				<Feed 
			    					userId={this.state.user.uid}/>
			    			</div>
			    			<div className="col-md-10 col-sm-12">
			    				<RestaurantsGrid 
			    					userId={this.state.user.uid}
			    					userName={this.state.user.name}
			    					userPhoto={this.state.user.profileImage} />
			    			</div>
	    				</div>
    				</div>
				: <h1 className="text-center">Loading...</h1>}
	    	</div>
	    );
    }
};

