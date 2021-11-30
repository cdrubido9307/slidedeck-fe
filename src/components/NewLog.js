// Import CSS
import "./css/NewLog.css";
// Import major dependencies
import React, { useState } from "react";
// Import components
import FileBrowser from "./FileBrowser";
// Import icons
// Import API and static content

const NewLog = (props) => {

    const [selectedTemplate, setSelectedTemplate] = useState(undefined);

    const onTemplateClick = (file) => {
        console.log(file);
    }

    return(
        <div className="new-log">
            <div className="template-select backdrop">
                <div className="backdrop-header">
                    Select a template to be used by new log
                </div>
                <div className="-mx-4 flex flex-col md:flex-row">
                    <div className="template-list">
                        <FileBrowser 
                            mini
                            onSelect={onTemplateClick}
                            view={1} 
                            from="all" 
                            type="template"
                        />
                    </div>
                    <div className="template-preview">
                        {!selectedTemplate &&
                            <p className="subtitle italic">No template selected</p>
                        }
                    </div>
                </div>

                
            </div>
        </div>
    )

}

export default NewLog;