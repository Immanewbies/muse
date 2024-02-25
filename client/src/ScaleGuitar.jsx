import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ScaleGuitar() {
    const [scales, setScales] = useState([])
    const [filterValues, setFilterValues] = useState({
        scale_note: '',
        scale_tension: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8081/chord/findscale', filterValues);
                setScales(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filterValues]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
            <h1>Scale Page</h1>
            <div>
                <label htmlFor="scaleNote">Scale Note:</label>
                <select id="scaleNote" name="scale_note" onChange={handleFilterChange} value={filterValues.scale_note}>
                    <option value="">Select</option>
                    <option value="C">C</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div>
                <label htmlFor="scaleTension">Scale Tension:</label>
                <select id="scaleTension" name="scale_tension" onChange={handleFilterChange} value={filterValues.scale_tension}>
                    <option value="">Select</option>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div>
                {scales.map((scale, index) => (
                    <div key={index}>
                        <p>Scale Name: {scale.scale_name}</p>
                        <p>Scale Note: {scale.scale_note}</p>
                        <p>Scale Tension: {scale.scale_tension}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScaleGuitar