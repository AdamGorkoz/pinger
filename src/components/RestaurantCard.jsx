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

export default RestaurantCard;