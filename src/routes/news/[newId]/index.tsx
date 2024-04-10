import { $, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { NEWS } from '~/utils/newsArray';

export default component$(() => {
    const loc = useLocation();
    const show = useSignal(false);

    
    const handleNew = $(async () => {
        try {
            const newItem = await NEWS.find(n => n.id == parseInt(loc.params.newId));
            console.log(newItem);
        } catch (error) {
            console.error('Error al obtener la noticia:', error);
        }
    });

    
    useTask$(() => {
        handleNew().then(() => {
            show.value=true; 
        });
    });

    if (show.value) {
        return (
            <div>Esta en la noticia {loc.params.newId}</div>
        );
    } else {
        return (
            <div>Esta noticia no existe</div>
        );
    }
});