import { StartFunc as QrCodes } from './QrCodes.js';
import { StartFunc as BranchScan } from './BranchScan.js';

let StartFunc = () => {
    const QrCodeData = QrCodes();

    const BranchScanData = BranchScan();

    let jVarLocalTransformedData = jFLocalMergeFunc({
        inQrData: QrCodeData,
        inScandata: BranchScanData
    });

    return jVarLocalTransformedData;
};

let jFLocalMergeFunc = ({ inQrData, inScandata }) => {

    let jVarLocalReturnObject = inQrData.map(loopQr => {
        const match = inScandata.some(loopScan => loopScan.QrCodeId == loopQr.pk);

        return {
            QrCodeId: loopQr.pk,
            ItemName: loopQr.ItemName,
            Rate: loopQr.Rate,
            FactorySelected: loopQr.FactorySelected,
            OrderNo: loopQr.GenerateReference.ReferncePk,
            DeliveryDateTime: loopQr.DeliveryDateTime,
            location: loopQr.location,
            OrderDateTime: loopQr.BookingData.OrderData.Currentdateandtime,
            Status: match,
            TimeSpan: TimeSpan({ DateTime: loopQr.BookingData.OrderData.Currentdateandtime })
        };
    });


    return jVarLocalReturnObject;
};

function TimeSpan({ DateTime }) {
    var diffMs = new Date() - new Date(DateTime);
    var diffMonths = Math.floor(diffMs / 2629800000); // approximate months (30.44 days)
    var diffDays = Math.floor((diffMs % 2629800000) / 86400000);
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.round((diffMs % 3600000) / 60000);

    if (diffMonths > 0) {
        return diffMonths + " months, " + diffDays + " days, " + diffHrs + " hours, " + diffMins + " min";
    } else if (diffDays > 0) {
        return diffDays + " days, " + diffHrs + " hours, " + diffMins + " min";
    } else if (diffHrs > 0) {
        return diffHrs + " hours, " + diffMins + " min";
    } else {
        return diffMins + " min";
    }
}

export { StartFunc };
