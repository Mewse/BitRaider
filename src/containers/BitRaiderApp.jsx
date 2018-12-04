import React from 'react';

import Drive from '../components/Drive';

const RAID = {
    TYPE_0: "0",
    TYPE_1: "1",
    TYPE_10: "10",
    TYPE_4: "4",
    TYPE_5: "5"
}
const STATES = {
    HEALTHY: "1",
    OFFLINE: "0"
}
const dataTypes = {
    DATA: "data",
    PARITY: "parity"
}

class BitRaiderApp extends React.Component {
    state = {
        data: {
            "1": ["01001100", "01001100", "01001100", "01001100", "01001100"],
            "2": ["01001100", "01001100"],
            "3": ["01001100"],
            "4": ["01001100", "01001100", "01001100", "01001100"]
        },
        lookup: {
            "1": {"0": "0x1","1": "0x1","2": "0x1","3": "0x1","4": "0x1","5": "0x1","6": "0x1","7": "0x1"},
            "2": [],
            "3": [],
            "4": []
        },
        index: {
            "0x1": {
                chunks: [{startAddress: "1x0",length: 8}, ],
                parityChunks: [{startAddress: "2x0", length: 16}]
            }
        },
        driveSize: 64,
        driveStates: {
            "1": STATES.HEALTHY,
            "2": STATES.HEALTHY,
            "3": STATES.HEALTHY,
            "4": STATES.OFFLINE
        },
        numDrives: 4,
        writeHeads: {"1": 8, "2":0, "3":0, "4":0},
        lastWrite: 1,
        raidType: RAID.TYPE_5,
        raidTypes: Object.keys(RAID),
        parityDrive: null
    };

    write(data) {
        const size = data.length;

        // Determine parity drive
    }

    writeParityDedicated(data) {

    }

    writeParityDynamic(data) {

    }

    stripe(data, drives) {

    }

    mirror(data, drives) {

    }
    render() {
        return (
            <div>
                <div>
                    <Drive data={this.state.data['1']} />
                    <Drive data={this.state.data['2']} />
                    <Drive data={this.state.data['3']} />
                    <Drive data={this.state.data['4']} />
                </div>
                <div>
                    <input type="text"/>
                    <input type="submit"/>
                </div>
            </div>
        )
    }
}

export default BitRaiderApp;