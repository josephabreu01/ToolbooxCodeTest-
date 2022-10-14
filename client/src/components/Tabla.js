
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import Table from "react-bootstrap/Table"


const Tabla = () => {

    const url = "http://localhost:8080/files/data";
    const [data, setData] = useState([]);

    useEffect(() => {

        getData()

    }, []);

    const getData = async () => {
        const response = await fetch(url);
        const resolve = await response.json();
        let flat = resolve.flatMap(el => el);

        
        console.log(flat)

        setData(flat);
    }


    const tableData = () => {
        return (data.map((file, index) => (

            <tr key={index}>

                <td>
                    {file.file}
                </td>
                <td>
                    {file.text}
                </td>
                <td>
                    {file.number}
                </td>
                <td>
                    {file.hex}
                </td>
            </tr>
        )))
    }

    return (
        <Container className='mt-3'>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr >
                        <th>File </th>
                        <th>Text</th>
                        <th>Number</th>
                        <th>Hex</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData()}
                </tbody>
            </Table>


        </Container >
    )
}


export default Tabla;