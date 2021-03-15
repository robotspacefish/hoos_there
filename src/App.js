import React from 'react';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { setCurrentTime } from './actions/clockActions';
import Header from './components/Header/Header';
import CreaturesContainer from './components/Creatures/CreaturesContainer';
import Footer from './components/Footer/Footer';
import './App.scss';

function App(props) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <Container>
      < Header now={props.now} updateCurrentTime={props.setCurrentTime} startingHour={props.startingHour} />
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
