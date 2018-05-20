import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';

// HoC to add pagination buttons (1- lastPage)
const withPaginated = (Component) => (props) => {
  const { itemsCurrentPage, itemsLastPage, onJump  } = props;

  // render list of buttons
  function renderButtons() {
    const buttonArr = [];
    // on app init items last page will be 0
    if(itemsLastPage === 0) {
      return null;
    }

    for (let i = 1; i <= itemsLastPage; i++) {
      buttonArr.push(
        <Button 
          key={i} 
          className={`button ${itemsCurrentPage == i && 'btn-primary'}`}
          onClick={onJump(i)}
          >{i}</Button>
      )
    }
    return buttonArr;
  }
  
  return (
    <Fragment>
      {renderButtons()}
      <Component {...props}/>
      {renderButtons()}
    </Fragment>
  )
}

export default withPaginated;