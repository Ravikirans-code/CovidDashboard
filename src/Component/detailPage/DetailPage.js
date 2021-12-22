import React from 'react';
import './detailPage.css';
class DeatilPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return <div className="row detailPage">

            <table className="center" >
                <tr>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Delta</th>
                    <th>Delta 7</th>
                </tr>
                {Object.entries(this.props.data[1].dates).map(([key, value]) => {
                    return <tr>
                        <td>{key}</td>
                        {value ? <>
                            {value.total ? <td >
                                {Object.entries(value.total).map(([key, value]) => {
                                    return <tr className="noBorder">
                                        <td >{key} : </td>
                                        <td>{value}</td>
                                    </tr>
                                })
                                }


                            </td> : <td>NA</td>}
                            {value.delta ? <td >
                                {Object.entries(value.delta).map(([key, value]) => {
                                    return <tr className="noBorder">
                                        <td >{key} : </td>
                                        <td>{value}</td>
                                    </tr>
                                })
                                }


                            </td> : <td>NA</td>}
                            {value.delta7 ? <td >
                                {Object.entries(value.delta7).map(([key, value]) => {
                                    return <tr className="noBorder">
                                        <td >{key} : </td>
                                        <td>{value}</td>
                                    </tr>
                                })
                                }


                            </td> : <td>NA</td>}

                        </> : <td>NA</td>
                        }
                    </tr>
                })}
            </table>

        </div>

    }
}

export default DeatilPage;
