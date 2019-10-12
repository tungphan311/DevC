import React from 'react'
import { View, Text, Modal, TouchableHighlight } from 'react-native'

const History = ({ showModal, toggleShowModal }) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center', flex: 1 }}>
                <View style={{ flex: 0.5, backgroundColor: 'white', alignItems: 'center' }}>
                    <Text>Total game played: 100</Text>

                    <TouchableHighlight
                        onPress={toggleShowModal}>
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}

export default History
