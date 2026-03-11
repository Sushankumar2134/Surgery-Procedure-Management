import React,{useEffect,useState,useCallback} from 'react';
import {TouchableOpacity,Alert} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import api from "../services/api";
import {Block, Button, Text} from '../components';
import {useTheme} from '../hooks';
import { useFocusEffect } from '@react-navigation/native';

const OperationTheatreManagement = ({navigation}: any) => {
  const {colors, sizes} = useTheme();
  const buttonBlue = '#3b82f6';
  const buttonGray = '#5a6b7d';

 
  const [otRecords, setOtRecords] = useState<any[]>([]);


const fetchOT = async () => {
  try {

    const response = await api.get("ot");

    if (response.data.success) {
      setOtRecords(response.data.data);
    }

  } catch (error) {
    console.log("OT fetch error:", error);
  }
};

useFocusEffect(
  useCallback(() => {
    fetchOT();
  }, [])
);
const deleteOT = (id: string) => {

  Alert.alert(
    "Delete OT Record",
    "Are you sure you want to delete this OT record?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {

          try {

            const response = await api.delete(`ot/${id}`);

            if (response.data.success) {

              Alert.alert("Success", "OT record deleted");

              fetchOT(); // refresh table

            }

          } catch (error) {
            console.log("Delete OT error:", error);
            Alert.alert("Error", "Failed to delete OT record");
          }

        }
      }
    ]
  );

};

  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Block row align="center" justify="space-between" marginBottom={sizes.m}>
            <Text h5 semibold>
              OT Management
            </Text>
            <Block row>
              <Button
                color={buttonBlue}
                style={{backgroundColor: buttonBlue, marginRight: sizes.sm}}
                paddingHorizontal={sizes.m}
                onPress={() => navigation.navigate('Screens', {screen: 'OTUsageForm'})}>
                <Text white semibold size={4}>
                  CREATE OT RECORD
                </Text>
              </Button>
              <Button
                color={buttonGray}
                style={{backgroundColor: buttonGray}}
                paddingHorizontal={sizes.m}
                onPress={() => navigation.navigate('Screens', {screen: 'SurgeryList'})}>
                <Text white semibold size={4}>
                  BACK TO SURGERIES
                </Text>
              </Button>
            </Block>
          </Block>

          <Text p semibold marginBottom={sizes.sm}>
            OT Records
          </Text>

          <Block card marginTop={sizes.xs} padding={sizes.sm}>
            <Block scroll horizontal showsHorizontalScrollIndicator={false}>
              <Block>
                <Block
                  row
                  color={colors.light}
                  radius={sizes.s}
                  paddingVertical={sizes.s}
                  paddingHorizontal={sizes.xs}
                  width={1050}>
                  {[
                    '#',
                    'Patient',
                    'Patient Name',
                    'Surgery Type',
                    'OT Room Used',
                    'Start Time',
                    'End Time',
                    'Approval Status',
                    'Actions',
                  ].map((header) => (
                    <Text key={header} semibold size={12} style={{width: 116}}>
                      {header}
                    </Text>
                  ))}
                </Block>

                {otRecords.length > 0 ? (
                  otRecords.map((record) => (
                    <Block
                      key={record.id}
                      row
                      paddingVertical={sizes.s}
                      paddingHorizontal={sizes.xs}
                      width={1050}
                      style={{borderBottomWidth: 1, borderBottomColor: colors.light}}>
                     <Text size={12} style={{width: 116}}>
  {record.id}
</Text>

<Text size={12} style={{width: 116}}>
  {record.surgery?.patient?.patient_code}
</Text>

<Text size={12} style={{width: 116}}>
  {record.surgery?.patient?.first_name}
</Text>

<Text size={12} style={{width: 116}}>
  {record.surgery?.surgery_type}
</Text>

<Text size={12} style={{width: 116}}>
  {record.ot_room_used}
</Text>

<Text size={12} style={{width: 116}}>
  {record.start_time}
</Text>

<Text size={12} style={{width: 116}}>
  {record.end_time}
</Text>

<Text size={12} style={{width: 116}}>
  {record.approval_status}
</Text>
                      <Block row style={{width: 116}} align="center">
                        <TouchableOpacity
                          style={{marginRight: 12}}
                          onPress={() => navigation.navigate('Screens', {screen: 'EditOT', params: {record}})}>
                          <MaterialIcons name="edit" size={18} color={buttonBlue} />
                        </TouchableOpacity>
                        <TouchableOpacity
  onPress={() => {
    Alert.alert(
      "Delete OT Record",
      "Are you sure you want to delete this OT record?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteOT(record.id)
        }
      ]
    );
  }}
>
  <MaterialIcons name="delete" size={18} color="#ea0606" />
</TouchableOpacity>
                      </Block>
                    </Block>
                  ))
                ) : (
                  <Block row paddingVertical={sizes.m} align="center" justify="center" width={1050}>
                    <Text gray center>
                      No OT Records Found
                    </Text>
                  </Block>
                )}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default OperationTheatreManagement;
