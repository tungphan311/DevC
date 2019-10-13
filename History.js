import React from 'react'
import { View, Text, Modal, TouchableHighlight } from 'react-native'
import PieChart from 'react-native-pie-chart'

const History = ({ showModal, toggleShowModal, win, lose, tie }) => {
    const chart_wh = 200
    const series = [win, lose, tie]
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B']

    const total = win + lose + tie;

    const formatGame = game => game > 1 ? 'games': 'game'

    const roundNumber = number =>  Number(number.toFixed(1))

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
                    <Text>Total game played: {total} {formatGame(total)} </Text>
                    <Text> Win: {win} {formatGame(win)} - Lose: {lose} {formatGame(lose)} - Tie: {tie} {formatGame(tie)}  </Text>

                    <PieChart
                        chart_wh={chart_wh}
                        series={series}
                        sliceColor={sliceColor}
                        coverRadius={0.45}
                        style={{ marginTop: 20 }}
                    />

                    <View style={{ flexDirection: "row", height: 20, marginTop: 10 }}>
                        <View style={{ width: 40, backgroundColor: '#F44336' }}></View>
                        <Text style={{ marginLeft: 15 }}>Win: {roundNumber(win * 100 /total)}%</Text>
                    </View>
                    <View style={{ flexDirection: "row", height: 20, marginTop: 5 }}>
                        <View style={{ width: 40, backgroundColor: '#2196F3' }}></View>
                        <Text style={{ marginLeft: 15 }}>Lose: {roundNumber(lose * 100 / total)}%</Text>
                    </View>
                    <View style={{ flexDirection: "row", height: 20, marginTop: 5 }}>
                        <View style={{ width: 40, backgroundColor: '#FFEB3B' }}></View>
                        <Text style={{ marginLeft: 15 }}>Tie: {roundNumber(tie * 100 / total)}%</Text>
                    </View>

                    <TouchableHighlight
                        onPress={toggleShowModal}
                        style={{ marginTop: 15 }}
                    >
                        <Text style={{ textDecorationLine: 'underline' }}>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    )
}

export default History
