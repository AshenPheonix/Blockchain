import styled from 'styled-components'
import * as v from './vars'

export const Wallet=styled.section`
    ${v.FONT}
    padding:.5rem;
    
    background-color:${v.COLORSET.primary_bg};
    h1{
        background-color:${v.COLORSET.decoration_bg};
        color:${v.COLORSET.decoration};
        padding:1rem;
        text-align:center;
        margin:0;
    }
`

export const Form=styled.fieldset`
    margin:.5rem auto 1rem auto;
    border: groove 2px gray;
    width: 95vw;
    button{
        padding:.5rem;
        margin:auto;
    }
    ${v.TABLET}{
        width:75vw;
    }
`

export const FieldInput=styled.input`
    width:100%;
    padding:.5rem;
    ${v.FONT}
    margin:1rem 0;
    box-shadow:inset 2px 2px 5px ${v.COLORSET.decoration_bg};
`

export const DeliverForm=styled.form`
    border:groove 2px gray;
    width:95vw;
    margin:.5rem auto 1rem auto;
    padding:.5rem;
    button{
        padding:.5rem;
        margin:auto;
    }
    ${v.TABLET}{
        width:75vw;
    }
`

export const List=styled.ul`
    list-style:none;
    li.good{
        color:lightgreen;
    }
    li.bad{
        color:${v.COLORSET.error_text}
    }
`

export const TransSection=styled.section`
    ${v.FLEXBOX('column')}
    section{
        overflow:auto;
        max-height:200px;
        border:groove 2px gray;
        margin:1rem auto;
        min-width:95vw;
        padding:1rem;
    }
    ${v.TABLET}{
        flex-direction:row;
        section{
            max-height:500px;
            overflow:auto;
            min-width:45vw;
        }
    }
`