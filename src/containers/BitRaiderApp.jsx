import React from 'react';
import './BitRaiderApp.css';
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
        // data: {
        //     "1": ["01001100", "01001100", "01001100", "01001100", "01001100"],
        //     "2": ["01001100", "01001100"],
        //     "3": ["01001100"],
        //     "4": ["01001100", "01001100", "01001100", "01001100"]
        // },
        data: {
            "0": [],
            "1": [],
            "2": [],
            "3": []
        },
        lookup: {
            "0": {"0": "0x1","1": "0x1","2": "0x1","3": "0x1","4": "0x1","5": "0x1","6": "0x1","7": "0x1"},
            "1": [],
            "2": [],
            "3": []
        },
        index: {
            "0x1": {
                chunks: [{startAddress: "1x0",length: 8}, ],
                parityChunks: [{startAddress: "2x0", length: 16}]
            }
        },
        driveSize: 32,
        driveStates: {
            "0": STATES.HEALTHY,
            "1": STATES.HEALTHY,
            "2": STATES.HEALTHY,
            "3": STATES.OFFLINE
        },
        numDrives: 4,
        writeHeads: {"0": 0, "1":0, "2":0, "3":0},
        driveHead: "0",
        lastWrite: 1,
        raidType: RAID.TYPE_5,
        raidTypes: Object.keys(RAID),
        parityDrive: null,
        entry: ""
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.write = this.write.bind(this);
    }

    write(data) {
        this.stripe(data, ["0", "2", "3"], "1");
        // Determine parity drive
        // While data to write, loop through drives writing
            // Record indexes of data
            // Update write head 
    }

    writeParityDedicated(data) {

    }

    writeParityDynamic(data) {

    }

    /**
     * Stripe data across multiple arrays at byte level
     * @param {String} data Data to write
     * @param {String[]} drives Drives to write to 
     * @param {String} parityDrive Drive to use for dynamic parity. Not used for static parity drive
     */
    stripe(data, drives, parityDrive) {
        let index = drives.indexOf(this.state.driveHead);
        let writeHeads = this.state.writeHeads;
        let dataArray = data.split('');
        let driveData = this.state.data;
        let parity = 0;
        while (dataArray.length > 0) {
            let char = this.lpad(dataArray.shift().charCodeAt(0).toString(2), 8);
            driveData[drives[index]][writeHeads[index]] = char;
            writeHeads[drives[index]]++;
            parity = parity ^ parseInt(char, 2);
            index = (index + 1) % drives.length;
        }

        driveData[parityDrive][writeHeads[parityDrive]] = "p_" + this.lpad(parity.toString(2), 8);
        writeHeads[parityDrive]++;

        this.setState({
            data: driveData,
            writeHeads: writeHeads,
            driveHead: drives[index]
        });
    }

    mirror(data, drives) {

    }

    lpad (string, length) {
        const currentLength = string.length;
        const requiredPadding = length - currentLength;
        let outString = string;
        for (let i = 0; i < requiredPadding; i++) {
            outString = "0" + outString;
        }
        return outString;
    }

    onChange(entry) {
        this.setState({
            entry
        });
    }

    render() {
        return (
            <div>
                <div className="drive-container">
                    <Drive size={this.state.driveSize} data={this.state.data['0']} />
                    <Drive size={this.state.driveSize} data={this.state.data['1']} />
                    <Drive size={this.state.driveSize} data={this.state.data['2']} />
                    <Drive size={this.state.driveSize} data={this.state.data['3']} />
                </div>
                <div>
                    <input className="data-input" type="text" placeholder="Enter text to write to HDD" value={this.state.entry} onChange={(event) => this.onChange(event.target.value)} />
                    <input className="data-submit" type="submit" value="Write" onClick={(event) => this.write(this.state.entry)}/>
                </div>
            </div>
        )
    }
}

export default BitRaiderApp;