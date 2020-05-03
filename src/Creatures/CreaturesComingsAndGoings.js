import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import { capitalize } from '../helpers/helpers';
import { sortCreatures } from '../helpers/sortAndFilterCreatures';

const CreaturesComingsAndGoings = props => {
  const sort = {
    type: "name",
    direction: "asc"
  }
  const extractNamesAsString = creatureArray => {
    const sortedCreatures = sortCreatures(sort, creatureArray)
    return sortedCreatures.map(c => (capitalize(c.name))).join(", ") || "None!"
  };

  const slideContent = [
    {
      label: "New This Month",
      content: extractNamesAsString(props.newThisMonth)
    },
    {
      label: "Left This Month",
      content: extractNamesAsString(props.leftThisMonth)
    },
    {
      label: "Leaving Next Month",
      content: extractNamesAsString(props.leavingNextMonth)
    }
  ];

  const renderContent = () => {
    return slideContent.map(slide => (
      <Carousel.Item key={slide.label} >
        <div className="carousel-content">
          <h3>{slide.label}</h3>
          <p>{slide.content}</p>
        </div>
      </Carousel.Item>
    ));
  };

  return (
    <Accordion defaultActiveKey={null}>
      <Accordion.Toggle eventKey="0" as={Button} variant="link" className="ComingsAndGoingsToggle">
        Comings and Goings
    </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Carousel indicators={false} interval={null}>
          {renderContent()}
        </Carousel>
      </Accordion.Collapse>
    </Accordion>

  );
};

const mapStateToProps = state => ({
  newThisMonth: state.creatures.newThisMonth,
  leftThisMonth: state.creatures.leftThisMonth,
  leavingNextMonth: state.creatures.leavingNextMonth
});

export default connect(mapStateToProps)(CreaturesComingsAndGoings);