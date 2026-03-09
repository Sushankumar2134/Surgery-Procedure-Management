import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {Block, Button, Image, Input, Text} from '../components';
import {useTheme} from '../hooks';

const PostOperativeComplications = () => {
  const {assets, colors, sizes} = useTheme();
  const buttonPink = '#fe00e0';

  const metrics = [
    {label: 'Surgeries Completed Today', value: '13', icon: assets.check},
    {label: 'Complications Reported', value: '2', icon: assets.warning},
    {label: 'Recovery Patients', value: '9', icon: assets.users},
    {label: 'Critical Patients', value: '3', icon: assets.notification},
  ];

  const outcomes = [
    {
      id: 'SUR-1001',
      patient: 'John D.',
      procedure: 'Appendectomy',
      duration: '1h 10m',
      condition: 'Stable',
      complications: 'None',
    },
    {
      id: 'SUR-1002',
      patient: 'Mary K.',
      procedure: 'C-Section',
      duration: '1h 35m',
      condition: 'Recovering',
      complications: 'Minor Bleeding',
    },
    {
      id: 'SUR-1003',
      patient: 'Ravi M.',
      procedure: 'Hernia Repair',
      duration: '55m',
      condition: 'Stable',
      complications: 'None',
    },
  ];

  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Text h5 semibold marginBottom={sizes.sm}>
            Post-Operative Notes & Complications
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
              Post Operative Form
            </Text>
            <Input placeholder="Procedure Performed" marginBottom={sizes.sm} />
            <Input placeholder="Duration" marginBottom={sizes.sm} />
            <Input placeholder="Blood Loss" marginBottom={sizes.sm} />
          <Input placeholder="Patient Condition (Stable / Critical)" marginBottom={sizes.sm} />
            <Input
              placeholder="Recovery Instructions"
              marginBottom={sizes.sm}
              multiline
              numberOfLines={3}
            />

            <Block row justify="flex-end">
              <Button color={buttonPink} paddingHorizontal={sizes.m}>
                <Text white semibold>
                  Save Post-Op Notes
                </Text>
              </Button>
            </Block>
          </Block>

          <Block card marginTop={sizes.sm} padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              Complication Form
            </Text>
            <Input placeholder="Complication Type" marginBottom={sizes.sm} />
            <Input placeholder="Description" marginBottom={sizes.sm} multiline numberOfLines={3} />

            <Block row justify="flex-end">
              <Button color={buttonPink} paddingHorizontal={sizes.m}>
                <Text white semibold>
                  Record Complication
                </Text>
              </Button>
            </Block>
          </Block>

          <Block card marginTop={sizes.sm} padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              Surgery Outcome Table
            </Text>

            <Block scroll horizontal showsHorizontalScrollIndicator={false}>
              <Block>
                <Block
                  row
                  color={colors.light}
                  radius={sizes.s}
                  paddingVertical={sizes.s}
                  paddingHorizontal={sizes.xs}
                  width={820}>
                  {[
                    'Surgery ID',
                    'Patient',
                    'Procedure',
                    'Duration',
                    'Condition',
                    'Complications',
                    'Actions',
                  ].map((header) => (
                    <Text key={header} semibold size={12} style={{width: 116}}>
                      {header}
                    </Text>
                  ))}
                </Block>

                {outcomes.map((row) => (
                  <Block
                    key={row.id}
                    row
                    paddingVertical={sizes.s}
                    paddingHorizontal={sizes.xs}
                    width={820}
                    style={{borderBottomWidth: 1, borderBottomColor: colors.light}}>
                    <Text size={12} style={{width: 116}}>
                      {row.id}
                    </Text>
                    <Text size={12} style={{width: 116}}>
                      {row.patient}
                    </Text>
                    <Text size={12} style={{width: 116}}>
                      {row.procedure}
                    </Text>
                    <Text size={12} style={{width: 116}}>
                      {row.duration}
                    </Text>
                    <Text size={12} style={{width: 116}}>
                      {row.condition}
                    </Text>
                    <Text size={12} style={{width: 116}}>
                      {row.complications}
                    </Text>
                    <Block row style={{width: 116}} align="center">
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

export default PostOperativeComplications;
