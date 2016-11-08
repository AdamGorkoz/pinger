import {Component} from 'react';
import {firebaseDb} from '../utils/firebase/firebase';
import _ from 'lodash';
import moment from 'moment';

import FeedItem from './FeedItem';

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
    		<div className="list-group panel" style={{maxHeight: "779px", overflowY: "auto"}}>
			    {orderedPings.map((ping,id) => <FeedItem key={id} id={id} {...ping} />)}
			</div>
	    );
    }
};

