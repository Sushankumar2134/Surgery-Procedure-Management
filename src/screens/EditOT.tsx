import React, {useEffect, useState} from 'react';
import {Modal as RNModal, Platform, TouchableOpacity, Alert} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';

import {Block, Button, Input, Text} from '../components';
import {useTheme} from '../hooks';
import api from '../services/api';

type PickerType = 'approvalStatus' | null;

const EditOT = ({navigation, route}: any) => {
  const {colors, sizes} = useTheme();
  const buttonBlue = '#3b82f6';
  const record = route?.params?.record;

  const [activePicker, setActivePicker] = useState<PickerType>(null);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [otRoomUsed, setOtRoomUsed] = useState('');
  const [equipmentUsed, setEquipmentUsed] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState('Approved');
  const [selectedStartTime, setSelectedStartTime] = useState('10:30');
  const [selectedEndTime, setSelectedEndTime] = useState('12:05');

  useEffect(() => {
    if (!record) return;

    setOtRoomUsed(record.ot_room_used || '');
    setEquipmentUsed(record.equipment_used || '');
    setNotes(record.notes || '');
    setSelectedApprovalStatus(record.approval_status || 'Approved');
    setSelectedStartTime(record.start_time || '10:30');
    setSelectedEndTime(record.end_time || '12:05');
  }, [record]);

  const approvalStatusOptions = ['Approved', 'Not Approved'];

  const pickerTitle = activePicker === 'approvalStatus' ? 'Select Approval Status' : '';

  const [startHour, startMinute] = selectedStartTime.split(':');
  const startTimeValue = new Date();
  startTimeValue.setHours(Number(startHour || '10'));
  startTimeValue.setMinutes(Number(startMinute || '30'));
  startTimeValue.setSeconds(0);

  const [endHour, endMinute] = selectedEndTime.split(':');
  const endTimeValue = new Date();
  endTimeValue.setHours(Number(endHour || '12'));
  endTimeValue.setMinutes(Number(endMinute || '5'));
  endTimeValue.setSeconds(0);

  const onChangeStartTime = (_event: DateTimePickerEvent, value?: Date) => {
    if (Platform.OS === 'android') {
      setShowStartTimePicker(false);
    }
    if (!value) return;
    const hh = String(value.getHours()).padStart(2, '0');
    const mm = String(value.getMinutes()).padStart(2, '0');
    setSelectedStartTime(`${hh}:${mm}`);
  };

  const onChangeEndTime = (_event: DateTimePickerEvent, value?: Date) => {
    if (Platform.OS === 'android') {
      setShowEndTimePicker(false);
    }
    if (!value) return;
    const hh = String(value.getHours()).padStart(2, '0');
    const mm = String(value.getMinutes()).padStart(2, '0');
    setSelectedEndTime(`${hh}:${mm}`);
  };

  const renderPickerField = ({
    label,
    value,
    onPress,
    iconName,
  }: {
    label: string;
    value: string;
    onPress: () => void;
    iconName: 'arrow-drop-down' | 'access-time';
  }) => (
    <Block marginBottom={sizes.sm}>
      <Text size={12} gray marginBottom={sizes.xs}>
        {label}
      </Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Block
          row
          align="center"
          justify="space-between"
          radius={sizes.inputRadius}
          paddingHorizontal={sizes.inputPadding}
          style={{
            minHeight: sizes.inputHeight,
            borderWidth: sizes.inputBorder,
            borderColor: colors.gray,
            backgroundColor: colors.white,
          }}>
          <Text>{value}</Text>
          <MaterialIcons name={iconName} size={20} color={colors.gray} />
        </Block>
      </TouchableOpacity>
    </Block>
  );

  const updateOT = async () => {
    if (!record?.id) {
      Alert.alert('Error', 'OT record not found');
      return;
    }

    try {
      const response = await api.put(`ot/${record.id}`, {
        ot_room_used: otRoomUsed,
        start_time: selectedStartTime,
        end_time: selectedEndTime,
        equipment_used: equipmentUsed,
        approval_status: selectedApprovalStatus,
        notes: notes,
      });

      if (response.data.success) {
        Alert.alert('Success', 'OT record updated');
        navigation.navigate('Screens', {screen: 'OperationTheatreManagement'});
      }
    } catch (error) {
      console.log('OT update error:', error);
      Alert.alert('Error', 'Failed to update OT record');
    }
  };

  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Text h5 semibold marginBottom={sizes.sm}>
            Edit OT Management
          </Text>

          <Block card marginTop={sizes.xs} padding={sizes.sm}>
            <Input
              label="OT Room Used"
              value={otRoomUsed}
              onChangeText={setOtRoomUsed}
              marginBottom={sizes.sm}
            />

            <Input
              label="Equipment Used"
              value={equipmentUsed}
              onChangeText={setEquipmentUsed}
              marginBottom={sizes.sm}
            />

            {renderPickerField({
              label: 'Start Time',
              value: selectedStartTime,
              onPress: () => setShowStartTimePicker((prev) => !prev),
              iconName: 'access-time',
            })}

            {showStartTimePicker && (
              <Block marginBottom={sizes.sm}>
                <DateTimePicker
                  value={startTimeValue}
                  mode="time"
                  display="default"
                  onChange={onChangeStartTime}
                />
              </Block>
            )}

            {renderPickerField({
              label: 'End Time',
              value: selectedEndTime,
              onPress: () => setShowEndTimePicker((prev) => !prev),
              iconName: 'access-time',
            })}

            {showEndTimePicker && (
              <Block marginBottom={sizes.sm}>
                <DateTimePicker
                  value={endTimeValue}
                  mode="time"
                  display="default"
                  onChange={onChangeEndTime}
                />
              </Block>
            )}

            {renderPickerField({
              label: 'Approval Status',
              value: selectedApprovalStatus,
              onPress: () => setActivePicker('approvalStatus'),
              iconName: 'arrow-drop-down',
            })}

            <Input
              label="Notes"
              value={notes}
              onChangeText={setNotes}
              marginBottom={sizes.sm}
              multiline
              numberOfLines={3}
            />

            <Block row>
              <Button
                color={buttonBlue}
                style={{backgroundColor: buttonBlue, marginRight: sizes.sm}}
                paddingHorizontal={sizes.m}
                onPress={updateOT}>
                <Text white semibold>
                  UPDATE OT DETAILS
                </Text>
              </Button>

              <Button
                color={colors.light}
                style={{backgroundColor: colors.light, borderWidth: 1, borderColor: colors.gray}}
                paddingHorizontal={sizes.m}
                onPress={() => navigation.goBack()}>
                <Text semibold size={12} color={colors.secondary}>
                  CANCEL
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>

      <RNModal
        visible={Boolean(activePicker)}
        transparent
        animationType="fade"
        onRequestClose={() => setActivePicker(null)}>
        <Block
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: sizes.sm,
            backgroundColor: 'rgba(0,0,0,0.35)',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setActivePicker(null)}
            style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
          />

          <Block
            card
            padding={sizes.sm}
            style={{
              maxHeight: sizes.height * 0.7,
              alignSelf: 'center',
              width: '72%',
            }}>
            <Text p semibold marginBottom={sizes.sm}>
              {pickerTitle}
            </Text>
            <Block scroll showsVerticalScrollIndicator={false}>
              {approvalStatusOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setSelectedApprovalStatus(option);
                    setActivePicker(null);
                  }}
                  activeOpacity={0.8}>
                  <Block
                    row
                    align="center"
                    justify="space-between"
                    paddingVertical={sizes.s}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: colors.light,
                    }}>
                    <Text>{option}</Text>
                    {selectedApprovalStatus === option && (
                      <MaterialIcons name="check" size={18} color={buttonBlue} />
                    )}
                  </Block>
                </TouchableOpacity>
              ))}
            </Block>
          </Block>
        </Block>
      </RNModal>
    </Block>
  );
};

export default EditOT;
