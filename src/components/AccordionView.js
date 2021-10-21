import Form from "@rjsf/core";
import { useEffect, useState } from "react";

const schemaFromBFF = {
    medicalQuestion: {
        fname: {
            type: "string",
        },
        mname: {
            type: "string",
        },
        lname: {
            type: "string",
        },
    },
    covidQuestions: {
        age: {
            type: "number",
        },
        kname: {
            type: "string",
        },
        bname: {
            type: "string",
        },
    },
    miscellaneous: {
        iname: {
            type: "string",
        },
        wage: {
            type: "number",
        },
    }
}

const getFormSchema = () => {
    const schemaObj = {};
    Object.keys(schemaFromBFF).forEach(item => {
        schemaObj[item] = {
            title: `Sample Form for ${item}`,
            description: `Sample Description for ${item}`,
            type: "object",
            properties: schemaFromBFF[item],
            required: ['fname']
        }
    })
    return schemaObj;
}

const getFormData = () => {
    const dataObj = {};
    Object.keys(schemaFromBFF).forEach(item => { dataObj[item] = {} });
    return dataObj;
};

const getOpenedSection = () => {
    const openStatus = {};
    Object.keys(schemaFromBFF).forEach(item => { openStatus[item] = false });
    return openStatus;
};

const AccordionView = () => {
    const [schemas] = useState(getFormSchema());
    const [formData] = useState(getFormData());
    const [selectedAccordionPanel, setSelectedAccordionPanel] = useState(null);
    const [openedSection, setOpenedSection] = useState(getOpenedSection());

    useEffect(() => {
        const initialForm = Object.keys(schemas)[0];
        setSelectedAccordionPanel(initialForm);
    }, []);

    useEffect(() => {
        console.log(selectedAccordionPanel)
        const updatedSection = {
            ...openedSection,
            [selectedAccordionPanel]: true
        }
        setOpenedSection(updatedSection);
    }, [selectedAccordionPanel])

    const onSubmit = (data, item) => {
        console.log(data, item);
    }

    const getFormInDocument = () => {
        return Object.keys(schemas).map((item) => {
            const klass = item === selectedAccordionPanel ? 'open' : 'hide';
            return (
                <>
                    <h2 onClick={() => setSelectedAccordionPanel(item)}>{item}</h2>
                    <div className={`accordion-panel ${klass}`}>
                        <Form key={item} formData={formData[item]} schema={schemas[item]} onSubmit={(data, item) => onSubmit(data, item)} />
                    </div>
                </>
            )
        });
    }

    return (
        <>
            <h3>Form with accordion</h3>
            <div className="accordion">{getFormInDocument()}</div>
        </>
    )
}

export default AccordionView;