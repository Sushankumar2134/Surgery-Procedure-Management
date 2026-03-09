import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {Block, Button, Image, Input, Switch, Text} from '../components';
import {useTheme} from '../hooks';

const SurgeryScheduling = () => {
  const {assets, colors, sizes} = useTheme();
  const [consentObtained, setConsentObtained] = useState(false);
  const buttonPink = '#fe00e0';

  const metrics = [
    {
      label: 'Total Surgeries Today',
      value: '24',
      icon: assets.calendar,
    },
    {
      label: 'Emergency Surgeries',
      value: '6',
      icon: assets.warning,
    },
    {
      label: 'Pending Surgeries',
      value: '11',
      icon: assets.clock,
    },
    {
      label: 'Completed Surgeries',
      value: '13',
      icon: assets.check,
    },
  ];

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

  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Text h5 semibold marginBottom={sizes.sm}>
            Surgery / Procedure Management 
          </Text>


  
          {/* Metrics Cards */}
          <Block row wrap="wrap" justify="space-between">
            {metrics.map((metric) => (
              <Block
                card
                key={metric.label}
                width="48%"
                marginBottom={sizes.sm}
                padding={sizes.sm}>
                <Block row align="center" justify="space-between">
                  <Block
                    flex={0}
                    radius={sizes.s}
                    width={sizes.md}
                    height={sizes.md}
                    align="center"
                    justify="center"
                    color={colors.light}>
                    <Image source={metric.icon} color={colors.primary} radius={0} />
                  </Block>
                  <Text h5 semibold>
                    {metric.value}
                  </Text>
                </Block>
                <Text p gray marginTop={sizes.xs}>
                  {metric.label}
                </Text>
              </Block>
            ))}
          </Block>

          {/* Surgery Scheduling Form */}
          <Block card marginTop={sizes.xs} padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              Surgery Scheduling
            </Text>

            <Input placeholder="Patient (Dropdown)" marginBottom={sizes.sm} />

            <Input placeholder="Surgery Type" marginBottom={sizes.sm} />

            <Input placeholder="Surgery Date" marginBottom={sizes.sm} />

            <Input placeholder="Surgery Time" marginBottom={sizes.sm} />

            <Input placeholder="OT Room" marginBottom={sizes.sm} />

            <Input placeholder="Surgeon" marginBottom={sizes.sm} />

            <Input placeholder="Assistant Doctor" marginBottom={sizes.sm} />

            <Input placeholder="Anesthetist" marginBottom={sizes.sm} />

            <Input placeholder="Priority (Normal / Emergency)" marginBottom={sizes.sm} />
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

            <Block row align="center" justify="space-between" marginBottom={sizes.sm}>
              <Text>Consent Obtained</Text>
              <Switch
                checked={consentObtained}
                onPress={(checked) => setConsentObtained(checked)}
              />
            </Block>

            <Input placeholder="Fasting Status" marginBottom={sizes.sm} />

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

          {/* Surgery List Table */}
          <Block card marginTop={sizes.sm} padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              Surgery List
            </Text>

            <Block scroll horizontal showsHorizontalScrollIndicator={false}>
              <Block>
                <Block
                  row
                  color={colors.light}
                  radius={sizes.s}
                  paddingVertical={sizes.s}
                  paddingHorizontal={sizes.xs}
                  width={980}>
                  {[
                    'Surgery ID',
                    'Patient',
                    'Surgery Type',
                    'Date',
                    'Time',
                    'OT Room',
                    'Surgeon',
                    'Priority',
                    'Status',
                    'Actions',
                  ].map((header) => (
                    <Text key={header} semibold size={12} style={{width: 96}}>
                      {header}
                    </Text>
                  ))}
                </Block>

                {surgeries.map((surgery) => (
                  <Block
                    key={surgery.id}
                    row
                    paddingVertical={sizes.s}
                    paddingHorizontal={sizes.xs}
                    width={980}
                    style={{borderBottomWidth: 1, borderBottomColor: colors.light}}>
                    <Text size={12} style={{width: 96}}>
                      {surgery.id}
                    </Text>
                    <Text size={12} style={{width: 96}}>
                      {surgery.patient}
                    </Text>
                    <Text size={12} style={{width: 96}}>
                      {surgery.type}
                    </Text>
                    <Text size={12} style={{width: 96}}>
                      {surgery.date}
                    </Text>
                    <Text size={12} style={{width: 96}}>
                      {surgery.time}
                    </Text>
                    <Text size={12} style={{width: 96}}>
                      {surgery.room}
                    </Text>
                    <Text size={12} style={{width: 96}}>
                      {surgery.surgeon}
                    </Text>
                    <Text size={12} style={{width: 96}}>
                      {surgery.priority}
                    </Text>
                    <Text size={12} style={{width: 96}}>
                      {surgery.status}
                    </Text>

                    <Block row style={{width: 96}} align="center">
                      <TouchableOpacity style={{marginRight: 12}}>
                        <MaterialIcons name="edit" size={18} color={buttonPink} />
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <MaterialIcons name="visibility" size={18} color={buttonPink} />
                      </TouchableOpacity>
                    </Block>
                  </Block>
                ))}
              </Block>
            </Block>
          </Block>

        </Block>
      </Block>
    </Block>
  );
};

export default SurgeryScheduling;