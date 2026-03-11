
import React, {useEffect,useState} from 'react';
import {TouchableOpacity,Alert} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {Block, Button, Text} from '../components';
import {useTheme} from '../hooks';
import api from "../services/api";
import { isDayjs } from 'dayjs';


const SurgeryList = ({navigation}: any) => {
  const {colors, sizes} = useTheme();
  const buttonPink = '#fe00e0';

const [surgeries, setSurgeries] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [postOperativeIds, setPostOperativeIds] = useState<number[]>([]);

//   const surgeries = [
//     {
//       id: 'SUR-1001',
//       patient: 'John D.',
//       type: 'Appendectomy',
//       date: '2026-03-09',
//       time: '09:00',
//       room: 'OT-2',
//       surgeon: 'Dr. Susan',
//       priority: 'Normal',
//       status: 'Scheduled',
//     },
//     {
//       id: 'SUR-1002',
//       patient: 'Mary K.',
//       type: 'C-Section',
//       date: '2026-03-09',
//       time: '10:30',
//       room: 'OT-1',
//       surgeon: 'Dr. Alan',
//       priority: 'Emergency',
//       status: 'In Progress',
//     },
//     {
//       id: 'SUR-1003',
//       patient: 'Ravi M.',
//       type: 'Hernia Repair',
//       date: '2026-03-09',
//       time: '12:00',
//       room: 'OT-3',


const fetchSurgeries = async () => {
  try {
    const response = await api.get("surgery");

    if (response.data.success) {
      setSurgeries(response.data.data);
    }

  } catch (error) {
    console.log("API error:", error);
  } finally {
    setLoading(false);
  }
};
const fetchPostOperative = async () => {
  try {

    const res = await api.get("post-operative");

    console.log("PostOperative API:", res.data);

    if (res.data.success) {

      const ids = res.data.data
        .filter((p:any) => p && p.surgery_id)
        .map((p:any) => Number(p.surgery_id));

      setPostOperativeIds(ids);

    }

  } catch (error) {
    console.log("Post Operative error:", error);
  }
};

useEffect(() => {
  fetchSurgeries();
    fetchPostOperative();
}, []);

if (loading) {
  return (
    <Block  center >
      <Text>Loading surgeries...</Text>
    </Block>
  );
}

  return (
    <Block>
      <Block scroll contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block color={colors.card} padding={sizes.padding}>
          <Block row align="center" justify="space-between" marginBottom={sizes.sm}>
            <Text h5 semibold>
              Surgery List
            </Text>
            <Button
              color={buttonPink}
              style={{backgroundColor: buttonPink}}
              paddingHorizontal={sizes.m}
              onPress={() => navigation.navigate('Screens', {screen: 'SurgeryScheduling'})}>
              <Text white semibold>
                Schedule Surgery
              </Text>
            </Button>
          </Block>

          <Block card marginTop={sizes.xs} padding={sizes.sm}>
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
                    'Patient ID',
                    'Patient Name',
                    'Surgery Type',
                    'Date',
                    'Surgeon',
                    'Priority',
                    'Actions',
                  ].map((header) => (
                    <Text key={header} semibold size={12} style={{width: 117}}>
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
                    width={820}
                    style={{borderBottomWidth: 1, borderBottomColor: colors.light}}>
                    <Text size={12} style={{width: 117}}>
                        {surgery.patient?.id}
                    </Text>

                    <Text size={12} style={{width: 117}}>
                        {surgery.patient?.first_name} {surgery.patient?.last_name}
                    </Text>

                    <Text size={12} style={{width: 117}}>
                        {surgery.surgery_type}
                    </Text>

                    <Text size={12} style={{width: 117}}>
                         {surgery.surgery_date}
                        </Text>
                   <Text size={12} style={{width: 117}}>
                         {surgery.surgeon?.name}
                        </Text>

                    <Text size={12} style={{width: 117}}>
                        {surgery.priority}
                        </Text>

                    <Block row style={{width: 117}} align="center">
                      <TouchableOpacity
                        style={{
                          marginRight: 10,
                          backgroundColor: '#facc15',
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() =>
                          navigation.navigate('Screens', {
                            screen: 'Editoperativenotes',
                            params: {
                              surgeryId: surgery.id
                            }
                          })
                        }>
                        <MaterialIcons name="description" size={16} color="#0f172a" />
                      </TouchableOpacity>

                      <TouchableOpacity
                            style={{marginRight: 10}}
                            onPress={() =>
                                navigation.navigate('Screens', {
                                 screen: 'Editsurgery',
                                 params: {
                                 surgery: {
                                 id: surgery.id,
                                 patientId: `${surgery.patient?.first_name} ${surgery.patient?.last_name}`,
                                 type: surgery.surgery_type,
                                 date: surgery.surgery_date,
                                 time: surgery.surgery_time,
                                 room: surgery.ot_room,
                              },
      },
    })
  }>
  <MaterialIcons name="edit" size={16} color={buttonPink} />
</TouchableOpacity>
           <TouchableOpacity
  onPress={() =>
    Alert.alert(
      "Delete Surgery",
      "Are you sure you want to delete this surgery?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`surgery/${surgery.id}`);
              fetchSurgeries(); // refresh list
            } catch (error) {
              console.log("Delete error:", error);
            }
          },
        },
      ]
    )
  }
>
  <MaterialIcons name="delete" size={16} color="#ea0606" />
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

export default SurgeryList;
