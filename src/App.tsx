import logo from './logo.svg';

import TableContainer from './components/Table/TableContainer';
import Navbar from './components/Header/Navbar';

import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled, DarkTheme} from 'baseui';


const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
});

export default function App () {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <Centered>
          <div className="App">
            {/* {items.map((item) => {
                return <div>{item.name}</div>
            })} */}
            <Navbar />
            <TableContainer />
          </div>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}






