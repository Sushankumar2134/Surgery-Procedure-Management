import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Articles,
  Components,
  Home,
  Profile,
  Register,
  Pro,
  SurgeryList,
  SurgeryScheduling,
  Editsurgery,
  Editoperativenotes,
  OperationTheatreManagement,
  OTUsageForm,
  EditOT,
  PostOperativeComplications,
  Postopedit,
} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator
      screenOptions={screenOptions.stack}
      initialRouteName="SurgeryList">
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
        name="SurgeryList"
        component={SurgeryList}
        options={{title: 'Surgery List'}}
      />

      <Stack.Screen
        name="SurgeryScheduling"
        component={SurgeryScheduling}
        options={{title: 'Surgery Scheduling'}}
      />

      <Stack.Screen
        name="Editsurgery"
        component={Editsurgery}
        options={{title: 'Edit Surgery'}}
      />

      <Stack.Screen
        name="Editoperativenotes"
        component={Editoperativenotes}
        options={{title: 'Post-Operative Notes'}}
      />

      <Stack.Screen
        name="OperationTheatreManagement"
        component={OperationTheatreManagement}
        options={{title: 'OT Management'}}
      />

      <Stack.Screen
        name="OTUsageForm"
        component={OTUsageForm}
        options={{title: 'OT Usage Form'}}
      />

      <Stack.Screen
        name="EditOT"
        component={EditOT}
        options={{title: 'Edit OT Management'}}
      />

      <Stack.Screen
        name="PostOperativeComplications"
        component={PostOperativeComplications}
        options={{title: 'Post-Operative'}}
      />

      <Stack.Screen
        name="Postopedit"
        component={Postopedit}
        options={{title: 'Edit Post-Operative'}}
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
