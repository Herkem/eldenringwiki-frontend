// Imports
import { Table } from "react-bootstrap"

// Component that renders a single card containing the information of the class
const ClassCard = ({ newClass }) => {
    return (
        <>
            <article className='classCard d-flex flex-column text-center py-4' style={{ color: '#D9D2B0' }}>
                <div className='imgContainer'>
                    <img src={newClass.image} alt={newClass.name} />
                </div>
                <h3> {newClass.name} </h3>

                <div className="mt-3">
                    <div className='d-flex justify-content-center align-items-center'>
                        <hr className='w-25 me-2'></hr>
                        <h4>Description</h4>
                        <hr className='w-25 ms-2'></hr>
                    </div>
                    <p> {newClass.description} </p>
                </div>

                <div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <hr className='w-25 me-2'></hr>
                        <h4>Level</h4>
                        <hr className='w-25 ms-2'></hr>
                    </div>
                    <p> {newClass.level} </p>
                </div>

                <div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <hr className='w-25 me-2'></hr>
                        <h4>Stats</h4>
                        <hr className='w-25 ms-2'></hr>
                    </div>
                    <Table bordered striped hover>
                        <tbody>
                            {
                                Object.entries(newClass.stats).map((entry, i) => {
                                    const [key, value] = entry
                                    return (
                                        <tr key={i}>
                                            <td>{key}</td>
                                            <td>{value}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </article >
        </>
    )
}

export default ClassCard
