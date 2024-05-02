// import React from 'react';
// import { View } from 'react-native';
// import Svg, { Path } from 'react-native-svg';

// export default function Homesvg({ color }) {
//   return (
//     <View>
//       <Svg width={24} height={26} viewBox="0 0 24 26" fill="none">
//         <Path
//           d="M8 25V17C8 16.2928 8.28095 15.6145 8.78105 15.1144C9.28115 14.6143 9.95942 14.3333 10.6667 14.3333H13.3333C14.0406 14.3333 14.7189 14.6143 15.219 15.1144C15.719 15.6145 16 16.2928 16 17V25M2.66667 22.3333V13.781C2.66667 13.3497 2.31698 13 1.88562 13V13C1.18978 13 0.8413 12.1587 1.33333 11.6667L11.2929 1.70711C11.6834 1.31658 12.3166 1.31658 12.7071 1.70711L22.6667 11.6667C23.1587 12.1587 22.8102 13 22.1144 13V13C21.683 13 21.3333 13.3497 21.3333 13.781V22.3333C21.3333 23.0406 21.0524 23.7189 20.5523 24.219C20.0522 24.719 19.3739 25 18.6667 25H5.33333C4.62609 25 3.94781 24.719 3.44772 24.219C2.94762 23.7189 2.66667 23.0406 2.66667 22.3333Z"
//           stroke={color} 
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </Svg>
//     </View>
//   );
// }

import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Homesvg = ({ color }) => (
  <Svg width="26" height="23" viewBox="0 0 26 23" fill="none">
    <Path d="M10.4 23V14.8824H15.6V23H22.1V12.1765H26L13 0L0 12.1765H3.9V23H10.4Z" fill={color} />
  </Svg>
);

export default Homesvg;
