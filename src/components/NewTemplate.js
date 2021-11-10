// Import CSS
import "./css/NewTemplate.css";
// Import major dependencies
import React, { createContext, useContext, useEffect, useState } from "react";
// Import components
import TextBox from "./TextBox";
import Auth from "./Auth";
import LoadSpinner from "./LoadSpinner";
// Import icons
import { FaTimes, FaPlus, FaArrowLeft, FaArrowRight, FaRegHandPointer } from "react-icons/fa";
import { IoArrowUndo, IoArrowRedo, IoCalendarSharp } from "react-icons/io5";
import { RiStethoscopeFill, RiMicroscopeFill } from "react-icons/ri";
import { BiText } from "react-icons/bi";
import { AiOutlineFieldNumber } from "react-icons/ai";
// Import API and static content
import api from "../static/api";
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import utils from "../static/utils";

const TemplateContext = createContext();

const defaultColObj = () => {
    const state = {
        name: "Untitled Column",
        type: "text"
    }
    return state;
}

const defaultColGroupObj = () => {
    const state = {
        role: -1,
        columns: []
    }
    return state;
}

const defaultTemplate = () => {
    const template = [];
    for (let i = 0; i < 2; i++) {
        template.push(defaultColGroupObj());
    }
    return template;
}

const Column = (props) => {

    const templateContext = useContext(TemplateContext);
    const activeCol = templateContext.active;
    const myGroupIndex = props.pIndex;
    // const myGroup = templateContext.state[props.myGroupIndex];
    const myColumn = props.col;
    const myColumnIndex = props.index;
    const myTuple = [myGroupIndex, myColumnIndex];
    const isActive = myGroupIndex === activeCol[0] && myColumnIndex === activeCol[1];
    
    let typeIcon;
    switch (myColumn.type) {
        case "text":
            typeIcon = <BiText/>;
            break;
        case "number":
            typeIcon = <AiOutlineFieldNumber/>;
            break;
        case "date":
            typeIcon = <IoCalendarSharp/>;
            break;
        default:
            typeIcon = <BiText/>;
            break;
    }

    const changeActiveCol = () => {
        templateContext.setActive(myTuple);
    }

    return (
        <button onClick={() => {changeActiveCol(myColumnIndex)}} className={"col " + (isActive ? "active" : "")}>
            <p className="col-heading">G{myGroupIndex+1} C{myColumnIndex+1} {typeIcon}</p>
            <p className="col-name">{myColumn.name}</p>
        </button>
    )
}

const ColumnEditor = (props) => {
    const templateContext = useContext(TemplateContext);
    const myGroupIndex = templateContext.active[0];
    const myColIndex = templateContext.active[1];
    const valid = myGroupIndex > -1 && myColIndex > -1;
    const myCol = valid ? templateContext.state[myGroupIndex].columns[myColIndex] : undefined;
    const myDataType = valid ? templateContext.state[myGroupIndex].columns[myColIndex].type : "text";
    let activeType = -1;
    switch (myDataType) {
        case "text":
            activeType = 0;
            break;
        case "number":
            activeType = 1;
            break;
        case "date":
            activeType = 2;
            break;
        default:
            activeType = 0;
            break;
    }

    const changeDataType = (type) => {
        templateContext.setState((template) => {
            const clone = utils.clone(template);
            clone[myGroupIndex].columns[myColIndex].type = type;
            return clone;
        })
    }

    const changeColName = (e) => {
        templateContext.setState((template) => {
            const clone = utils.clone(template);
            clone[myGroupIndex].columns[myColIndex].name = e.target.value;
            return clone;
        })
    }

    const Neighbor = (props) => {
        const neighborIndex = props.left ? myColIndex - 1 : myColIndex + 1;
        if (neighborIndex >= 0 && neighborIndex < templateContext.state[myGroupIndex].columns.length) {
            const neighbor = templateContext.state[myGroupIndex].columns[neighborIndex];
            return (
                <>
                    <div className="ce-header">
                        <p>G{myGroupIndex+1} C{neighborIndex+1}</p>
                    </div>
                    <div className="ce-content">
                        <p className="truncate py-1">{neighbor.name}</p>
                        <div className="flex items-center justify-center h-8 truncate space-x-1">
                            {neighbor.type === "text" && <BiText className="h-4 w-4"/>}
                            {neighbor.type === "number" && <AiOutlineFieldNumber className="h-4 w-4"/>}
                            {neighbor.type === "date" && <IoCalendarSharp className="h-4 w-4"/>}
                            <p className="truncate text-sm capitalize">{neighbor.type}</p>
                        </div>
                    </div>
                </>
            )
        } else {
            return <></>
        }
    }

    return(
        <div className="column-editor">
            {valid && 
                <>
                    <div className="ce-controls">

                    </div>
                    <div className="ce-left">
                        <Neighbor left/>
                    </div>
                    <div className="ce-center">
                        <div className="ce-header">
                            <p>Group {myGroupIndex+1} Column {myColIndex+1}</p>
                        </div>
                        <div className="ce-content">
                            <div className="flex items-center space-x-2 truncate">
                                <p className="subtitle truncate">Column Name</p>
                                <div className="flex-grow">
                                    <TextBox 
                                        onChange={changeColName}
                                        type="text" 
                                        placeholder="Column Name" 
                                        className="w-full"
                                        value={myCol.name}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 truncate">
                                <p className="subtitle truncate">Column Data Type</p>
                                <div className="flex-grow"/>
                                <ButtonGroup active={activeType} buttons={[
                                    <Button onClick={() => {changeDataType("text")}} icon={BiText}>Text</Button>,
                                    <Button onClick={() => {changeDataType("number")}} icon={AiOutlineFieldNumber}>Number</Button>,
                                    <Button onClick={() => {changeDataType("date")}} icon={IoCalendarSharp}>Date</Button>
                                ]}/>
                            </div>
                        </div>
                    </div>
                    <div className="ce-right">
                        <Neighbor right/>
                    </div>
                </>
            }
        </div>
    )
}

