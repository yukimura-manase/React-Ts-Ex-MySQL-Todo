import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo } from '../actions/ActionCreator';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { submitTodo, stateType } from './ComponentsTypes';

import { createStyles, makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(()=>{
    return createStyles({
        "title":{
            width:"100%",
            textAlign:"center",
            color:"#3399FF",
            fontSize:"40px"
        },
        "text":{
            textAlign:"center",
            fontWeight:600
        },
        "tableWidth":{
            width:"80%",
            margin:"3px auto",
            paddingTop:"30px",
            paddingBottom:"30px",
            // border:"solid 3px",
            // borderColor: "#3399FF",
        },
        "h3":{
            fontSize:"25px"
        },
        "button": {
            borderColor: "#3399FF",
            color: "#3399FF",
            fontWeight: 600,
            marginTop: "20px",
            marginRight:"8px",
            marginBottom: "8px",
            backgroundColor: "white",
            padding: "10px",
            "&:hover": {
                backgroundColor: "#3399FF",
                color: "white"
            }
        },
        "input": {
            width: "30%",
        },
        "error1": {
            color:"black",
            fontSize:"22px"
        },
        "error2": {
            color:"blue",
            fontSize:"20px"
        }

    });
});

const loginUserSelector = (state: stateType)=> {
    return state.StoreState.user;
    
};

export const TodoCreate: React.FC = ()=> {

    const classes = useStyle();

    const user = useSelector(loginUserSelector);

    const dispatch = useDispatch();

    const history = useHistory();
    const handleLink = (path: string)=> { return history.push(path)};
    
    const [inputtodo,setTodo] = useState<string>('');
    const inputTodo = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setTodo(event.target.value); // ???????????????
    };

    const [inputdetail,setTodoDetail] = useState<string>('')
    const inputDetail = (event: any)=>{
        setTodoDetail(event.target.value) // ??????????????????
    }

    const [inputhandler,setHandler] = useState<string>('')
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setHandler(event.target.value) // ?????????
    }

    const [inputdate,setDate] = useState<string>('')
    const inputDate = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setDate(event.target.value) // ??????
    }

    const [inputstart,setStart] = useState<string>('')
    const inputStart = (event: React.ChangeEvent<HTMLInputElement>)=> {
        setStart(event.target.value) // ?????????
    }

    // ???????????????????????????????????????
    const inputTodoValidate = (inputtodo: string)=> {
        let pattern = /^[\s\S\d]{1,20}$/  // ????????????????????????(?????????)?????????  //????????????????????????????????????????????????1????????????20????????????????????????
        return pattern.test(inputtodo)
    }

    // ????????????????????????????????????
    const inputDetailValidate = (inputdetail: string)=> {
        let pattern = /^[\s\S\d]{1,300}$/
        return pattern.test(inputdetail)
    }

    // ?????????????????????????????????
    const inputHandlerValidate = (inputhandler: string)=> {
        let pattern = /^[\s\S\d]{1,10}$/
        return pattern.test(inputhandler)
    }

    // ??????????????????????????????
    const inputDateValidate = (inputdate: string)=>{

        //console.log('??????????????????????????????');

        let today = new Date(); // ????????????????????? => Date????????????????????????????????????
        //console.log(today);

        let today2: any = new Date( // ??????????????????????????????????????????(?????????)??????????????????
            today.getFullYear(), //???
            today.getMonth(), //???
            today.getDate() //???
        );

        let nowDay = Date.parse(today2);
        //console.log(nowDay);

        //console.log(inputdate);
        let limitDate: any = new Date(inputdate);
        //console.log(limitDate);

        let limitDay = Date.parse(limitDate);
        //console.log(limitDay);

        //console.log(limitDay - nowDay);

       if(limitDay - nowDay >= 0){
            return true;
       } else {
           return false;
       };

    }

    // ?????????????????????????????????
    const inputStartValidate = (inputstart: string)=> {

        //console.log('?????????????????????????????????');

        let today = new Date(); // ????????????????????? => Date????????????????????????????????????

        let today2 = new Date( // ??????????????????????????????????????????(?????????)??????????????????
            today.getFullYear(), //???
            today.getMonth(), //???
            today.getDate() //???
        );

        let nowDay = Number(today2);
        //console.log(nowDay);

        let startDate = new Date(inputstart);

        let startDay = Number(startDate);
        //console.log(startDay);
        
        //console.log(startDay - nowDay);
       if(startDay - nowDay >= 0){
            return true
       } else {
           return false
       };

    };

    const compareLimitStart = (inputdate: string, inputstart: string)=> {

        //console.log('??????????????????????????????????????????');
        
        let limitDate = new Date(inputdate);

        let limit = Number(limitDate);
        //console.log(limit);

        let startDate = new Date(inputstart);

        let start = Number(startDate);
        //console.log(start);

        console.log(limit - start);
        if(limit - start >= 0){
            return true;
        } else {
            return false;
        };


    };

    const [errors, setError] = useState<string[]>([]) // string????????????????????????????????????

    // ????????????????????????????????????
    const submitTask = ()=>{

        setError([]) // ?????????

        let errorlist: string[] = []

        if(inputtodo === ''){
            errorlist.push('??????????????????????????????????????????')
        } else if( !inputTodoValidate(inputtodo) ){ // ?????????????????????????????????
            errorlist.push('?????????????????????1????????????20??????????????????????????????????????????')
        }

        if(inputdetail === ''){
            errorlist.push('???????????????????????????????????????')
        } else if( !inputDetailValidate(inputdetail) ){ // ?????????????????????????????????
            errorlist.push('??????????????????1????????????300??????????????????????????????????????????')
        }

        if(inputhandler === ''){
            errorlist.push('????????????????????????????????????')
        } else if( !inputHandlerValidate(inputhandler) ){ // ?????????????????????????????????
            errorlist.push('???????????????1????????????10??????????????????????????????????????????')
        }

        if(inputdate === ''){
            errorlist.push('?????????????????????????????????')
        } else if( !inputDateValidate(inputdate) ) { // ?????????????????????????????????
            errorlist.push('??????????????????????????????????????????????????????')
        }

        if(inputstart === ''){
            errorlist.push('????????????????????????????????????') 
        } else if( !inputStartValidate(inputstart) ) { // ?????????????????????????????????
            errorlist.push('?????????????????????????????????????????????????????????')
        };

        if(inputdate === '' || inputstart === ''){
            console.log('?????????');
        } else if( !compareLimitStart(inputdate, inputstart) ){ // false????????????????????????????????????
            errorlist.push('?????????????????????????????????????????????????????????');
        };

        setError(errorlist); // ???????????????????????????????????????????????????????????????????????????

        const server = 'http://localhost:8000/api/create';

        if(errorlist.length === 0 && user instanceof Object){ // typeof???????????????null???object??????????????????

            const submitData: submitTodo = {
                user_id: user.id,
                todo:inputtodo,
                detail:inputdetail,
                handler:inputhandler,
                date:inputdate,
                start:inputstart
            };

            axios.post(server,submitData)
                .then( (response: any)=> {

                    let axiosData:any = [];
                
                    axiosData.push(...response.data);

                    dispatch(
                        addNewTodo(axiosData)
                    );

                })
                .catch( (error)=>{
                    console.log(error);
                });

            handleLink('/list');
        };

    };

    return (
        <React.Fragment>

            { user === null ? <h2 className={ classes.title} >????????????????????????</h2>:
                <React.Fragment>
                    <h2 className={ classes.title} >Todo????????????</h2>

                    <div className={ classes.text} >
                        <table className={ classes.tableWidth }>
                            <tbody>
                                <tr>
                                    <td>
                                        <h3 className={ classes.h3 } >???????????????</h3>
                                        <input value={inputtodo} placeholder='???????????????????????????' onChange={(event)=>{ inputTodo(event) }} className={ classes.input } />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3 className={ classes.h3 } >??????????????????</h3>
                                        <textarea value={inputdetail} placeholder='??????????????????' onChange={(event)=>{ inputDetail(event) }} className={ classes.input } />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3 className={ classes.h3 } >?????????</h3>
                                        <input value={inputhandler} placeholder='??????????????????' onChange={(event)=>{ inputHandler(event) }} className={ classes.input } />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3 className={ classes.h3 } >??????(Todo????????????????????????????????????)</h3>
                                        <input type='date' value={inputdate} onChange={(event)=>{ inputDate(event) }} className={ classes.input } />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3  className={ classes.h3 } >?????????</h3>
                                        <input type='date' value={inputstart} onChange={(event)=>{ inputStart(event) }} className={ classes.input } />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button onClick={ ()=>{submitTask()} } className={ classes.button } >Todo??????????????????</button>
                                        <div>
                                            {errors.map(
                                                (error,index)=> {
                                                    return (
                                                        <div key={index}>
                                                            <h4 className={classes.error1} >???????????????{index + 1}</h4>
                                                            <h5 className={classes.error2} >{error}</h5>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            }
            
        </React.Fragment>
    )
}

// ???????????????????????????
// ??????????????????????????????????????????????????????????????????????????????????????????????????????????????? => ?????????
// ?????????????????????????????????????????????????????? => ?????????

// ????????????????????????????????????????????? => ??????????????????????????????????????? => ????????????????????????????????????

// -????????????????????? 1????????????20???????????????=> ?????????

// -????????????????????????1????????????300???????????? => ?????????

// -????????????1????????????10???????????? => ?????????

// -????????????????????????yyyy/mm/dd ?????????????????????????????????????????? => ???????????????????????????????????????????????? ?????????????????? => ?????????