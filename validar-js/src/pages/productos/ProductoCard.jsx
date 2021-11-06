import React from 'react'
import { Card, ListGroup, ListGroupItem, Button, Stack} from 'react-bootstrap'


import Fondocard from '../../img/Fondo2.jpg'
import { ServiceProductos } from '../../services/ServiceProductos'

let imgCard = document.body

const formatoPesos = new Intl.NumberFormat('es-CO', {
       style: 'currency',
       currency: 'COP',
       minimumFractionDigits: 0
     })

const ProductoCard = (props) => {

    const serviProductos = new ServiceProductos()

    const {producto} = props;

    const ponerClase = (el) => {
        if(el.target.classList[0] === 'card-img-top'){
        imgCard = el.target
        imgCard.classList.remove('imgStyle3')
        el.target.classList.add('imgStyle2')
        }
    }

    const quitarClase = (el) => {
        if(imgCard.classList[0] === 'card-img-top'){
        imgCard.classList.add('imgStyle3')
        imgCard.classList.remove('imgStyle2')
        }
    }
    
const handleShowEdit = () =>{ 
    props.handleEdit(producto) 
}
const handleShowDelete = () => {
    props.ShowAlertWarning(producto)
}

    return (
        <Card className="mx-3 my-3" style={{ width: '18rem' }} onMouseLeave={el=>quitarClase(el)} onMouseOver={el=>ponerClase(el)}>
            <Card.Img id={"imgCard"} className="imgStyle"  variant="top" src={Fondocard} />
            <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>
                <b>Modelo: </b>
                {producto.modelo}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><b>Precio:</b> {formatoPesos.format(producto.precio)}</ListGroupItem>
            </ListGroup>
            <div className="butonsCard">
                <Stack direction="horizontal" gap={2}>
                    <Button onClick={handleShowEdit} className="buton-Rounded" variant="outline-info"><i className="bi bi-brush"></i></Button>
                    
                    <Button onClick={handleShowDelete} className="buton-Rounded" variant="outline-danger"><i className="bi bi-x-circle"></i></Button>
                </Stack>
            </div>
        </Card>

    )
}


export default ProductoCard
