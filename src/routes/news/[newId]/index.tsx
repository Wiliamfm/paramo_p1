import { $, component$, useStore, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import Carousel2 from '~/components/common/carousel/carousel2';
import { NEWS } from '~/utils/newsArray';

export default component$(() => {
    const loc = useLocation();
    const show = useStore({
        id:"",
        name:"",
        description:"",
        category:[""],
        date:""
    },);

    
    const handleNew = $(async () => {
        try {
            const newItem = await NEWS.find(n => n.id == loc.params.newId);
            
            if(newItem){
                return(newItem);
            }
        } catch (error) {
            console.error('Error al obtener la noticia:', error);
            
        }
    });

    
    useTask$(async() => {
        await handleNew().then(response => {
            if (!response){
                
                show.id = "null"
                

            }else{
                show.id=response.id;
                show.name=response.name;
                show.description=response.description;
                show.category=response.category;
                show.date=response.date;

            }
        });
    });

    if (show.id != "null") {
        return (
            <div class="min-h-screen w-full flex flex-col gap-5 items-center  p-3">
                <div class="w-[90%] h-[40vh] flex justify-center items-center  ">
                    <h1 class="text-center font-bold text-3xl">{show.name}</h1>
                </div>
                <div class="w-full text-justify"><p>{show.description}</p></div>
                <div class="w-full ">
                <Carousel2/>

                {/* share section */}
                <div class="w-full flex justify-center items-center">
                    <div class="w-[50%] flex border-t-2 border-black">
                        <h3 class="">SHARE ARTICLE:</h3>
                        <p>face</p>
                        <p>X</p>
                        <p>mail</p>
                    </div>
                </div>

                </div>
            </div>
        );
    } else {
        return (
            <div>Esta noticia no existe</div>
        );
    }
});
