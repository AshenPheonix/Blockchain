import React, {useState,useEffect} from 'react'
import con from '../helpers/connector'
import List from './list'

function Home() {

    const [id,setId]=useState(localStorage.getItem('id')),
        [idForm,setIdForm]=useState(id),
        [error,setError]=useState(''),
        [ready,setReady]=useState(false),
        [self,setSelf]=useState({in:[],out:[]}),
        [transFormWho,setTransFormWho]=useState(''),
        [transFormAmt,setTransFormamt]=useState(0),
        [message,setMessage]=useState('')

    const changeId=e=>{
        if (idForm.length>0) {
            localStorage.setItem('id', idForm)
            setError('')
            setId(idForm)
        }
        else{
            setError('Invalid ID')
        }
    }

    const [connector,setConnector]=useState(con)

    const startup=async e=>{
        await connector.getChain()
        setReady(true)
    }

    useEffect(e=>{
        startup()
    },[])

    useEffect(e=>{

    })

    const transaction=async e=>{
        e.preventDefault()
        await startup()

        if (transFormWho == '' || transFormAmt < 1) {
            return
        }else{
            const out = await connector.give(id,transFormWho,transFormAmt)
            setTransFormWho('')
            setTransFormamt(0)
            setMessage(out)
        }

    }

    return (
        <section>
            <h1>
                Welcome{(id === null)? '':` ${id}`}!
            </h1>
            <fieldset>
                <legend>Change id?</legend>
                    <input type="text" value={idForm || ''} onChange={e=>{setIdForm(e.target.value)}} placeholder="New Id"/>
                    <button onClick={changeId}>
                        Change Id
                    </button>
                {error.length>0 &&
                    <p>
                        {error}
                    </p>
                }
            </fieldset>
            {ready &&
                <>
                    <section>
                        Current Balance: {id===undefined?'Sign In to View':connector.getTotal(id)}
                    </section>
                    
                    <form onSubmit={transaction} method="post">
                        <input type="text" id='whom' placeholder='to who' value={transFormWho} onChange={e=>setTransFormWho(e.target.value)}/>
                        <input type="number" value={transFormAmt} onChange={e=>setTransFormamt(e.target.value)}/>
                        <button>
                            Give Coins
                        </button>
                        <p>
                            {message}
                        </p>
                    </form>

                    { id &&
                        <>
                            <section>
                                <section>
                                    <h3>
                                        Transactions In
                                    </h3>
                                    <List 
                                        con={connector}
                                        id={id}
                                        dir={'in'}
                                    />
                                </section>
                                <section>
                                    <h3>
                                        Transactions Out
                                    </h3>
                                    <List 
                                        con={connector}
                                        id={id}
                                        dir={'out'}
                                    />
                                </section>
                            </section>
                        
                        </>
                    }
                </>
            }
            { !ready &&
                <p>
                    Loading
                </p>
            }
        </section>
    )
}

export default Home
