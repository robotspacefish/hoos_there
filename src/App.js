import React from 'react';
import Header from './Header/Header';
import CreaturesContainer from './Creatures/CreaturesContainer';
import Footer from './Footer/Footer';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { setCurrentTime } from './actions/clockActions';
import './App.css';

function App(props) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

  return (
    <Container>
      < Header now={props.now.format("dddd, MMMM Do YYYY, h:mm A")} updateCurrentTime={props.setCurrentTime} startingHour={props.startingHour} />
      <CreaturesContainer
        months={months}
        now={props.now}
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
