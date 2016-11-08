import moment from 'moment'

const FeedItem = ({id,isSubbedPing,icon,text,time}) => (
	<span key={id} className={isSubbedPing ? "list-group-item list-group-item-success" : "list-group-item"}>
		<div className="row">
			<div className="col-sm-2">
				<img src={icon != null ? icon : "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"} style={{height:50, widht: 50}} className="img-circle"/>
			</div>
			<div className="col-sm-10">
					<p style={{fontSize: 12, marginLeft: 10,marginTop: 10}}>
			 				{text}
			 			 <br/>
							<small>
								<b>{moment(time).format("DD/MM/YYYY HH:mm:ss")}</b>
							</small>
						
					</p>
					
			</div>
		</div>
	</span>
)

export default FeedItem;