const ColumnGroup = (props) => {

    const templateContext = useContext(TemplateContext);
    const myGroup = props.group;
    const myColumns = myGroup.columns;

    const addNewColumn = () => {
        const newCol = templateContext.default.column();
        newCol.name += ` ${myColumns.length + 1}`;
        templateContext.setState((template) => {
            const newTemplate = utils.clone(template);
            newTemplate[props.index].columns.push(newCol);
            return newTemplate;
        });
    }
    const addNewColumnGroup = (i) => {
        const newColGroup = templateContext.default.group();
        templateContext.setState((template) => {
            const newTemplate = utils.clone(template);
            newTemplate.splice(i, 0, newColGroup);
            return newTemplate;
        });
        if (i === templateContext.active[0]) {
            templateContext.setActive((active) => {
                const clone = utils.clone(active);
                clone[0] += 1;
                return clone;
            });
        }
    }
    const removeColumnGroup = () => {
        if (templateContext.state.length > 1) {
            if (myColumns.length === 0) {            
                templateContext.setState((template) => {
                    const newTemplate = utils.clone(template);
                    newTemplate.splice(props.index, 1);
                    return newTemplate;
                });
                if (props.index === templateContext.active[0]) {
                    templateContext.setActive([-1, -1]);
                } else if (props.index < templateContext.active[0]) {
                    templateContext.setActive((active) => {
                        const clone = utils.clone(active);
                        clone[0] -= 1;
                        return clone;
                    });
                }
            } else {
                alert("Column group is not empty.");
            }
        } else {
            alert("Can't remove only column group.");
        }
    }
    const shiftColumnGroup = (i) => {
        const targetHasActive = i === templateContext.active[0];
        const selfHasActive = props.index === templateContext.active[0];
        if (i >= 0 && i <= templateContext.state.length-1) {
            const myClone = utils.clone(myGroup);
            const swapClone = utils.clone(templateContext.state[i]);
            templateContext.setState((template) => {
                const newTemplate = utils.clone(template);
                newTemplate.splice(i, 1, myClone);
                newTemplate.splice(props.index, 1, swapClone);
                return newTemplate;
            });
            templateContext.setActive((active) => {
                const clone = utils.clone(active);
                if (targetHasActive) clone[0] = props.index;
                if (selfHasActive) clone[0] = i;
                return clone;
            })
        } else {
            alert("Can't shift past end of list.");
        }
        
    }
    const setGroupRole = (m) => {
        templateContext.setState((template) => {
            const newTemplate = utils.clone(template);
            newTemplate[props.index].role = m;
            return newTemplate;
        });
    }

    return (
        <div className="col-group-wrapper">
            <div className="col-group-controls">
                <div className="col-group-buttons">
                    <button onClick={() => {addNewColumnGroup(props.index)}} className="add-left">
                        <FaPlus/>
                        <div className="button-caret"/>
                    </button>
                    <span>
                        <button onClick={() => {shiftColumnGroup(props.index-1)}} className="move-left">
                            <FaArrowLeft/>
                        </button>
                        <button onClick={() => {removeColumnGroup()}} className="remove-self">
                            <FaTimes/>
                            <div className="button-caret"/>
                        </button>
                        <button onClick={() => {shiftColumnGroup(props.index+1)}} className="move-right">
                            <FaArrowRight/>
                        </button>
                    </span>
                    <button onClick={() => {addNewColumnGroup(props.index+1)}} className="add-right">
                        <FaPlus/>
                        <div className="button-caret"/>
                    </button>
                </div>
            </div>
            <div className="col-group">
                <div className="col-group-header">
                    <div className="flex-grow"/>
                    <span>
                        <p className="col-group-title">Group {props.index+1} to be completed by</p>
                        <ButtonGroup active={myGroup.role} buttons={[
                            <Button onClick={() => {setGroupRole(0)}} icon={RiMicroscopeFill}>Technician</Button>,
                            <Button onClick={() => {setGroupRole(1)}} icon={RiStethoscopeFill}>Pathologist</Button>
                        ]}/>
                    </span>
                    <div className="flex-grow"/>
                </div>
                <div className="bracket">
                    <div className="left"/>
                    <div className="extension"/>
                    <div className="center"/>
                    <div className="extension"/>
                    <div className="right"/>
                </div>
                <div className="columns-header">
                    <p></p>
                </div>
                <div className="columns">
                    {myColumns.map((col, i) => {return(
                        <Column col={col} pIndex={props.index} index={i} key={i}/>
                    )})}
                    <div className="new-col">
                        <button
                            onClick={() => {addNewColumn(props.index)}}
                        >
                            <FaPlus/>
                            <p>
                                New Column
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const NewTemplate = (props) => {

    const AuthContext = useContext(Auth.Context);
    const [loading, setLoading] = useState(true);
    const [fileName, setFileName] = useState("New Template");
    const [templateState, setTemplateState] = useState(defaultTemplate());
    const [activeCol, setActiveCol] = useState([-1, -1]);
    const contextVal = {
        state: templateState,
        setState: setTemplateState,
        active: activeCol,
        setActive: setActiveCol,
        default: {
            group: defaultColGroupObj,
            column: defaultColObj,
        }
    }
    const appendFileNum = (data) => {
        setFileName((name) => {
            const newName = `${name} ${data.result.length}`;
            return newName;
        });
        setLoading(false);
    }
    const updateFileName = (e) => {
        const value = e.target.value;
        setFileName(value);
    }
    // Init
    useEffect(() => {
        api.get_template(AuthContext.user.token, appendFileNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <TemplateContext.Provider value={contextVal}>
            <div className="backdrop new-template">
                <div className="backdrop-header">
                    <span>
                        <p>Template Name</p>
                        <TextBox 
                            value={fileName} 
                            onChange={updateFileName}
                            type="text" 
                            placeholder="New Name"
                            className="w-64"
                        />
                    </span>
                    {loading && <LoadSpinner/>}
                    <div className="flex-grow"/>
                    <span>
                    <Button icon={IoArrowUndo}>Undo</Button>
                    <Button icon={IoArrowRedo}>Redo</Button>
                    </span>
                </div>
                <div className="template-editor">
                    <div className="top-message">
                        <FaRegHandPointer className="transform rotate-180"/>
                        <p>Mouse over a column group below for more controls.</p>
                    </div>
                    <div className="group-blocks">
                        {templateState.map((group, i) => {return(
                            <ColumnGroup group={group} index={i} key={i}/>
                        )})}
                    </div>
                    <div className="bottom-message">
                        <FaRegHandPointer/>
                        <p>Select a column for more options.</p>
                    </div>
                    <ColumnEditor/>
                </div>
            </div>
        </TemplateContext.Provider>
    )

}

export default NewTemplate;