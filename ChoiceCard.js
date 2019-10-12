import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const ChoiceCard = ({ player, choice: { uri, name } }) => {
    let title = name && name.charAt(0).toUpperCase() + name.slice(1)
    
    return (
        <View style={styles.choiceContainer}>
            <Text style={styles.choiceDescription}>
                {player}
            </Text>
            <Image
                source={{ uri }}
                resizeMode="contain"
                style={styles.choiceImage}
            />
            <Text style={styles.choiceCardTitle}>
                {title}
            </Text>
        </View>
    )
}

export default ChoiceCard

const styles = StyleSheet.create({
    choiceContainer: {
        flex: 1,
        alignItems: 'center',
    },
    choiceDescription: {
        fontSize: 25,
        color: '#250902',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    choiceCardTitle: {
        fontSize: 30,
        color: '#250902'
    },
    choiceImage: {
        width: 150,
        height: 150,
        padding: 10,
    }
})
