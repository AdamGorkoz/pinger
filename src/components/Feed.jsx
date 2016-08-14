import {Component} from 'react';
import {firebaseDb} from '../utils/firebase/firebase';
import _ from 'lodash';
import moment from 'moment';

export default class Feed extends Component {
	constructor(){
		super();
		this.state = {
			pings: [],
			subs: []
		}
	}
	componentDidMount(){
		this.firebasePingsRef = firebaseDb.ref("pings");
		this.subscriptionsRef = firebaseDb.ref("users/" + this.props.userId + "/subscriptions");
		this.firebasePingsRef.limitToLast(50).on("value", (data) => {
			let pings = data.val();
			this.subscriptionsRef.on("value", (subData) => {
				let subs = subData.val();
				this.setState({
					pings: pings ? _.filter(pings, (value) => value !== undefined) : [],
					subs: subs ? _.filter(subs, (value) => value !== undefined) : []
				})
			});
			
		});
	}
  	render() {
  		let coloredPings = this.state.pings.map((ping) => {
  			let isSubbedPing = _.find(this.state.subs, (sub) => ping.restKey === sub.key);
  			ping.isSubbedPing = !!isSubbedPing;
  			return ping;
  		});
  		let orderedPings = _.orderBy(coloredPings, ['time'], ['desc']);
	    return (
    		<div className="list-group panel" style={{maxHeight: "700px", overflowY: "auto"}}>
			    {orderedPings.map((ping,id) => {
			    	return (
			    		<span key={id} className={ping.isSubbedPing ? "list-group-item list-group-item-success" : "list-group-item"}>
	    					<div className="row">
		    					<div className="col-sm-2">
	    							<img src={ping.icon != null ? ping.icon : "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"} style={{height:50, widht: 50}} className="img-circle"/>
		    					</div>
		    					<div className="col-sm-10">
		    							<p style={{fontSize: 12, marginLeft: 10,marginTop: 10}}>
	    						 				{ping.text}
	    						 			<p>
		    									<small>
		    										<b>{moment(ping.time).format("DD/MM/YYYY HH:mm:ss")}</b>
												</small>
		    								</p>
		    							</p>
		    							
		    					</div>
		    				</div>
	    				</span>
	    			)
				})}
			</div>
	    );
    }
};

