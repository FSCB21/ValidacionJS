import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, InputGroup, Toast, ToastContainer, Alert } from 'react-bootstrap'
import PaginationList from '../../components/PaginationList'
import { ServiceProductos } from '../../services/ServiceProductos'
import ProductoCard from './ProductoCard'

import './ProductosCss.css'

const Productos = () => {

    const serviProductos = new ServiceProductos()

    const [productos, setProductos] = useState([])
    const [paginacionCount, setPaginacionCount] = useState()
    const [activePage, setActivePage] = useState()
    const [sizeSend, setsizeSend] = useState(6)

    const [estadoPagina, setEstadoPagina] = useState(true)

    useEffect(()=>{
        const serviProductos = new ServiceProductos()
        serviProductos.getProductos(0,6).then(res=>{
            setProductos(res.data.rows)
            setPaginacionCount(res.data.totalPages)
            setActivePage(res.data.currentPage)
        })
        
    }, [estadoPagina])


    const [toastV, setToastV] = useState(false);

    let defaultToast = {
        Titulo: '',
        SubTitulo:'',
        Contenido:'',
        Color:''
    }
    const [toast, setToast] = useState(defaultToast)

    const openToast = (titulo, subT, contenido, color) => {
        setToast({
            ...toast,
            Titulo: titulo,
            SubTitulo: subT,
            Contenido: contenido,
            Color: color
        });
        setToastV(true)
    }

    const closeToast = () => {
        setToastV(false)
    }

    const cambiarPagina = (page) =>{
        serviProductos.getProductos(page,sizeSend).then(res=>{
            setProductos(res.data.rows)
            setPaginacionCount(res.data.totalPages)
            setActivePage(res.data.currentPage)
        })
    }

    const cambiarCantidad = (size) =>{
        setsizeSend(size)
        serviProductos.getProductos(0,size).then(res=>{
            setProductos(res.data.rows)
            setPaginacionCount(res.data.totalPages)
            setActivePage(res.data.currentPage)
        })
    }

    const [modalForm, setModalForm] = useState(false)
    const [accionProdTitulo, setAccionProdTitulo] = useState("")
    

    const handleNew = () =>{
        setAccionProdTitulo("Nuevo Producto")
        setModalForm(true)
    }

    const handleEdit = (prod) =>{
        setProducto(prod)
        setAccionProdTitulo("Editar Producto")
        setModalForm(true)
    }

    const hideModalForm = () =>{
        setProducto(defaultProd)
        setModalForm(false)
    }
    
    let defaultProd = {
        id:"",
        nombre:"",
        modelo:"",
        precio:""
    }

    const [producto, setProducto] = useState(defaultProd)

    const handleChange = ({target}) =>{
        setProducto({
            ...producto,
            [target.name]:target.value
        })
    }

    const handleSubmit = () =>{
        if(!producto.id){    
            serviProductos.setProducto(producto).then(res=>{
                openToast('Correcto', 'Crear Producto', res.data.success, 'success')
                hideModalForm()
            }).catch(err=>{
                if(err.response){
                    let errors = err.response.data.errors
                    openToast('Error', 'Crear Producto', `${errors[0].msg} en el campo ${errors[0].param}`, 'warning')
                }
            })
        }else{
            serviProductos.updateProducto(producto).then(res=>{
                openToast('Correcto', 'Editar Producto', res.data.success, 'success')
                hideModalForm()
                setEstadoPagina(!estadoPagina)
            }).catch(err=>{
                if(err.response){
                    let errors = err.response.data.errors
                    openToast('Error', 'Editar Producto', `${errors[0].msg} en el campo ${errors[0].param}`, 'warning')
                }
            })
        }
        
    }

    const [alertWarning, setAlertWarning] = useState(false)

    const ShowAlertWarning = (prod) => {
        setProducto(prod)
        setAlertWarning(true)
    }

    const HideAlertWarning = () => {
        setProducto(defaultProd)
        setAlertWarning(false)
    }

    const HandleDelete = () => {
        serviProductos.deleteProducto(producto.id)
        openToast('Correcto', 'Eliminar Producto', `Se ha eliminado el producto ${producto.nombre}`, 'success')
        HideAlertWarning()
        setEstadoPagina(!estadoPagina)
    }

    return (
        <div className="mt-2 mx-2">
            <h3 className="text-secondary mb-4">Productos</h3>
                <div className="productosOrden">
                    <div className="card" style={{ width: '85%' }}>
                        <div className="row contenProds" style={{ width: '100%' }}>
                        {
                            productos.map((producto) =>(
                                <ProductoCard key={producto.id} producto={producto} handleEdit={handleEdit} ShowAlertWarning={ShowAlertWarning}/>
                            ))
                        }   
                        </div>
                    </div>
                    <div className="paginationDiv">
                        <Button onClick={handleNew} className="buton-Rounded my-3 fs-5 mx-1" variant="outline-primary"><i className="bi bi-clipboard-plus"></i></Button>
                        <PaginationList size={sizeSend} cantidad={paginacionCount} active={activePage} cambiarPagina={cambiarPagina} cambiarCantidad={cambiarCantidad}/>
                    </div>
                </div>

                <Modal show={modalForm} onHide={hideModalForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Gestion De Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>{accionProdTitulo}</h5>
                        <Form className="mx-4 my-4">
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre:</Form.Label>
                                <Form.Control value={producto.nombre} name="nombre" onChange={handleChange} type="text" placeholder="Televisor" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Modelo:</Form.Label>
                                <Form.Control value={producto.modelo} onChange={handleChange} name="modelo" type="text" placeholder="OPP29LLAK9Q" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio:</Form.Label>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text><i className="bi bi-currency-dollar"></i></InputGroup.Text>
                                    <Form.Control value={producto.precio} onChange={handleChange} name="precio" type="number" placeholder="1000" />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={hideModalForm}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
                
                <Modal show={alertWarning} onHide={HideAlertWarning} centered>
                    <Alert className="zindex-tooltip" show={alertWarning} variant="danger">
                        <Alert.Heading>¿Está Seguro De Borrar A {producto.nombre}?</Alert.Heading>
                        <p>Una Vez Realizada Esta Accion No Habra Vuelta Atras!!</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                        <Button onClick={HideAlertWarning} variant="outline-primary">
                            Cancelar
                        </Button>
                        <Button className="mx-4" onClick={HandleDelete} variant="outline-danger">
                            Aceptar
                        </Button>
                        </div>
                    </Alert>
                </Modal>

            <ToastContainer className="p-3 toast-conten" position='top-end'>
                <Toast className="toastFix" bg={toast.Color} show={toastV} onClose={closeToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">{toast.Titulo}</strong>
                        <small>{toast.SubTitulo}</small>
                    </Toast.Header>
                    <Toast.Body>{toast.Contenido}</Toast.Body>
                </Toast>
            </ToastContainer>

        </div>
    )
}

export default Productos
