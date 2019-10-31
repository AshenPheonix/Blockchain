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

    getChain=async e=>{
        const response = await this._base.get('/chain')
        const data = response.data
        if (data.length==this._stored.count) {
            return
        }else{
            this._stored.count=data.length
            let temp={...this._stored.held}
            data.chain.filter( (item,index)=>index<this._stored.count-1)
                .forEach(link => {
                    link.transactions.forEach(transaction=>{
                        if (transaction.sender in temp) {
                            temp[transaction.sender].coin-=transaction.amount
                            temp[transaction.sender].transactions.push(transaction)
                        }else{
                            temp[transaction.sender].coin= -transaction.amount
                            temp[transaction.sender].transactions=[transaction]
                        }
                        if (transaction.reciever in temp) {
                            temp[transaction.reciever].coin+=transaction.amount
                            temp[transaction.reciever].transactions.push(transaction)
                        }else{
                            temp[transaction.reciever].coin= transaction.amount
                            temp[transaction.reciever].transactions=[transaction]
                        }
                })
            });

            this._stored.held=temp
            return
        }
    }

    getTotal=id=>{
        this.getChain()
        return this._stored.held[id] || 0
    }

    getRelevant=async id=>{
        await this.getChain()
        if (this._stored.held[id]==undefined) {
            return []
        }
        return this._stored.held[id].transactions||[]
    }

    give=async (id,to,amount)=>{
        const req = await this._base.post('/transactions/new',{
            reicipient:to,
            sender:id,
            amount
        })
        const data = await req.data
        return data.message
    }
}

export default new OBSERVER()