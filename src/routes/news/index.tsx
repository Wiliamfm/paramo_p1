import { component$ } from '@builder.io/qwik';
import Card from '~/components/common/card/card';

export default component$(() => {
  return (
<<<<<<< HEAD
    <div>
      <Card ImgUrl='' title="test" description="This is a test"/>
    </div> 
=======
    <div class="w-full py-10">
      {NEWS.map(newItem=>(
          <CardNew  key={newItem.id} title={newItem.name} description={newItem.description} id={newItem.id} date={newItem.date}/>
      ))}
    </div>
>>>>>>> 1c2ce5e (adding news and working on newView)
  );
});
