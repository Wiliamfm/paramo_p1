import { component$ } from '@builder.io/qwik';
import { NEWS } from '~/utils/newsArray';
import { Card } from '~/components/common/card/card';

export default component$(() => {
  return (
    <div class="w-full py-10">
      {NEWS.map(newItem=>(
          <Card  key={newItem.id} title={newItem.name} description={newItem.description} id={newItem.id} date={newItem.date}/>
      ))}
    </div>
  );
});
