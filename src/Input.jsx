import React, { useState } from "react";

function Input() {
    const [initialInv, setInitialInv] = useState ('');
    const [annualInv, setAnnualInv] = useState ('');
    const [expReturn, setExpReturn] = useState ('');
    const [duration, setDuration] = useState ('');
    const [list, setList] = useState([]);

    const handelEnter = () => {
        if (initialInv.trim() !== "" && annualInv.trim() !== "" && expReturn.trim() !== "" && duration.trim() !== "") {
            const investmentResults = calculateInvestmentResults({
                initialInvestment: parseFloat(initialInv),
                annualInvestment: parseFloat(annualInv),
                expectedReturn: parseFloat(expReturn),
                duration: parseInt(duration),
            });

            setList([...list, { initialInv, annualInv, expReturn, duration, investmentResults }]);
            setInitialInv("");
            setAnnualInv('');
            setExpReturn('');
            setDuration('');
        }
    };
    const handelCancel = () =>{
        setInitialInv("");
        setAnnualInv('');
        setExpReturn('');
        setDuration('');
    }

    const calculateInvestmentResults = ({ initialInvestment, annualInvestment, expectedReturn, duration }) => {
        const annualData = [];
        let investmentValue = initialInvestment;
        let totalInterest = 0;
        let previousYearInterest = 0;
        let investedCapital = initialInvestment;

        for (let i = 0; i < duration; i++) {
            const interestEarnedInYear = investmentValue * (expectedReturn / 100);
            investmentValue += interestEarnedInYear + annualInvestment;
            totalInterest += interestEarnedInYear;
            const currentYearInterest = interestEarnedInYear - previousYearInterest;
            previousYearInterest = interestEarnedInYear;
            investedCapital += annualInvestment;

            annualData.push({
                year: i + 1,
                interest: interestEarnedInYear,
                totalInterest,
                currentYearInterest,
                valueEndOfYear: investmentValue,
                annualInvestment,
                investedCapital,
            });
        }

        return annualData;
    };


    return (
        <>
            <div className="inputboxes">
                <div>
                <label>INITIAL INVESTMENT</label>
                <input type="text" placeholder="Initial Investment"
                    value={initialInv}
                    onChange={(e) => setInitialInv(e.target.value)}
                />
                </div>
                <div>
                <label>ANNUAL INVESTMENT</label>
                <input type="text" placeholder="Annual Investment"
                    value={annualInv}
                    onChange={(e) => setAnnualInv(e.target.value)}
                />
                 </div>
                 <br/>
                 <div>
                <label>EXPECTED RETURN</label>
                <input type="text" placeholder="Expected return "
                    value={expReturn}
                    onChange={(e) => setExpReturn(e.target.value)}
                />
                 </div>
                 <div>
                <label>Duration</label>
                <input type="text" placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                    </div>
                    <br/>
                    <div>
                <button onClick={handelEnter}>Enter</button>
                <button onClick={handelCancel}>clear</button>
                </div>
                 </div>
               
           
            <div >
                <ul >
                    {list.map((item, index) => (
                        <li key={index}>
                           
                            <ul>
                               <h1> Investment Results:</h1>

                                <li >
                                    <table className="input-li">
                                        <thead>
                                            <tr>
                                                <th>Year</th>
                                                <th>Investment Value</th>
                                                <th>Interest(year)</th>
                                                <th>Total Intrest</th>
                                                <th>Investment Capital</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {item.investmentResults.map((result, i) => (
                                                <tr key={i}>
                                                    <td>{result.year}</td>
                                                    <td>{Math.floor(result.valueEndOfYear)}</td>
                                                    <td>{Math.floor(result.interest)}</td>
                                                    <td>{Math.floor(result.totalInterest)}</td>
                                                    <td>{result.annualInvestment}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Input;
