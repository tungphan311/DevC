import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

const Button = (props) => {
    const { name, onPress } = props

    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress(name)}>
            <Text style={styles.buttonText}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonStyle: {
        width: 200,
        margin: 10,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#640D14',
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    }
})