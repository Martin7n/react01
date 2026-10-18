


export default checkContents {


    dataCheck(data){
        const cleanedRecord = data.trim()
        const isValid = false;
        if (cleanedRecord.lengt<3){
            return { isValid: false,
        }}


        return {isValid: true,
            data: cleanedRecord
        }


    };





};