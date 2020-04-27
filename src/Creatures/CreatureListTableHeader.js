import React from 'react';
import Button from 'react-bootstrap/Button';

// const CreatureListTableHeader = props => {
class CreatureListTableHeader extends React.Component {
  static defaultProps = {
    buttonContent: [
      { content: "Name", type: "name", icon: '' },
      { content: "Type", type: "type", icon: '' },
      { content: "Location", type: "location", icon: '' },
      { content: "Shadow Size", type: "shadow", icon: '' },
      { content: "Time Available", type: "time", icon: '' },
      { content: "Price", type: "price", icon: '' }
    ]
  };

  state = {
    buttonContent: [...this.props.buttonContent]
  };

  onClickHandler = e => {
    this.props.updateSortType(e.target.dataset.type)
    this.updateSortIcon(e.target.dataset.type)
  };

  updateSortIcon = (btnType) => {
    let icon;
    if (this.props.sortInfo.direction === "asc") {
      // switch to dsc - icon is down arrow
      // icon = "fas fa-sort-down";
      icon = "fas fa-sort-amount-down-alt"
    } else if (this.props.sortInfo.direction === "dsc" || this.props.sortInfo.direction === "default") {
      // switch to asc - icon is up arrow
      // icon = "fas fa-sort-up";
      icon = "fas fa-sort-amount-up-alt"
    }

    const updatedBtns = this.state.buttonContent.map(btn => {
      if (btn.type === btnType) {
        return { ...btn, icon };
      } else {
        return { ...btn, icon: '' }
      }
    })
    this.setState({ buttonContent: updatedBtns });
  };

  renderButtons = () => (
    this.state.buttonContent.map(btn => (
      <th key={btn.type}>
        <Button variant="outline-success" onClick={this.onClickHandler} data-type={btn.type}>
          {btn.content} <i className={btn.icon} />
        </Button>
      </th>
    ))
  );
  render() {
    return (
      <thead className="CreatureListTableHeader">
        <tr>
          {this.renderButtons()}
        </tr>
      </thead>
    );
  }
}
//   const { updateSortType, sort } = props;
//   const buttonContent = [
//     { content: "Name", type: "name", icon: '' },
//     { content: "Type", type: "type", icon: '' },
//     { content: "Location", type: "location", icon: '' },
//     { content: "Shadow Size", type: "shadow", icon: '' },
//     { content: "Time Available", type: "time", icon: '' },
//     { content: "Price", type: "price", icon: '' }
//   ];

//   const onClickHandler = e => {
//     updateSortType(e.target.dataset.type)
//     clearSortIcons();
//     updateSortIcon(e.target.dataset.type)
//   };

//   const clearSortIcons = () => {

//   }

//   const updateSortIcon = (btn) => {
//     let icon;
//     if (sort.direction === "asc") {
//       // icon is up arrow
//       icon = "fas fa-sort-up";
//     } else if (sort.direction === "dsc") {
//       /// icon is down arrow
//       icon = "fas fa-sort-down";
//     } else {
//       // icon is nothing
//       icon = "";
//     }
//     this.setState({ sort: { ...this.state.sort, icon } });
//   };

//   const renderButtons = () => (
//     buttonContent.map(btn => (
//       <th key={btn.type}>
//         <Button variant="outline-success" onClick={onClickHandler} data-type={btn.type}>
//           {btn.content} <i className={btn.icon} />
//         </Button>
//       </th>
//     ))
//   );

//   return (
//     <thead className="CreatureListTableHeader">
//       <tr>
//         {renderButtons()}
//       </tr>
//     </thead>
//   );

// }

export default CreatureListTableHeader;