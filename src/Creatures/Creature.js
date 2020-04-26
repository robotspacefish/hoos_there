import React from 'react';
import { capitalize } from '../helpers/helpers';

const Creature = ({ creature, months, hemisphere }) => {
  const iconType = () => {
    let icon = 'fas ';
    switch (creature.type) {
      case 'fish':
        icon += 'fa-fish'
        break;
      case 'bug':
        icon += 'fa-bug'
        break;
      default:
        icon = 'fa fa-check'
    }
    return icon;
  };


  const renderMonthAvailability = () => {
    return months.map(month => {
      if (creature.hemispheres[hemisphere][month.toLowerCase()]) {
        return (
          <td key={`${creature.name}_${month}`} style={{ color: "#2C1E0B" }}>
            <i className={iconType()} />
          </td>
        )
      } else {
        return <td key={`${creature.name}_${month}`}>
          <i className="fas fa-slash" style={{ color: "#51871A" }} />
        </td>
      }

    });
  };

  return (
    <tr className="Creature">
      <td>{capitalize(creature.name)}</td>
      <td>{creature.type}</td>
      <td>{creature.location}</td>
      <td>{creature.shadow_size}</td>
      <td>
        {creature.available_times[0].time}
        {
          creature.available_times.length > 1 &&
          ' & ' + creature.available_times[1].time
        }
      </td>
      <td>{creature.price}</td>
      {/* {renderMonthAvailability()} */}
    </tr>
  );
}

export default Creature;