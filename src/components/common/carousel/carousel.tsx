import { component$ } from "@builder.io/qwik"


interface CardProps {
    ImgUrl: string;
    title: string;
    description?: string;
    url?: string;
  }

export default component$((props) => {
    return (        
        <div >
            <h1>hola</h1>
        </div>
    );

});
