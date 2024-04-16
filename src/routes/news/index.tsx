import { component$ } from '@builder.io/qwik';
import { NEWS } from '~/utils/newsArray';
import { CardNew } from '~/components/common/cardNew/cardNew';

export default component$(() => {
  return (
    <div class="w-full py-10">
      {NEWS.map(newItem=>(
          <CardNew  key={newItem.id} title={newItem.name} description={newItem.description} id={newItem.id} date={newItem.date}/>
      ))}
    </div>
  );
});
