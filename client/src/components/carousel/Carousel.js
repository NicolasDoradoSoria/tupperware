import React, { useRef, useContext } from 'react';
import "./style.css";
import styled from "styled-components"
import { ReactComponent as LeftArrow } from "../../img/iconmonstr-angel-left-thin.svg"
import { ReactComponent as RightArrow } from "../../img/iconmonstr-angel-right-thin.svg"
import { useEffect } from 'react';
import FileContext from "../../context/fileContext/FileContext";
import Style from "./Style";

function Banner({ groupImages }) {
    const classes = Style();
    return (
        groupImages.files.map(singleImage => {
            return <Slide key={singleImage._id}>
                <a href="http://localhost:3000/">
                    <img src={`http://localhost:4000/${singleImage.fileName}`} alt='' className={classes.imgSlideshow} ></img>
                </a>
                {/* <TextSlide backgroundColor="#2D9993" textColor="#000">
                    <p>15% descuentoooo aprobechala guacha</p>
                </TextSlide> */}
            </Slide>
        })

    )
}


const Carousel = () => {
    const slideshow = useRef(null)
    const slideInterval = useRef(null);
    let currentSlide = slideshow.current
    const fileContext = useContext(FileContext);
    const { getMultipleImages, images } = fileContext;


    const following = () => {
        //comprobamos que el slideshow tenga elementos
        if (slideshow.current && (slideshow.current.children.length > 0)) {
            //obtiene el primer elemento del slideshow
            const firstElement = slideshow.current.children[0]

            //establecemos la transicion para el slideshow
            slideshow.current.style.transition = `1500ms ease-out all`

            const slideSize =slideshow.current.children[0].offsetWidth

            //movemos el slideshow
            slideshow.current.style.transform = `translateX(-${slideSize}px)`

            const transition = () => {
                //reiniciamos
                slideshow.current.style.transition = "none"
                slideshow.current.style.transform = `translateX(0)`

                //tomamos el primer elemento y la mandamos al final
                slideshow.current.appendChild(firstElement);
                slideshow.current.removeEventListener("trasitionend", transition)
            }

            //eventlistener para cuando termina la animacions
           slideshow.current.addEventListener("transitionend", transition)

        }
    }
    const previous = () => {
        if (slideshow.current.children.length > 0) {
            //obtiene el primer elemento del slideshow
            const index = currentSlide.children.length - 1
            const ultimoElemento = currentSlide.children[index]
            currentSlide.insertBefore(ultimoElemento, currentSlide.firstChild)

            currentSlide.style.transicion = "none"

            const slideSize = currentSlide.children[0].offsetWidth
            currentSlide.style.transform = `translateX(-${slideSize}px)`

            setTimeout(() => {
                currentSlide.style.transicion = "300ms ease-out all"
                currentSlide.style.transform = `translateX(0)`
            }, 30)

        }
    }

    useEffect(() => {
        getMultipleImages()
        slideInterval.current = setInterval(() => {
            following();
        }, 6000);
        // Eliminamos los intervalos
        slideshow.current.addEventListener('mouseenter', () => {
            clearInterval(slideInterval.current);
        });

        // olvemos a poner el intervalo cuando saquen el cursor del slideshow
        slideshow.current.addEventListener('mouseleave', () => {
            slideInterval.current = setInterval(() => {
                following();
            }, 5000);
        });

    })
    return (
        <div className='slideshow'>
                <div className='carrousel'>
                    <MainContainer>
                        <SlideContainer ref={slideshow}>
                            {
                                images.map((groupImages, index) => {
                                    return <Banner groupImages={groupImages} key={index}/>
                                })
                            }

                        </SlideContainer>
                        <Controller>
                            <Button onClick={previous}>
                                <LeftArrow />
                            </Button>
                            <Button right onClick={following}>
                                <RightArrow />
                            </Button>
                        </Controller>
                    </MainContainer>
                </div>
        </div>
    )
}

const MainContainer = styled.div`
    position: relative;
`;

const SlideContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const Slide = styled.div`
    min-width: 100%;
    overflow: hidden;
    transition: .3s ease all;
    z-index: 10;
    max-height: 500px;
    position: relative;

    @media screen and (max-width: 700px){
        max-height: 200px;
    }


    img {
        width: 100%;
        vertical-align: top;
    }
`;

const Controller = styled.div`
position: absolute;
top: 0;
z-index: 20;
width: 100%;
height: 100%;
pointer-events: none;
`;
const Button = styled.button`
pointer-events: all;
background: none;
border: none;
cursor: pointer;
outline: none;
width: 50px;
height: 100%;
text-align: center;
position: absolute;
transition: .3s ease all;
    &:hover {
        background : rgba(0,0,0, .2);
        path {
            fill: #fff;
        }
    }

    path {
        filter: ${props => props.right ? "drop-shadow(-2px 0px  0px #fff)" : "drop-shadow(2px 0px  0px #fff)"};
    }

    ${props => props.right ? "right: 0" : "left: 0"}
`;

export default Carousel