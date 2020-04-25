import React from 'react';

const Creature = ({ creature, index }) => {
  return (
    <tr className="Creature">
      <td>{index}</td>
      <td>{creature.name}</td>
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