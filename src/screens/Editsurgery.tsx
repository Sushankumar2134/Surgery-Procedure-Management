import React, {useMemo, useState,useEffect} from 'react';
import {Platform, TouchableOpacity,Alert} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';

import {Block, Button, Input, Text} from '../components';
import {useTheme} from '../hooks';
import api from "../services/api";

const Editsurgery = ({navigation, route}: any) => {
  const {colors, sizes} = useTheme();
  const surgery = route?.params?.surgery;

  const [patientValue] = useState(surgery?.patientId || 'P001 - John');
 const [surgeryType, setSurgeryType] = useState(
  surgery?.surgery_type || ''
);

const [patients, setPatients] = useState<any[]>([]);

const [selectedPatient, setSelectedPatient] = useState(
  surgery?.patient
    ? `${surgery.patient.first_name} ${surgery.patient.last_name}`
    : ""
);

const [selectedPatientId, setSelectedPatientId] = useState(
  surgery?.patient_id || surgery?.patient?.id || null
);

const [showPatientDropdown, setShowPatientDropdown] = useState(false);

 const [surgeryDate, setSurgeryDate] = useState(
  surgery?.surgery_date
    ? new Date(surgery.surgery_date).toLocaleDateString('en-US')
    : '03/11/2026'
);
  const [surgeryTime, setSurgeryTime] = useState(surgery?.time || '09:00 AM');
 const [otRoom, setOtRoom] = useState(
  surgery?.ot_room || ''
);
 const [bp, setBp] = useState(surgery?.preoperative?.bp || '');
 const [heartRate, setHeartRate] = useState(surgery?.preoperative?.heart_rate || '');
 const [fastingStatus, setFastingStatus] = useState(surgery?.preoperative?.fasting_status || '');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const dateValue = useMemo(() => {
    const [month, day, year] = surgeryDate.split('/');
    return new Date(Number(year || 2026), Number(month || 1) - 1, Number(day || 1));
  }, [surgeryDate]);

  const timeValue = useMemo(() => {
    const [timePart, meridiem] = surgeryTime.split(' ');
    const [hhRaw, mmRaw] = (timePart || '09:00').split(':');
    let hh = Number(hhRaw || '9');
    const mm = Number(mmRaw || '0');
    const ampm = (meridiem || 'AM').toUpperCase();

    if (ampm === 'PM' && hh < 12) {
      hh += 12;
    }
    if (ampm === 'AM' && hh === 12) {
      hh = 0;
    }

    const value = new Date();
    value.setHours(hh, mm, 0, 0);
    return value;
  }, [surgeryTime]);

  const onChangeDate = (_event: DateTimePickerEvent, value?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (!value) {
      return;
    }

    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    const year = value.getFullYear();
    setSurgeryDate(`${month}/${day}/${year}`);
  };

  const onChangeTime = (_event: DateTimePickerEvent, value?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (!value) {
      return;
    }

    let hh = value.getHours();
    const mm = String(value.getMinutes()).padStart(2, '0');
    const meridiem = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12;
    hh = hh === 0 ? 12 : hh;

    setSurgeryTime(`${String(hh).padStart(2, '0')}:${mm} ${meridiem}`);
  };
const fetchPatients = async () => {
  try {
    const response = await api.get("patients");

    if (response.data.success) {
      setPatients(response.data.data);
    }

  } catch (error) {
    console.log("Patient API error:", error);
  }
};
useEffect(() => {
  fetchPatients();
}, []);

  const renderPickerField = ({
    label,
    value,
    icon,
    onPress,
  }: {
    label: string;
    value: string;
    icon: 'calendar-today' | 'access-time' | 'arrow-drop-down';
    onPress: () => void;
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
          <MaterialIcons name={icon} size={18} color={colors.gray} />
        </Block>
      </TouchableOpacity>
    </Block>
  );

  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Text h5 semibold marginBottom={sizes.m}>
            Edit Surgery
          </Text>

          <Block card padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              Surgery Details
            </Text>

<Block marginBottom={sizes.sm}>
  <Text size={12} gray marginBottom={sizes.xs}>
    Patient
  </Text>

  <TouchableOpacity
    onPress={() => setShowPatientDropdown(!showPatientDropdown)}
  >
    <Block
      row
      align="center"
      justify="space-between"
      paddingHorizontal={sizes.inputPadding}
      style={{
        minHeight: sizes.inputHeight,
        borderWidth: sizes.inputBorder,
        borderColor: colors.gray,
        backgroundColor: colors.white,
      }}
    >
      <Text>{selectedPatient || "Select Patient"}</Text>
      <MaterialIcons name="arrow-drop-down" size={20} color={colors.gray} />
    </Block>
  </TouchableOpacity>

{showPatientDropdown && (
  <Block card marginTop={5}>
    {patients?.length > 0 && patients.map((p) => (
      <TouchableOpacity
        key={p.id}
        onPress={() => {
          setSelectedPatient(`${p.first_name} ${p.last_name}`);
          setSelectedPatientId(p.id);
          setShowPatientDropdown(false);
        }}
      >
        <Text padding={8}>
          {p.first_name ?? ""} {p.last_name ?? ""}
        </Text>
      </TouchableOpacity>
    ))}
  </Block>
)}

</Block>


            <Input
              label="Surgery Type"
              value={surgeryType}
              editable={false}
              onChangeText={setSurgeryType}
              marginBottom={sizes.sm}
            />

            {renderPickerField({
              label: 'Surgery Date',
              value: surgeryDate,
              icon: 'calendar-today',
              onPress: () => setShowDatePicker((prev) => !prev),
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
              value: surgeryTime,
              icon: 'access-time',
              onPress: () => setShowTimePicker((prev) => !prev),
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
  label="OT Room"
  value={otRoom}
  onChangeText={setOtRoom}
  marginBottom={sizes.sm}
/>

            <Block marginTop={sizes.sm} style={{borderTopWidth: 1, borderTopColor: colors.light}} />

            <Text p semibold marginTop={sizes.sm} marginBottom={sizes.sm}>
              Pre Operative Notes
            </Text>

            <Input label="BP" value={bp} onChangeText={setBp} marginBottom={sizes.sm} />

            <Input
              label="Heart Rate"
              value={heartRate}
              onChangeText={setHeartRate}
              marginBottom={sizes.sm}
            />

            <Input
              label="Fasting Status"
              value={fastingStatus}
              onChangeText={setFastingStatus}
              marginBottom={sizes.sm}
              placeholder="Enter Fasting Status"
            />

            <Block row marginTop={sizes.sm}>
<Button
  color="#22c55e"
  style={{backgroundColor: '#22c55e', marginRight: sizes.sm}}
  paddingHorizontal={sizes.m}
  onPress={async () => {
  try {

    if (!selectedPatientId) {
      Alert.alert("Error", "Please select a patient");
      return;
    }

    // Convert MM/DD/YYYY → YYYY-MM-DD
    const [month, day, year] = surgeryDate.split('/');
    const formattedDate = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;

    console.log("Updating surgery:", {
      patient_id: selectedPatientId,
      surgery_date: formattedDate,
      surgery_time: surgeryTime.split(" ")[0],
      bp,
      heart_rate: heartRate,
      fasting_status: fastingStatus
    });

    await api.put(`surgery/${surgery.id}`, {
      patient_id: selectedPatientId,
      surgery_type:surgeryType,
      ot_room:otRoom,
      surgery_date: formattedDate,
      surgery_time: surgeryTime.split(" ")[0],
      bp: bp,
      heart_rate: heartRate,
      fasting_status: fastingStatus,
    });

    Alert.alert("Success", "Surgery updated successfully");

    navigation.goBack();

  } catch (error) {
  const err = error as any;
  console.log("Update error:", err?.response?.data);
  Alert.alert("Error", "Failed to update surgery");
  }
}}
>
  <Text white semibold size={12}>
    UPDATE SURGERY
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
    </Block>
  );
};

export default Editsurgery;
