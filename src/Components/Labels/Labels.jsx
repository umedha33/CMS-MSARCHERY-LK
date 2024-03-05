import React, { useContext } from 'react'
import './Labels.css'
import GlobalContext from '../../context/GlobalContext'

const Labels = () => {
    const { labels } = useContext(GlobalContext)

    const getLabelName = (color) => {
        switch (color) {
            case "#ff2300":
                return "High Priority"
            case "#e77c74":
                return "Urgent"
            case "#ffe227":
                return "Personal"
            case "#32b67a":
                return "Normal Priority"
            case "#039be6":
                return "Low Priority"
            case "#7986cc":
                return "Informational"
            default:
                return "Unknown Label";
        }
    }

    return (
        <div className='lbl-container'>
            <p>Labels</p>
            {labels.map(({ label: lbl, checked }, idx) => (
                <div key={idx} className="labl" style={{ backgroundColor: lbl }}>
                    <input
                        type="checkbox"
                        checked={checked}
                    />
                    <span>{getLabelName(lbl)}</span>
                </div>
            ))}
        </div>
    )
}

export default Labels
