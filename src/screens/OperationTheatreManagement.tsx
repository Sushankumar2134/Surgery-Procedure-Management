import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {Block, Button, Text} from '../components';
import {useTheme} from '../hooks';

const OperationTheatreManagement = ({navigation}: any) => {
  const {colors, sizes} = useTheme();
  const buttonBlue = '#3b82f6';
  const buttonGray = '#5a6b7d';

  const otRecords = [
    {
      id: 1,
      patientId: 'P-001',
      patientName: 'John D.',
      surgeryType: 'Appendectomy',
      otRoom: 'OT-1',
      startTime: '10:30',
      endTime: '12:05',
      approvalStatus: 'Approved',
    },
    {
      id: 2,
      patientId: 'P-002',
      patientName: 'Mary K.',
      surgeryType: 'C-Section',
      otRoom: 'OT-2',
      startTime: '11:00',
      endTime: '13:20',
      approvalStatus: 'Pending',
    },
    {
      id: 3,
      patientId: 'P-003',
      patientName: 'Ravi M.',
      surgeryType: 'Hernia Repair',
      otRoom: 'OT-3',
      startTime: '12:15',
      endTime: '13:10',
      approvalStatus: 'Approved',
    },
  ];

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
                        {record.patientId}
                      </Text>
                      <Text size={12} style={{width: 116}}>
                        {record.patientName}
                      </Text>
                      <Text size={12} style={{width: 116}}>
                        {record.surgeryType}
                      </Text>
                      <Text size={12} style={{width: 116}}>
                        {record.otRoom}
                      </Text>
                      <Text size={12} style={{width: 116}}>
                        {record.startTime}
                      </Text>
                      <Text size={12} style={{width: 116}}>
                        {record.endTime}
                      </Text>
                      <Text size={12} style={{width: 116}}>
                        {record.approvalStatus}
                      </Text>
                      <Block row style={{width: 116}} align="center">
                        <TouchableOpacity style={{marginRight: 12}}>
                          <MaterialIcons name="edit" size={18} color={buttonBlue} />
                        </TouchableOpacity>
                        <TouchableOpacity>
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
