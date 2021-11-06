import React, { useEffect, useState } from 'react'
import { Col, Form, PageItem, Pagination, Row } from 'react-bootstrap';

const cantidades = [
  6,
  9,
  20,
  50,
  100
]

const PaginationList = (params) => {
const {cantidad, active, size} = params

const [pasos, setPasos] = useState([])
  
const cambioDePaginaList = (el) =>{
    params.cambiarPagina(el)
}
  
const handleChange = ({target}) =>{
  params.cambiarCantidad(target.value)
  /* params.cambiarCantidad(el) */
}

  useEffect(() => {
      let pasosArray = []
      for (let number = ((active>3)?active-3:0); number <= ((active>cantidad-4)?cantidad-1:active+3); number++) {
        pasosArray.push(
          <Row key={number}>
            <PageItem onClick={el=>cambioDePaginaList(el.target.outerText)} key={number} active={number === active}>{number}</PageItem>
          </Row>
        );
      } 
      setPasos(pasosArray)
    }, [active,cantidad,setPasos])
    
    return (
    <Col style={{width: "2.8rem"}}>
      <Row>
        <Pagination>
          <Col>
            <Row>
              <Pagination.First onClick={()=>cambioDePaginaList(0)}/>
            </Row>
            <Row>
              <Pagination.Prev  onClick={()=>cambioDePaginaList(active-1)}/>
            </Row>
              {pasos}
            <Row>
              <Pagination.Next onClick={()=>cambioDePaginaList((active>=cantidad-1)?active:active+1)}/>
            </Row>
            <Row>
              <Pagination.Last onClick={()=>cambioDePaginaList(cantidad-1)}/>
            </Row>
          </Col>
        </Pagination>
      </Row>
      <Row>
        <Form.Select className="form-select-sm" onChange={handleChange} value={size}>
          {
            cantidades.map(_cantidad =>(
              <option key={_cantidad} value={_cantidad}>{_cantidad}</option>
            ))
          }
          
        </Form.Select >
      </Row>
    </Col>
    )
}
export default PaginationList



