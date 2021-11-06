import React from 'react'
import { Card, Carousel } from 'react-bootstrap'

import './IndexCss.css'

import img1 from '../img/img1.jpg'
import img2 from '../img/img2.jpg'
import img3 from '../img/img3.jpg'

const Index = () => {
    return (
        <Card className="mx-auto" style={{width: '88%'}}>
            <Carousel variant="dark" className="ContenGeneral">
                <Carousel.Item className="seccionCarousel" interval={1000}>
                    <img
                    className="d-block mx-auto w-50 estilosImg"
                    src={img1}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Bienvenido A SurtiPapas</h3>
                    <p>Su Tienda Virtual De Confianza</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="seccionCarousel" interval={1000}>
                    <img
                    className="d-block w-50 mx-auto estilosImg"
                    src={img2}
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h3>Aquí Encontrara Los Mejores Productos</h3>
                    <p>Y Como no... A un excelente precio menor a las competencias</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="seccionCarousel" interval={1000}>
                    <img
                    className="d-block estilosImg"
                    src={img3}
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h3 className="text-warning">¿Que Esperas A Ser Miembro De SurtiPapas?</h3>
                    <p>Como Miembro Obtendras muchas ofertas y beneficios gracias a tu fidelidad!!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Card>
    )
}

export default Index
