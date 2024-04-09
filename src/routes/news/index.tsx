import { component$ } from '@builder.io/qwik';
import { CardNew } from '~/components/common/cardNew/cardNew';
import { NEWS } from '~/utils/newsArray';

export default component$(() => {
  return (
    <div>
      <Card ImgUrl='' title="test" description="This is a test"/>
    </div> 
  );
});
