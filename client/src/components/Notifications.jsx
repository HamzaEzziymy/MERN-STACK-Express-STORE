import React from 'react';

function Notifications() {

    const myLists = [1,2,3,4,5,6]
  return (
    <div className='notifications'>
        {
            myLists.map((p,i)=>(
                <div key={i}>
                    <img src={p.img}/>
                    <p>{p.name}</p>
                    <p>{p.price}$</p>
                </div>
            ))
        }
    </div>
  )
}

export default Notifications;