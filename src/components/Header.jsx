const Header = ({profileImage,userName}) => (
	<h3>
		<img src={profileImage != null ? profileImage : "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"} style={{height:60,width: 60}} className="img-circle"/> {userName}
	</h3>
)

export default Header;