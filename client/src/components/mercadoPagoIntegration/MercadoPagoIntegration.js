import { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';

const FORM_ID = "payment-form"

const MercadoPagoIntegration = () => {
  const [preferenceId, setPreferenceId] = useState("");

  const addCheckout =() =>{
    const mp = new window.MercadoPago('TEST-28006dbe-01ce-4a00-b055-44f189297566', {
      locale: 'es-AR'
    });
  
    // Inicializa el checkout
    mp.checkout({
      preference: {
        id: preferenceId,
      },
      autoOpen: true
    });
  }
  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    const createOrder = async () => {
      try {
        const result = await clienteAxios.post(`/api/payment/create-order`)
        setPreferenceId(result.data.preferenceId);
      } catch (error) {
        console.log(error)
      }
    }
    createOrder()

  }, []);

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.addEventListener('load', addCheckout)
      document.body.appendChild(script);
    }
  }, [preferenceId]);

  return (

     <form id={FORM_ID} method="GET" /> 
  );
}

export default MercadoPagoIntegration;