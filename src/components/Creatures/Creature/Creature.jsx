import React from 'react';
import { capitalize } from '../../../helpers/helpers';
import './Creature.scss';

const Creature = ({ creature }) => {
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
    </tr>
  );
}

export default Creature;