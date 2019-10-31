import React, {useState,useEffect} from 'react'
import con from '../helpers/connector'

function Home() {

    const [id,setId]=useState(localStorage.getItem('id')),
        [idForm,setIdForm]=useState(id),
        [error,setError]=useState(''),
        [ready,setReady]=useState(false)

    const changeId=e=>{
        if (e.currentTarget.value.length>0) {
            localStorage.setItem('id', e.currentTarget.value)
            setError('')
            setId(e.currentTarget.value)
        }
        else{
            setError('Invalid ID')
        }
    }

    const [connector,setConnector]=useState(con)

    useEffect(e=>{
        const startup=async e=>{
            await connector.getTotal()
            setReady(true)
        }
        startup()
    },[])

    return (
        <section>
            <h1>
                Welcome{(id!==undefined)? '':` ${id}`}!
            </h1>
            <fieldset>
                <legend>Change id?</legend>
                    <input type="text" value={idForm || ''} onChange={e=>{setIdForm(e.currentTarget.value)}} placeholder="New Id"/>
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
                        Current Balance:
                    </section>
                    <section>
                        <section>
                            <h3>
                                Transactions In
                            </h3>
                        </section>
                        <section>
                            <h3>
                                Transactions Out
                            </h3>
                        </section>
                    </section>
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
