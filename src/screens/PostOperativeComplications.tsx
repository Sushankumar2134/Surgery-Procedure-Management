import React,{useEffect,useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {Block, Button, Text} from '../components';
import {useTheme} from '../hooks';
import api from "../services/api";

const PostOperativeComplications = ({navigation}: any) => {
  const {colors, sizes} = useTheme();
  const buttonPink = '#fe00e0';

  const [postOperativeRecords, setPostOperativeRecords] = useState<any[]>([]);

const fetchPostOperative = async () => {
  try {
    const response = await api.get("post-operative");

    console.log("API Response:", response.data);

    if (response.data.success) {
      setPostOperativeRecords(response.data.data);
    }

  } catch (error) {
    console.log("Post operative API error:", error);
  }
};

useEffect(() => {

  const unsubscribe = navigation.addListener("focus", () => {
    fetchPostOperative();
  });

  return unsubscribe;

}, [navigation]);


  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Block row align="center" justify="space-between" marginBottom={sizes.sm}>
            <Text h5 semibold>
              Post Operative Notes
            </Text>
           
          </Block>

          <Text p semibold marginBottom={sizes.sm}>
            Post Operative Records
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
                    'Procedure Performed',
                    'Duration',
                    'Patient Condition',
                    'Complication',
                    'Actions',
                  ].map((header) => (
                    <Text key={header} semibold size={12} style={{width: 116}}>
                      {header}
                    </Text>
                  ))}
                </Block>

                {postOperativeRecords.length > 0 ? (
                  postOperativeRecords.map((record,index) => (
                    <Block
                      key={record.id}
                      row
                      paddingVertical={sizes.s}
                      paddingHorizontal={sizes.xs}
                      width={1050}
                      style={{borderBottomWidth: 1, borderBottomColor: colors.light}}>
               <Text size={12} style={{width:116}}>
  {index + 1}
</Text>

<Text size={12} style={{width:116}}>
  {record.surgery?.patient?.patient_code || "-"}
</Text>

<Text size={12} style={{width:116}}>
  {record.surgery?.patient?.first_name}
</Text>

<Text size={12} style={{width:116}}>
  {record.surgery?.surgery_type}
</Text>

<Text size={12} style={{width:116}}>
  {record.procedure_performed}
</Text>

<Text size={12} style={{width:116}}>
  {record.duration}
</Text>

<Text size={12} style={{width:116}}>
  {record.patient_condition}
</Text>

<Text size={12} style={{width:116}}>
  {record.complication_type}
</Text>

<Block row style={{width:116}} align="center">
  <TouchableOpacity style={{marginRight:12}}>
    <MaterialIcons name="edit" size={18} color={buttonPink} />
  </TouchableOpacity>

  <TouchableOpacity style={{marginRight:12}}>
    <MaterialIcons name="visibility" size={18} color={buttonPink} />
  </TouchableOpacity>

  <TouchableOpacity>
    <MaterialIcons name="delete" size={18} color="#ea0606" />
  </TouchableOpacity>
</Block>
                    </Block>
                  ))
                ) : (
                  <Block
                    row
                    paddingVertical={sizes.m}
                    align="center"
                    justify="center"
                    width={1050}>
                    <Text gray center>
                      No Post Operative Records Found
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

export default PostOperativeComplications;
