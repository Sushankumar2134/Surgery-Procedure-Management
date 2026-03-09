import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Articles,
  Components,
  Home,
  Profile,
  Register,
  Pro,
  SurgeryScheduling,
  OperationTheatreManagement,
  PostOperativeComplications,
} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator
      screenOptions={screenOptions.stack}
      initialRouteName="SurgeryScheduling">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      <Stack.Screen
        name="SurgeryScheduling"
        component={SurgeryScheduling}
        options={{title: 'Surgery Scheduling'}}
      />

      <Stack.Screen
        name="OperationTheatreManagement"
        component={OperationTheatreManagement}
        options={{title: 'OT Management'}}
      />

      <Stack.Screen
        name="PostOperativeComplications"
        component={PostOperativeComplications}
        options={{title: 'Post-Operative'}}
      />

      <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
