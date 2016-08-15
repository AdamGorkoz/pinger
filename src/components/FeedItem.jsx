const FeedItem = ({id,isSubbedPing,icon,text}) => (
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

export default FeedItem;