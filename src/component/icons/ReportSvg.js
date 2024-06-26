import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ReportSvg = ({ color }) => (
  <Svg width="20" height="24" viewBox="0 0 20 24" fill="none">
    <Path d="M13 7H18.5L13 1.5V7ZM6 0H14L20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C4.89 20 4 19.1 4 18V2C4 1.46957 4.21071 0.960859 4.58579 0.585786C4.96086 0.210714 5.46957 0 6 0ZM2 4V22H18V24H2C1.46957 24 0.960859 23.7893 0.585786 23.4142C0.210714 23.0391 0 22.5304 0 22V4H2Z" fill={color} />
  </Svg>
);

export default ReportSvg;
