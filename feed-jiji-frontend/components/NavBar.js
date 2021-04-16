class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.left && <></>}
        {this.props.center && <></>}
        {this.props.right && <></>}
      </>
    );
  }
}
