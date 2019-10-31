import React, {useState,useEffect} from 'react'
import con from '../helpers/connector'
import List from './list'
import {Wallet, Form,FieldInput,DeliverForm, TransSection} from '../styles/home'

function Home() {

    const [id,setId]=useState(localStorage.getItem('id')),
        [idForm,setIdForm]=useState(id),
        [error,setError]=useState(''),
        [ready,setReady]=useState(false),
        [transFormWho,setTransFormWho]=useState(''),
        [transFormAmt,setTransFormamt]=useState(0),
        [message,setMessage]=useState('')
        
    const [connector,setConnector]=useState(con)
    
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


    const startup=async e=>{
        await connector.getChain()
        setReady(true)
    }

    useEffect(e=>{
        startup()
    },[])

    const transaction=async e=>{
        e.preventDefault()
        await startup()

        if (transFormWho === '' || transFormAmt < 1) {
            return
        }else{
            const out = await connector.give(id,transFormWho,transFormAmt)
            setTransFormWho('')
            setTransFormamt(0)
            setMessage(out)
        }

    }

    return (
        <Wallet>
            <h1>
                Welcome{(id === null)? '':` ${id}`}!
            </h1>
            <Form>
                <legend>Change Id?</legend>
                <FieldInput type="text" value={idForm || ''} onChange={e=>{setIdForm(e.target.value)}} placeholder="New Id"/><br/>
                <button onClick={changeId}>
                    Change Id
                </button>
                {error.length>0 &&
                    <p>
                        {error}
                    </p>
                }
            </Form>
            {ready &&
                <>
                    <section>
                        Current Balance:    <span class={id!==undefined && connector.getTotal(id)>-1 ? 'good':'bad'}>
                                                {id===undefined?'Sign In to View':connector.getTotal(id)}
                                            </span>
                    </section>
                    
                    <DeliverForm onSubmit={transaction} method="post">
                        Add Transaction
                        <FieldInput type="text" id='whom' placeholder='to who' value={transFormWho} onChange={e=>setTransFormWho(e.target.value)}/>
                        <FieldInput type="number" value={transFormAmt} onChange={e=>setTransFormamt(e.target.value)}/>
                        <button>
                            Give Coins
                        </button>
                        <p>
                            {message}
                        </p>
                    </DeliverForm>

                    { id &&
                        <>
                            <TransSection>
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
                            </TransSection>
                        
                        </>
                    }
                </>
            }
            { !ready &&
                <p>
                    Loading
                </p>
            }
        </Wallet>
    )
}

export default Home
