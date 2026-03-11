import React, {useState} from 'react';
import {Modal as RNModal, Platform, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';

import {Block, Button, Input, Text} from '../components';
import {useTheme} from '../hooks';

type PickerType = 'surgery' | 'approvalStatus' | null;

const OTUsageForm = ({navigation}: any) => {
  const {colors, sizes} = useTheme();
  const buttonPink = '#fe00e0';

  const [activePicker, setActivePicker] = useState<PickerType>(null);
  const [showSurgeryDatePicker, setShowSurgeryDatePicker] = useState(false);
  const [showSurgeryTimePicker, setShowSurgeryTimePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedSurgery, setSelectedSurgery] = useState('John D. - Appendectomy');
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState('Approved');
  const [selectedSurgeryDate, setSelectedSurgeryDate] = useState('2026-03-10');
  const [selectedSurgeryTime, setSelectedSurgeryTime] = useState('09:00');
  const [selectedStartTime, setSelectedStartTime] = useState('10:30');
  const [selectedEndTime, setSelectedEndTime] = useState('12:05');

  const surgeries = [
    {
      id: 'SUR-1001',
      patient: 'John D.',
      type: 'Appendectomy',
      date: '2026-03-09',
      time: '09:00',
    },
    {
      id: 'SUR-1002',
      patient: 'Mary K.',
      type: 'C-Section',
      date: '2026-03-09',
      time: '10:30',
    },
    {
      id: 'SUR-1003',
      patient: 'Ravi M.',
      type: 'Hernia Repair',
      date: '2026-03-09',
      time: '12:00',
    },
  ];

  const surgeryOptions = surgeries.map((s) => `${s.patient} - ${s.type}`);
  const approvalStatusOptions = ['Approved', 'Not Approved'];

  const pickerOptions =
    activePicker === 'surgery'
      ? surgeryOptions
      : activePicker === 'approvalStatus'
      ? approvalStatusOptions
      : [];

  const selectedPickerValue =
    activePicker === 'surgery'
      ? selectedSurgery
      : activePicker === 'approvalStatus'
      ? selectedApprovalStatus
      : '';

  const pickerTitle =
    activePicker === 'surgery'
      ? 'Select Surgery'
      : activePicker === 'approvalStatus'
      ? 'Select Approval Status'
      : '';

  const handleSelectPickerValue = (value: string) => {
    if (activePicker === 'surgery') setSelectedSurgery(value);
    if (activePicker === 'approvalStatus') setSelectedApprovalStatus(value);
    setActivePicker(null);
  };

  const surgeryDateValue = new Date(`${selectedSurgeryDate}T08:00:00`);
  const [surgeryHour, surgeryMinute] = selectedSurgeryTime.split(':');
  const surgeryTimeValue = new Date();
  surgeryTimeValue.setHours(Number(surgeryHour || '9'));
  surgeryTimeValue.setMinutes(Number(surgeryMinute || '0'));
  surgeryTimeValue.setSeconds(0);

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

  const onChangeSurgeryDate = (_event: DateTimePickerEvent, value?: Date) => {
    if (Platform.OS === 'android') {
      setShowSurgeryDatePicker(false);
    }
    if (!value) return;
    const yyyy = value.getFullYear();
    const mm = String(value.getMonth() + 1).padStart(2, '0');
    const dd = String(value.getDate()).padStart(2, '0');
    setSelectedSurgeryDate(`${yyyy}-${mm}-${dd}`);
  };

  const onChangeSurgeryTime = (_event: DateTimePickerEvent, value?: Date) => {
    if (Platform.OS === 'android') {
      setShowSurgeryTimePicker(false);
    }
    if (!value) return;
    const hh = String(value.getHours()).padStart(2, '0');
    const mm = String(value.getMinutes()).padStart(2, '0');
    setSelectedSurgeryTime(`${hh}:${mm}`);
  };

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
    iconName: 'arrow-drop-down' | 'calendar-today' | 'access-time';
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

  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Text h5 semibold marginBottom={sizes.sm}>
            OT Usage Form
          </Text>

          <Block card marginTop={sizes.xs} padding={sizes.sm}>
            {renderPickerField({
              label: 'Select Surgery',
              value: selectedSurgery,
              onPress: () => setActivePicker('surgery'),
              iconName: 'arrow-drop-down',
            })}

            <Input placeholder="Surgery Type" marginBottom={sizes.sm} />

            {renderPickerField({
              label: 'Surgery Date',
              value: selectedSurgeryDate,
              onPress: () => setShowSurgeryDatePicker((prev) => !prev),
              iconName: 'calendar-today',
            })}

            {showSurgeryDatePicker && (
              <Block marginBottom={sizes.sm}>
                <DateTimePicker
                  value={surgeryDateValue}
                  mode="date"
                  display="default"
                  onChange={onChangeSurgeryDate}
                />
              </Block>
            )}

            {renderPickerField({
              label: 'Surgery Time',
              value: selectedSurgeryTime,
              onPress: () => setShowSurgeryTimePicker((prev) => !prev),
              iconName: 'access-time',
            })}

            {showSurgeryTimePicker && (
              <Block marginBottom={sizes.sm}>
                <DateTimePicker
                  value={surgeryTimeValue}
                  mode="time"
                  display="default"
                  onChange={onChangeSurgeryTime}
                />
              </Block>
            )}

            <Input placeholder="OT Room" marginBottom={sizes.sm} />

            <Input placeholder="OT Room Used" marginBottom={sizes.sm} />

            <Input placeholder="Equipment Used" marginBottom={sizes.sm} />

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

            <Input placeholder="Notes" marginBottom={sizes.sm} multiline numberOfLines={3} />

            <Block row justify="flex-end">
              <Button color={buttonPink} paddingHorizontal={sizes.m}>
                <Text white semibold>
                  Update OT Details
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
              {pickerOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleSelectPickerValue(option)}
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
                    {selectedPickerValue === option && (
                      <MaterialIcons name="check" size={18} color={buttonPink} />
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

export default OTUsageForm;
