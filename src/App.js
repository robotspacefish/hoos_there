import React from 'react';
import Header from './Header/Header';
import CreaturesContainer from './Creatures/CreaturesContainer';
import Footer from './Footer/Footer';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { setCurrentTime } from './actions/clockActions';
import './App.css';

function App(props) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <Container>
      < Header now={props.now.format("dddd, MMMM D YYYY, h:mm A")} updateCurrentTime={props.setCurrentTime} startingHour={props.startingHour} />
      <CreaturesContainer
        months={months}
        now={props.now}
        startingHour={props.startingHour}
      />
      <Footer />
    </Container>
  );
}

const mapStateToProps = state => ({
  now: state.clock.now,
  startingHour: state.clock.startingHour
});


const mapDispatchToProps = dispatch => {
  return {
    setCurrentTime: () => dispatch(setCurrentTime())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
