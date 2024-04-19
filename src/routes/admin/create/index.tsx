import { $, component$, useContext, useStore } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
type DataType ={
    name:string,
    date:string,
    description:string,

}


export default component$(() => {
    
    const states = useStore({
      data: {name:"",date:"",description:""} as DataType,

    });

    const handleComponents = $(()=>{

    })

    const handleOnSubmit = $((event:Event)=>{
        
        console.log(states.data)
    })
    
    return (
      <div class=" min-h-[70vh] w-full p-3 ">
        <h1>Crear un nuevo articulo</h1>
        <Form onSubmit$={handleOnSubmit}>

            
        </Form>

      </div>
    );
  });