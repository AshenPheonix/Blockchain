import axios from 'axios'

class OBSERVER{
    constructor(){
        this._base = axios
        axios.defaults.baseURL="http://localhost:5000"
        this._stored={
            count:0,
            held:{}
        }
    }

    getTotal=async id=>{
        const response = await this._base.get('/chain')
        const data = response.data
        if (data.length==this._stored.count) {
            return this._stored.held[id]
        }else{
            this._stored.count=data.length
            let temp={...this._stored.held}
            data.chain.filter( (item,index)=>index<this._stored.count-1)
                .forEach(link => {
                    link.transactions.forEach(transaction=>{
                        if (transaction.sender in temp) {
                            temp[transaction.sender]-=transaction.amount
                        }else{
                            temp[transaction.sender]= -transaction.amount
                        }
                        if (transaction.reciever in temp) {
                            temp[transaction.reciever]+=transaction.amount
                        }else{
                            temp[transaction.sender]= transaction.amount
                        }
                })
            });

            this._stored.held=temp
            return this._stored.held
        }
    }
}

export default new OBSERVER()