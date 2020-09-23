import React, { FC } from 'react';

import { Box } from 'grommet';

interface IAppBarProps {
  children: JSX.Element[] | JSX.Element;
}

const AppBar: FC<IAppBarProps> = ({ children }: IAppBarProps) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: 1 }}
    children={children}
  />
);

export default AppBar;
