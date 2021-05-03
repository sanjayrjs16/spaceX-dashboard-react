import React, {useState, useEffect} from 'react';
import TableContainer from './components/Table/TableContainer';
import Navbar from './components/Header/Navbar';


import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider, useStyletron} from 'styletron-react';
import { BaseProvider, styled, DarkTheme, LightTheme} from 'baseui';

import darkThemeBG from './resources/planet-earth.jpg';
import lightThemeBG from './resources/light-theme-bg.png'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();



const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  marginTop: "10%"
});

export default function App () {
  const [css] = useStyletron();
  const [theme, setTheme] = useState(true);
  useEffect(() => {
    console.log("Runnung useEffect in APpp", document.body.style)
    theme?document.body.style.backgroundImage = ` url(${lightThemeBG})`:document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${darkThemeBG})`;
  }, [theme])
  return (
    <QueryClientProvider client={queryClient}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme?LightTheme:DarkTheme}>
          <Centered>
                <Navbar theme={theme} setTheme={setTheme} />
            <div className="App">
            
               
                <TableContainer theme={theme}/>
              </div>
          </Centered>
        </BaseProvider>
      </StyletronProvider>
    </QueryClientProvider>
  );
}






