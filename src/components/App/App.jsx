import './App.scss';
import '../../utils/react-select/default.scss';
import '../../utils/media.scss';
import 'normalize.css';
import ModalsManager from 'components/Modals/ModalsManager';
import React from 'react';

const App = ({children}) => {
    return (
        <div className="ch">
            <div className="ch-container" >{children}</div>
            <ModalsManager/>
        </div>
    );
};

export default App;
