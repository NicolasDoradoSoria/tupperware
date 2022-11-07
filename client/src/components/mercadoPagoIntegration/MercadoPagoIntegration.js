import { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';

const FORM_ID = "payment-form"

const MercadoPagoIntegration = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    const createOrder = async() => {
      try {
        const result = await clienteAxios.post(`/api/payment/create-order`)
        console.log(result.data.preferenceId)
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
      script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);

  return (
    <form id={FORM_ID} method="GET" />
  );
}
 
export default MercadoPagoIntegration;