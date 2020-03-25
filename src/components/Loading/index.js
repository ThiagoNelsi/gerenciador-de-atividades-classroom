import React from 'react';
import { SyncLoader } from 'react-spinners';

import './styles.css';

function Loading() {
  return (
    <div className='loading'><SyncLoader /></div>
  );
}

export default Loading;
