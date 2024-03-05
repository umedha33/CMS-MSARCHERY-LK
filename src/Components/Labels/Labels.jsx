import React, { useContext } from 'react'
import './Labels.css'
import GlobalContext from '../../context/GlobalContext'

const Labels = () => {
    const { labels, updateLabel } = useContext(GlobalContext)

    const getLabelName = (color) => {
        switch (color) {
            case "#ff2200ae":
                return "High Priority"
            case "#e77c74a5":
                return "Urgent"
            case "#ffe227c2":
                return "Personal"
            case "#32b67bc0":
                return "Normal Priority"
            case "#039ae6bb":
                return "Low Priority"
            case "#7985ccd7":
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
                        onChange={() => updateLabel({label: lbl, checked: !checked})}
                    />
                    <span>{getLabelName(lbl)}</span>
                </div>
            ))}
        </div>
    )
}

export default Labels
