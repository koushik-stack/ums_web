import React, {useEffect, useState} from 'react';
import '../../css/table.css'
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setModalControl} from "../Services/StdModelControl/StdModelControlAction";
import {fetchStudent} from "../Services/Student/StudentAction";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        boxShadow: "none",
        background: "#00C0EF",
        color: "#fff"
    },
    table:{
        '& tbody':{
            '& tr':{
                '&:nth-child(odd)':{
                    background: "#f1ebeb  !important"
                },
                '&:hover':{
                    background: "#a5cdd7" +
                        "  !important"
                }
            }
        }
    }
}));

const tableColumn = [
    "Id",
    "Name",
    "Email",
    // "Programme",
    "Phone"
]


const Table1 = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();



    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const rowEvent = (id) => {
        dispatch(setModalControl(true,id))
        const credential = JSON.parse(localStorage.getItem("credential"))
        dispatch(fetchStudent(id,credential.username,credential.password))


    }
    const ShowPopover = ()=>{
        return(
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>Double click to show Details</Typography>
            </Popover>
        )
    }



    return (
        <div className="table_main">
            <table className={classes.table}>
                <thead>
                <tr>
                    {tableColumn.map((value, index) => {
                        return (
                            <th style={{background:"#ffffff",color:"#151515"}}>{value}</th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                <div className="massage">more info</div>
                {props.person.map((value, index) => {
                    return (
                        <>
                            <tr
                                onDoubleClick={() => {
                                    rowEvent(value.student.id)
                                }}
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            >
                                {ShowPopover()}
                                <td data-label="Id">{value.student.id}</td>
                                <td data-label="Name">{value.student.firstName} {value.student.middleName} {value.student.lastName}</td>
                                <td data-label="Email">{value.student.email}</td>
                                {/*<td data-label="Programme">{value.student.programme.code? value.student.programme.code : value.student.programme}</td>*/}
                                <td data-label="Phone">
                                    {
                                        value.student.phone.map((v)=>{
                                            return(
                                                <>
                                                    {v.phone_no}
                                                    <br/>
                                                </>
                                            )
                                        })
                                    }
                                </td>
                            </tr>

                        </>
                    )
                })}


                </tbody>

            </table>

        </div>
    );
};



export default Table1;