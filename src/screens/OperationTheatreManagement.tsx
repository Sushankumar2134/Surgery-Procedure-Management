import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {Block, Button, Image, Input, Text} from '../components';
import {useTheme} from '../hooks';

const OperationTheatreManagement = () => {
  const {assets, colors, sizes} = useTheme();
  const buttonPink = '#fe00e0';

  const metrics = [
    {label: 'OT In Use', value: '5', icon: assets.office},
    {label: 'Available OT Rooms', value: '3', icon: assets.home},
    {label: 'Surgeries In Progress', value: '4', icon: assets.clock},
    {label: 'OT Utilization %', value: '78%', icon: assets.documentation},
  ];

  const otRecords = [
    {
      id: 'SUR-1002',
      room: 'OT-1',
      start: '10:30',
      end: '12:05',
      duration: '1h 35m',
      equipment: 'Anesthesia Cart',
      status: 'Approved',
    },
    {
      id: 'SUR-1004',
      room: 'OT-2',
      start: '11:00',
      end: '13:20',
      duration: '2h 20m',
      equipment: 'Laparoscopy Set',
      status: 'Pending',
    },
    {
      id: 'SUR-1005',
      room: 'OT-3',
      start: '12:15',
      end: '13:10',
      duration: '55m',
      equipment: 'Suction Unit',
      status: 'Approved',
    },
  ];

  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Text h5 semibold marginBottom={sizes.sm}>
            Operation Theatre Management
          </Text>

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

          <Block card marginTop={sizes.xs} padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              OT Usage Form
            </Text>
            <Input placeholder="OT Room" marginBottom={sizes.sm} />
             <Input placeholder="Start Time" marginBottom={sizes.sm} />

            <Input placeholder="End Time" marginBottom={sizes.sm} />
            <Input placeholder="Equipment Used" marginBottom={sizes.sm} />
            <Input placeholder="Approval Status" marginBottom={sizes.sm} />
            <Input placeholder="Notes" marginBottom={sizes.sm} multiline numberOfLines={3} />

            <Block row justify="flex-end">
              <Button color={buttonPink} paddingHorizontal={sizes.m}>
                <Text white semibold>
                  Update OT Details
                </Text>
              </Button>
            </Block>
          </Block>

          <Block card marginTop={sizes.sm} padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              OT Usage Table
            </Text>

            <Block scroll horizontal showsHorizontalScrollIndicator={false}>
              <Block>
                <Block
                  row
                  color={colors.light}
                  radius={sizes.s}
                  paddingVertical={sizes.s}
                  paddingHorizontal={sizes.xs}
                  width={900}>
                  {[
                    'Surgery ID',
                    'OT Room',
                    'Start Time',
                    'End Time',
                    'Duration',
                    'Equipment Used',
                    'Approval Status',
                    'Actions',
                  ].map((header) => (
                    <Text key={header} semibold size={12} style={{width: 112}}>
                      {header}
                    </Text>
                  ))}
                </Block>

                {otRecords.map((row) => (
                  <Block
                    key={row.id}
                    row
                    paddingVertical={sizes.s}
                    paddingHorizontal={sizes.xs}
                    width={900}
                    style={{borderBottomWidth: 1, borderBottomColor: colors.light}}>
                    <Text size={12} style={{width: 112}}>
                      {row.id}
                    </Text>
                    <Text size={12} style={{width: 112}}>
                      {row.room}
                    </Text>
                    <Text size={12} style={{width: 112}}>
                      {row.start}
                    </Text>
                    <Text size={12} style={{width: 112}}>
                      {row.end}
                    </Text>
                    <Text size={12} style={{width: 112}}>
                      {row.duration}
                    </Text>
                    <Text size={12} style={{width: 112}}>
                      {row.equipment}
                    </Text>
                    <Text size={12} style={{width: 112}}>
                      {row.status}
                    </Text>
                    <Block row style={{width: 112}} align="center">
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

export default OperationTheatreManagement;
