import React, { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

const Formulario = ({ moneda, setMoneda, criptomoneda, setCriptomoneda, setConsultarAPI }) => {



    const [ criptomonedas, setCriptomonedas ] = useState([])

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            setCriptomonedas(resultado.data.Data) 
        
        }
        consultarAPI()
    }, [])

    //almacena las selecciones del usuario 
    const obtenerCriptomoneda = cripto => {
        setCriptomoneda(cripto)
    }


    const obtenerMoneda = moneda => {
        setMoneda(moneda)
    }

    const cotizarPrecio = () => {
        if (moneda.trim() === '' || criptomoneda.trim() === '' ) {
            mostrarAlerta()
            return
        }

        //Cambiar el state de consultar API
        setConsultarAPI(true)

    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error....',
            'Ambos campos son obligatorios',
            [
                {text: 'OK'}
            ]
        )
    }

  return (
    <View>
        <Text style={styles.label}>Moneda</Text>

            <Picker
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda) }
                itemStyle={{height: 120}}
            >
                <Picker.Item label='-- seleccione --' value='' />
                <Picker.Item label='Dolar de Estados Unidos' value='USD' />
                <Picker.Item label='Peso Mexicano' value='MXN' />
                <Picker.Item label='Euro' value='EUR' />
                <Picker.Item label='Libra Esterlina' value='GBP' />
            </Picker>

        <Text style={styles.label}>Criptomoneda</Text>

        <Picker
                selectedValue={criptomoneda}
                onValueChange={ cripto => obtenerCriptomoneda(cripto) }
                itemStyle={{height: 120}}
            >
                <Picker.Item label='-- seleccione --' value="" />
                { criptomonedas.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                )) }

            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>

    </View>
  )
}

const styles = StyleSheet.create({
    label: {
        textTransform: 'uppercase',
        fontSize: 20,
        marginVertical: 20,
        fontWeight: 'bold'
    },
    btnCotizar: {
        backgroundColor: '#5e49e2',
        padding: 10,
        marginTop: 20
    },
    textoCotizar: {
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})

export default Formulario