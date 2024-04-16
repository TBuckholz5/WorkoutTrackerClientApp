import React from 'react'
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  Text
} from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { getExercises, createExercise } from '../api/workout_api';
import { createExerciseListElementFromJSON } from '../components/ExerciseListElement';
import { Modal } from 'react-native-paper';
import TextInput from '../components/TextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ExerciseListScreen({ navigation }) {
  const [addExerciseModalVisible, setAddExerciseModalVisible] = React.useState(false);
  const [addExerciseText, setAddExerciseText] = React.useState({ error: '', value: '' });
  const [exercises, setExercises] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MaterialCommunityIcons.Button
          name="plus"
          backgroundColor="#ffffff"
          color="#000000"
          onPress={() => setAddExerciseModalVisible(!addExerciseModalVisible)} />
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    getAndSetExercises();
  }, []);

  const getAndSetExercises = () => {
    getExercises().then((response) => {
      setExercises(response);
    }).catch((err) => {
      console.log(err.response.errors);
    });
  }

  const createExerciseOnPress = () => {
    if (addExerciseText.value === '') {
      setAddExerciseText({ ...addExerciseText, error: 'Exercise name cannot be empty!' });
      console.log(addExerciseText)
      return;
    }
    createExercise(addExerciseText.value).then((_) => {
      getAndSetExercises();
      setAddExerciseText({value: '', error: ''});
      setAddExerciseModalVisible(false);
    }).catch((err) => {
      console.log(err.response.errors);
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <Background>
        <Logo />
        <SafeAreaView style={styles.container}>
          <FlatList
            data={exercises}
            renderItem={({ item }) => createExerciseListElementFromJSON(item)}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </Background>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addExerciseModalVisible}
        onRequestClose={() => setAddExerciseModalVisible(!addExerciseModalVisible)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Exercise</Text>
          <TextInput
            label="Exercise Name"
            returnKeyType="done"
            value={addExerciseText.value}
            onChangeText={(text) => setAddExerciseText({ value: text, error: '' })}
            error={!!addExerciseText.error}
            errorText={addExerciseText.error}
            autoCapitalize="none"
          />
          <Button mode="contained"
            onPress={createExerciseOnPress}
          >
            Create
          </Button>
          <Button mode="contained"
            onPress={() => {
              setAddExerciseModalVisible(false);
              setAddExerciseText({value: '', error: ''});
            }}
          >
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  modalContainer: {
    top: "0px",
    height: "75%",
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: "1px",
  },
  modalTitle: {
    fontSize: 20,
    textAlign: "center",
  },
});
