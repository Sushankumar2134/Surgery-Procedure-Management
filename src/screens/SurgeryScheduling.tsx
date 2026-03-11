import React, {useState} from 'react';
import {Modal as RNModal, Platform, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';

import {Block, Button, Input, Text} from '../components';
import {useTheme} from '../hooks';

type PickerType =
  | 'patient'
  | 'surgeon'
  | 'assistantDoctor'
  | 'anesthetist'
  | 'priority'
  | 'consent'
  | 'fastingStatus'
  | null;

const SurgeryScheduling = () => {
  const {colors, sizes} = useTheme();
  const [activePicker, setActivePicker] = useState<PickerType>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('John D.');
  const [selectedSurgeon, setSelectedSurgeon] = useState('Dr. Susan');
  const [selectedAssistantDoctor, setSelectedAssistantDoctor] = useState('Dr. Kevin');
  const [selectedAnesthetist, setSelectedAnesthetist] = useState('Dr. Meera');
  const [selectedPriority, setSelectedPriority] = useState('Normal');
  const [selectedConsent, setSelectedConsent] = useState('Yes');
  const [selectedFastingStatus, setSelectedFastingStatus] = useState('Fasting');
  const [selectedDate, setSelectedDate] = useState('2026-03-10');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const buttonPink = '#fe00e0';

  const surgeries = [
    {
      id: 'SUR-1001',
      patient: 'John D.',
      type: 'Appendectomy',
      date: '2026-03-09',
      time: '09:00',
      room: 'OT-2',
      surgeon: 'Dr. Susan',
      priority: 'Normal',
      status: 'Scheduled',
    },
    {
      id: 'SUR-1002',
      patient: 'Mary K.',
      type: 'C-Section',
      date: '2026-03-09',
      time: '10:30',
      room: 'OT-1',
      surgeon: 'Dr. Alan',
      priority: 'Emergency',
      status: 'In Progress',
    },
    {
      id: 'SUR-1003',
      patient: 'Ravi M.',
      type: 'Hernia Repair',
      date: '2026-03-09',
      time: '12:00',
      room: 'OT-3',
      surgeon: 'Dr. Nisha',
      priority: 'Normal',
      status: 'Pending',
    },
  ];

  const patientOptions = Array.from(
    new Set([...surgeries.map((surgery) => surgery.patient), 'Aisha P.', 'Karan S.']),
  );
  const surgeonOptions = Array.from(new Set(surgeries.map((surgery) => surgery.surgeon)));
  const assistantDoctorOptions = ['Dr. Kevin', 'Dr. Priya', 'Dr. Ahmed'];
  const anesthetistOptions = ['Dr. Meera', 'Dr. Rahul', 'Dr. Shreya'];
  const priorityOptions = ['Normal', 'Emergency'];
  const consentOptions = ['Yes', 'No'];
  const fastingStatusOptions = ['Fasting', 'Not Fasting', 'NPO After Midnight'];

  const pickerOptions =
    activePicker === 'patient'
      ? patientOptions
      : activePicker === 'surgeon'
      ? surgeonOptions
      : activePicker === 'assistantDoctor'
      ? assistantDoctorOptions
      : activePicker === 'anesthetist'
      ? anesthetistOptions
      : activePicker === 'priority'
      ? priorityOptions
      : activePicker === 'consent'
      ? consentOptions
      : activePicker === 'fastingStatus'
      ? fastingStatusOptions
      : [];

  const selectedPickerValue =
    activePicker === 'patient'
      ? selectedPatient
      : activePicker === 'surgeon'
      ? selectedSurgeon
      : activePicker === 'assistantDoctor'
      ? selectedAssistantDoctor
      : activePicker === 'anesthetist'
      ? selectedAnesthetist
      : activePicker === 'priority'
      ? selectedPriority
      : activePicker === 'consent'
      ? selectedConsent
      : activePicker === 'fastingStatus'
      ? selectedFastingStatus
      : '';

  const pickerTitle =
    activePicker === 'patient'
      ? 'Select Patient'
      : activePicker === 'surgeon'
      ? 'Select Surgeon'
      : activePicker === 'assistantDoctor'
      ? 'Select Assistant Doctor'
      : activePicker === 'anesthetist'
      ? 'Select Anesthetist'
      : activePicker === 'priority'
      ? 'Select Priority'
      : activePicker === 'consent'
      ? 'Select Consent Obtained'
      : activePicker === 'fastingStatus'
      ? 'Select Fasting Status'
      : '';

  const isCompactPicker = activePicker === 'patient' || activePicker === 'priority';

  const handleSelectPickerValue = (value: string) => {
    if (activePicker === 'patient') setSelectedPatient(value);
    if (activePicker === 'surgeon') setSelectedSurgeon(value);
    if (activePicker === 'assistantDoctor') setSelectedAssistantDoctor(value);
    if (activePicker === 'anesthetist') setSelectedAnesthetist(value);
    if (activePicker === 'priority') setSelectedPriority(value);
    if (activePicker === 'consent') setSelectedConsent(value);
    if (activePicker === 'fastingStatus') setSelectedFastingStatus(value);
    setActivePicker(null);
  };

  const dateValue = new Date(`${selectedDate}T08:00:00`);
  const [selectedHour, selectedMinute] = selectedTime.split(':');
  const timeValue = new Date();
  timeValue.setHours(Number(selectedHour || '9'));
  timeValue.setMinutes(Number(selectedMinute || '0'));
  timeValue.setSeconds(0);

  const onChangeDate = (_event: DateTimePickerEvent, value?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (!value) {
      return;
    }

    const yyyy = value.getFullYear();
    const mm = String(value.getMonth() + 1).padStart(2, '0');
    const dd = String(value.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  };

  const onChangeTime = (_event: DateTimePickerEvent, value?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (!value) {
      return;
    }

    const hh = String(value.getHours()).padStart(2, '0');
    const mm = String(value.getMinutes()).padStart(2, '0');
    setSelectedTime(`${hh}:${mm}`);
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
            Surgery / Procedure Management 
          </Text>

          {/* Surgery Scheduling Form */}
          <Block card marginTop={sizes.xs} padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              Surgery Scheduling
            </Text>

            {renderPickerField({
              label: 'Patient',
              value: selectedPatient,
              onPress: () => setActivePicker('patient'),
              iconName: 'arrow-drop-down',
            })}

            <Input placeholder="Surgery Type" marginBottom={sizes.sm} />

            {renderPickerField({
              label: 'Surgery Date',
              value: selectedDate,
              onPress: () => setShowDatePicker((prev) => !prev),
              iconName: 'calendar-today',
            })}

            {showDatePicker && (
              <Block marginBottom={sizes.sm}>
                <DateTimePicker
                  value={dateValue}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              </Block>
            )}

            {renderPickerField({
              label: 'Surgery Time',
              value: selectedTime,
              onPress: () => setShowTimePicker((prev) => !prev),
              iconName: 'access-time',
            })}

            {showTimePicker && (
              <Block marginBottom={sizes.sm}>
                <DateTimePicker
                  value={timeValue}
                  mode="time"
                  display="default"
                  onChange={onChangeTime}
                />
              </Block>
            )}

            <Input placeholder="OT Room" marginBottom={sizes.sm} />

            {renderPickerField({
              label: 'Surgeon',
              value: selectedSurgeon,
              onPress: () => setActivePicker('surgeon'),
              iconName: 'arrow-drop-down',
            })}

            {renderPickerField({
              label: 'Assistant Doctor',
              value: selectedAssistantDoctor,
              onPress: () => setActivePicker('assistantDoctor'),
              iconName: 'arrow-drop-down',
            })}

            {renderPickerField({
              label: 'Anesthetist',
              value: selectedAnesthetist,
              onPress: () => setActivePicker('anesthetist'),
              iconName: 'arrow-drop-down',
            })}

            {renderPickerField({
              label: 'Priority',
              value: selectedPriority,
              onPress: () => setActivePicker('priority'),
              iconName: 'arrow-drop-down',
            })}
              <Input
                    placeholder="Notes"
                    marginBottom={sizes.sm}
                    multiline
                    numberOfLines={3}
                />
            <Block row justify="flex-end" marginTop={sizes.xs}>
              <Button
                color={buttonPink}
                style={{backgroundColor: buttonPink}}
                marginRight={sizes.s}
                paddingHorizontal={sizes.m}>
                <Text white semibold>
                  Save Surgery
                </Text>
              </Button>

              <Button
                color={buttonPink}
                style={{backgroundColor: buttonPink}}
                paddingHorizontal={sizes.m}>
                <Text white semibold>
                  Cancel
                </Text>
              </Button>
            </Block>
          </Block>

          {/* Pre Operative Notes */}
          <Block card marginTop={sizes.sm} padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              Pre-Operative Notes
            </Text>
                <Input placeholder="BP" marginBottom={sizes.sm} />

                <Input placeholder="Heart Rate" marginBottom={sizes.sm} />
            <Input placeholder="Allergies" marginBottom={sizes.sm} />

            {renderPickerField({
              label: 'Consent Obtained',
              value: selectedConsent,
              onPress: () => setActivePicker('consent'),
              iconName: 'arrow-drop-down',
            })}

            {renderPickerField({
              label: 'Fasting Status',
              value: selectedFastingStatus,
              onPress: () => setActivePicker('fastingStatus'),
              iconName: 'arrow-drop-down',
            })}

            <Input placeholder="Risk Factors" marginBottom={sizes.sm} />
            <Input placeholder="Pre-Operative Instructions" marginBottom={sizes.sm} />

            <Block row justify="flex-end" marginTop={sizes.xs}>
              <Button
                color={buttonPink}
                style={{backgroundColor: buttonPink}}
                paddingHorizontal={sizes.m}>
                <Text white semibold>
                  Save Pre-Op Notes
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
              width: isCompactPicker ? '72%' : '92%',
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

export default SurgeryScheduling;