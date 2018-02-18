import './App.scss';
import '../../utils/react-select/default.scss';
import '../../utils/media.scss';
import 'normalize.css';
import React from 'react';

const App = ({children}) => {
    return (
        <div className="ch">
            <div className="ch-container" >{children}</div>
        </div>
    );
};

export default App;
