import React, {useState,useEffect} from 'react';
import {Modal as RNModal, Platform, TouchableOpacity,Alert} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import api from "../services/api";

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

const SurgeryScheduling = ({navigation}:any) => {
  const {colors, sizes} = useTheme();
  const [activePicker, setActivePicker] = useState<PickerType>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
const [selectedPatient, setSelectedPatient] = useState('');
const [selectedSurgeon, setSelectedSurgeon] = useState('');
const [selectedAssistantDoctor, setSelectedAssistantDoctor] = useState('');
const [selectedAnesthetist, setSelectedAnesthetist] = useState('');
const [surgeryId, setSurgeryId] = useState<number | null>(null);

const [selectedSurgeonId, setSelectedSurgeonId] = useState<string | null>(null);
const [selectedAssistantDoctorId, setSelectedAssistantDoctorId] = useState<string | null>(null);
const [selectedAnesthetistId, setSelectedAnesthetistId] = useState<string | null>(null);
  
const [patients, setPatients] = useState<any[]>([]);
const [surgeons, setSurgeons] = useState<any[]>([]);
const [assistantDoctors, setAssistantDoctors] = useState<any[]>([]);
const [anesthetists, setAnesthetists] = useState<any[]>([]);

  const [selectedPriority, setSelectedPriority] = useState('Normal');
  const [selectedConsent, setSelectedConsent] = useState('Yes');
  const [selectedFastingStatus, setSelectedFastingStatus] = useState('Fasting');
  const [selectedDate, setSelectedDate] = useState('2026-03-10');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [surgeryType,setSurgeryType] = useState("");
  const [otRoom,setOtRoom] = useState("");
  const [notes,setNotes] = useState("");
  const [bp, setBp] = useState("");
const [heartRate, setHeartRate] = useState("");
const [allergies, setAllergies] = useState("");
const [riskFactors, setRiskFactors] = useState("");
const [instructions, setInstructions] = useState("");
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

 const patientOptions = patients.map(
  (p) => `${p.first_name} ${p.last_name}`
);

const surgeonOptions = surgeons.map((s) => s.name);

const assistantDoctorOptions = assistantDoctors.map((a) => a.name);

const anesthetistOptions = anesthetists.map((a) => a.name);

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

  if (activePicker === 'patient') {
    const patient = patients.find(
      (p) => `${p.first_name} ${p.last_name}` === value
    );

    setSelectedPatient(value);
    setSelectedPatientId(patient?.id ?? null);
  }

  if (activePicker === 'surgeon') {
    const surgeon = surgeons.find((s) => s.name === value);

    setSelectedSurgeon(value);
    setSelectedSurgeonId(surgeon?.id ?? null);
  }

  if (activePicker === 'assistantDoctor') {
    const doctor = assistantDoctors.find((a) => a.name === value);

    setSelectedAssistantDoctor(value);
    setSelectedAssistantDoctorId(doctor?.id ?? null);
  }

  if (activePicker === 'anesthetist') {
    const anesthetist = anesthetists.find((a) => a.name === value);

    setSelectedAnesthetist(value);
    setSelectedAnesthetistId(anesthetist?.id ?? null);
  }

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
const fetchPatients = async () => {
  
  try {
    const response = await api.get("patients");
    if (response.data.success) {
      setPatients(response.data.data);
    }
  } catch (error) {
    console.log("Patient fetch error:", error);
  }
};

const fetchSurgeons = async () => {
  try {
    const response = await api.get("hr/surgeons");

    if (response.data.success) {
      setSurgeons(response.data.data);
    }

  } catch (error) {
    console.log("Surgeon fetch error:", error);
  }
};
const fetchAssistantDoctors = async () => {
  try {
    const response = await api.get("hr/assistant-doctors");

    if (response.data.success) {
      setAssistantDoctors(response.data.data);
    }

  } catch (error) {
    console.log("Assistant doctor fetch error:", error);
  }
};

const fetchAnesthetists = async () => {
  try {

    const response = await api.get("hr/anesthetists");

    if (response.data.success) {

      const staff = response.data.data;

      setAnesthetists(staff);

    }

  } catch (error) {
    console.log("Anesthetist fetch error:", error);
  }
};

useEffect(() => {
  fetchPatients();
  fetchSurgeons();
  fetchAssistantDoctors();
  fetchAnesthetists();
}, []);

const saveSurgery = async () => {
  try {

    const patient = patients.find(
      (p) => `${p.first_name} ${p.last_name}` === selectedPatient
    );

    const surgeon = surgeons.find((s) => s.name === selectedSurgeon);
    const assistantDoctor = assistantDoctors.find((a) => a.name === selectedAssistantDoctor);
    const anesthetist = anesthetists.find((a) => a.name === selectedAnesthetist);

    const response = await api.post("surgery", {
      patient_id: patient?.id,
      surgery_type: surgeryType,
      surgery_date: selectedDate,
      surgery_time: selectedTime,
      ot_room: otRoom,
 surgeon_id: selectedSurgeonId,
assistant_doctor_id: selectedAssistantDoctorId,
anesthetist_id: selectedAnesthetistId,
      priority: selectedPriority,
      notes: notes
    });

    if (response.data.success) {
      const newSurgeryId=response.data.data.id;
      setSurgeryId(newSurgeryId);
      alert("Surgery Saved Successfully");
    }

  } catch (error:any) {
  console.log("FULL ERROR:", error.response?.data);
  Alert.alert("Error", JSON.stringify(error.response?.data));
}
};

const savePreOpNotes = async () => {
if (!surgeryId) {
    Alert.alert("Error","Please save surgery first");
    return;
  }

  try {

    const response = await api.post("post-operative", {
      surgery_id:surgeryId,
      // bp: bp,
      // heart_rate: heartRate,
      // allergies: allergies,
      // consent: selectedConsent,
      // fasting_status: selectedFastingStatus,
      // risk_factors: riskFactors,
      // instructions: instructions
      procedure_performed: surgeryType,
  duration: heartRate,
  blood_loss: bp,
  patient_condition: allergies,
  recovery_instructions: instructions,
  complication_type: riskFactors,
  complication_description: ""
    });

    if (response.data.success) {
      setSurgeryId(response.data.data.surgery_id);
      Alert.alert("Success", "Pre-Operative Notes Saved");
      navigation.navigate("Screens", {
      screen: "PostOperativeComplications"
});
    }

  } catch (error:any) {
    console.log("PreOp error:", error.response?.data);
  }
};

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

            <Input
  placeholder="Surgery Type"
  value={surgeryType}
  onChangeText={setSurgeryType}
  marginBottom={sizes.sm}
/>

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

  <Input
  placeholder="OT Room"
  value={otRoom}
  onChangeText={(text) => {

    if (/[^0-9]/.test(text)) {
      Alert.alert("Invalid Input", "OT Room must contain numbers only");
      return;
    }

    setOtRoom(text);
  }}
  keyboardType="numeric"
  marginBottom={sizes.sm}
/>

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
  value={notes}
  onChangeText={setNotes}
  marginBottom={sizes.sm}
  multiline
  numberOfLines={3}
/>
            <Block row justify="flex-end" marginTop={sizes.xs}>
             <Button
                 onPress={saveSurgery}
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
  <Input
  placeholder="BP"
  value={bp}
  onChangeText={(text) => {

    if (/[^0-9]/.test(text)) {
      Alert.alert("Invalid Input", "BP must contain numbers only");
      return;
    }

    setBp(text);
  }}
  keyboardType="numeric"
  marginBottom={sizes.sm}
/>

  <Input
  placeholder="Heart Rate"
  value={heartRate}
  onChangeText={(text) => {

    if (/[^0-9]/.test(text)) {
      Alert.alert("Invalid Input", "Heart Rate must contain numbers only");
      return;
    }

    setHeartRate(text);
  }}
  keyboardType="numeric"
  marginBottom={sizes.sm}
/>
            <Input
  placeholder="Allergies"
  value={allergies}
  onChangeText={setAllergies}
  marginBottom={sizes.sm}
/>

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

            <Input
  placeholder="Risk Factors"
  value={riskFactors}
  onChangeText={setRiskFactors}
  marginBottom={sizes.sm}
/>
          <Input
  placeholder="Pre-Operative Instructions"
  value={instructions}
  onChangeText={setInstructions}
  marginBottom={sizes.sm}
/>

            <Block row justify="flex-end" marginTop={sizes.xs}>
             <Button
  color={buttonPink}
  style={{backgroundColor: buttonPink}}
  paddingHorizontal={sizes.m}
  onPress={savePreOpNotes}
>
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
              {pickerOptions.map((option,index) => (
                <TouchableOpacity
                  key={option+index}
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