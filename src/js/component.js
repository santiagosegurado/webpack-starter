import '../css/component.css';

// Importo imagenes
import webpacklogo from '../assets/img/webpack-logo.png'


export const saludar = ( nombre ) => {

    const h1 = document.createElement('h1');
    document.body.append(h1);
    h1.innerText = nombre + '!!!';


    
    const img = document.createElement('img');
    img.src = webpacklogo;
    document.body.append(img);


}

