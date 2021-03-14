import logo from './logo.svg';

import TableContainer from './components/Table/TableContainer';
import Navbar from './components/Header/Navbar';

import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {StatefulInput} from 'baseui/input';

const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export default function App () {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <StatefulInput />
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






