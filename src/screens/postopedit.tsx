import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity, Alert} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {Block, Button, Input, Text} from '../components';
import {useTheme} from '../hooks';
import api from "../services/api";

const complicationOptions = [
  'None',
  'Excess Bleeding',
  'Infection',
  'Anesthesia Reaction',
  'Organ Damage',
];

const Postopedit = ({navigation, route}: any) => {
  const recordData = route?.params?.record;
  const {colors, sizes} = useTheme();

  const [procedurePerformed, setProcedurePerformed] = useState('');
  const [duration, setDuration] = useState('');
  const [bloodLoss, setBloodLoss] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [recoveryInstructions, setRecoveryInstructions] = useState('');
  const [complicationType, setComplicationType] = useState('None');
  const [description, setDescription] = useState('');
  const [showComplicationPicker, setShowComplicationPicker] = useState(false);

  useEffect(() => {
    if (recordData) {
      setProcedurePerformed(recordData.procedure_performed || '');
      setDuration(recordData.duration || '');
      setBloodLoss(recordData.blood_loss || '');
      setPatientCondition(recordData.patient_condition || '');
      setRecoveryInstructions(recordData.recovery_instructions || '');
      setComplicationType(recordData.complication_type || 'None');
      setDescription(recordData.complication_description || '');
    }
  }, [recordData]);

  const updatePostOperative = async () => {
    try {
      const response = await api.put(`post-operative/${recordData.id}`, {
        procedure_performed: procedurePerformed,
        duration: duration,
        blood_loss: bloodLoss,
        patient_condition: patientCondition,
        recovery_instructions: recoveryInstructions,
        complication_type: complicationType,
        complication_description: description,
      });

      if (response.data.success) {
        Alert.alert("Success", "Post Operative Updated");
        navigation.navigate("Screens", {
          screen: "PostOperativeComplications"
        });
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Text h5 semibold marginBottom={sizes.m}>
            Edit Post Operative Notes
          </Text>

          <Block card padding={sizes.sm}>
            <Text p semibold marginBottom={sizes.sm}>
              Procedure Details
            </Text>

            <Input
              label="Procedure Performed"
              value={procedurePerformed}
              onChangeText={setProcedurePerformed}
              marginBottom={sizes.sm}
              multiline
              numberOfLines={2}
            />

            <Input
              label="Duration"
              value={duration}
              onChangeText={setDuration}
              marginBottom={sizes.sm}
            />

            <Input
              label="Blood Loss"
              value={bloodLoss}
              onChangeText={setBloodLoss}
              marginBottom={sizes.sm}
            />

            <Input
              label="Patient Condition"
              value={patientCondition}
              onChangeText={setPatientCondition}
              marginBottom={sizes.sm}
            />

            <Input
              label="Recovery Instructions"
              value={recoveryInstructions}
              onChangeText={setRecoveryInstructions}
              marginBottom={sizes.sm}
              multiline
              numberOfLines={3}
            />

            <Block marginTop={sizes.sm} style={{borderTopWidth: 1, borderTopColor: colors.light}} />

            <Text p semibold marginTop={sizes.sm} marginBottom={sizes.sm}>
              Complications
            </Text>

            <Block marginBottom={sizes.sm}>
              <Text size={12} gray marginBottom={sizes.xs}>
                Complication Type
              </Text>
              <TouchableOpacity
                onPress={() => setShowComplicationPicker(true)}
                style={{
                  minHeight: sizes.inputHeight,
                  borderRadius: sizes.inputRadius,
                  borderWidth: sizes.inputBorder,
                  borderColor: colors.gray,
                  backgroundColor: colors.white,
                  paddingHorizontal: sizes.inputPadding,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>{complicationType}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.gray} />
              </TouchableOpacity>
            </Block>

            <Input
              label="Description"
              value={description}
              onChangeText={setDescription}
              marginBottom={sizes.sm}
              multiline
              numberOfLines={2}
            />

            <Block row marginTop={sizes.sm}>
              <Button
                onPress={updatePostOperative}
                color={colors.primary}
                style={{backgroundColor: colors.primary, marginRight: sizes.sm}}
                paddingHorizontal={sizes.m}>
                <Text white semibold size={12}>
                  UPDATE POST OPERATIVE
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

          <Modal
            transparent
            visible={showComplicationPicker}
            animationType="fade"
            onRequestClose={() => setShowComplicationPicker(false)}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowComplicationPicker(false)}
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.15)',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: sizes.sm,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: '88%',
                  maxWidth: 520,
                  borderRadius: sizes.s,
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.light,
                  overflow: 'hidden',
                }}>
                {complicationOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      setComplicationType(option);
                      setShowComplicationPicker(false);
                    }}
                    style={{
                      paddingVertical: sizes.s,
                      paddingHorizontal: sizes.sm,
                      borderTopWidth: index === 0 ? 0 : 1,
                      borderTopColor: colors.light,
                      backgroundColor:
                        complicationType === option ? 'rgba(0,0,0,0.06)' : colors.card,
                    }}>
                    <Text>{option}</Text>
                  </TouchableOpacity>
                ))}
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        </Block>
      </Block>
    </Block>
  );
};

export default Postopedit;
