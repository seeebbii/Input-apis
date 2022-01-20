import mongoose from "mongoose";
const HistorySchema = mongoose.Schema;

const history = new HistorySchema({
    
    socketId: String,
    connectionStatus: String,
    userName: String,
    userId: String,

},  { timestamps: true })

const HistorySchemaInstance = mongoose.model('HistorySchema', history);

export default HistorySchemaInstance;