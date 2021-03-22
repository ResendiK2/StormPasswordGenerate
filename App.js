import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*_+"

export default function App() {

  const [password, setPassword] = useState();
  const [size, setSize] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);

  function generatePassword(){
    let pass = "";
    for(let i = 0, n = charset.length; i < size; i++)
      pass += charset.charAt(Math.floor(Math.random() * n));

    setPassword(pass);
  }

  function copyPassword() {
    Clipboard.setString(password);

    setModalVisible(true);

    setTimeout(function(){ setModalVisible(false); }, 3000);
  }

  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        
        <Image
          source={require('./src/assets/lock.png')}
          style={styles.logo}
        />

        <Text style={styles.title}> {size} Caracteres </Text>

      <View style={styles.area}>
        <Slider
          style={{height: 50, width: "90%"}}
          minimumValue={6}
          maximumValue={18}
          minimumTrackTintColor="#075d5e"
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      {password !== undefined &&
        <View style={styles.area}>
          <Text style={styles.password} onLongPress={copyPassword}>{password}</Text>
        </View>
      }

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >

        <View style={styles.modalContent}>
          <View style={styles.modalArea}>
            <Text style={styles.modalText}>Senha Copiada!</Text>
          </View>
        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b1b9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderColor: '#9cdce4',
    borderWidth: 15,
    borderRadius: 100,
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  },
  area: {
    marginTop: 15,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  button: {
    width: '80%',
    height: 50,
    marginBottom: 30,
    borderRadius: 8,
    backgroundColor: '#f39d2f',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold'
  },
  password: {
    paddingVertical: 10,
    fontSize: 20
  },
  modalContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalArea: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "10%",
    borderRadius: 30
  },
  modalText: {
    padding: 15,
    fontSize: 16,
    color: '#00b1b9',
  }
});
