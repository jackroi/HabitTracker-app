import React, { useMemo } from 'react';
import { useColorScheme, StyleSheet, Text, View, FlatList } from 'react-native';
import { t } from 'i18n-js';

import { Theme, getTheme } from '../../styles/themes';
import { StatisticsDetailsScreenNavigationProps } from '../../types/types';


// Monthly status
// Yearly status

// type YearlyStatusProps = {

// }

// const YearlyStatus = ({}: YearlyStatusProps) => {
//   const views: JSX.Element[] = [];
//   for (let row = 0; row < 7; row++) {
//     for (let col = 0; col < 50; col++) {
//       views.push(<View key={'' + row + ',' + col} style={{ height: 5, width: 5, backgroundColor: 'red' }}></View>)
//     }
//   }

//   return (
//     <View style={{ width: '100%', backgroundColor: 'gray' }}>
//       {
// views
//       }
//     </View>
//   );
// };



// NumberBox

type BoxProps = {
  title: string;
  value: number;
}

const Box = ({ title, value }: BoxProps) => {
  return (
    <View style={{ width: '40%', flexDirection: 'column', backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
      <Text style={{ fontSize: 40 }}>{value}</Text>
    </View>
  );
};












const StatisticsDetailsScreen = ({ navigation, route }: StatisticsDetailsScreenNavigationProps) => {
  const theme = getTheme(useColorScheme());
  const dynamicStyles = useMemo(() => styles(theme), [theme]);

  const { habitId } = route.params;

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>{habitId}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <Box title={'Best streak'} value={20} />
        <Box title={'Best streak'} value={20} />
        <Box title={'Best streak'} value={20} />
        <Box title={'Best streak'} value={20} />
      </View>
    </View>
  );
};


const styles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: theme.colorBackground,
  },
  text: {
    color: theme.colorOnBackground,
  },
});


export default StatisticsDetailsScreen;
