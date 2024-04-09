import { component$ } from '@builder.io/qwik';
import Card from '~/components/common/card/card';

export default component$(() => {
  return (
    <div>
      <Card ImgUrl='' title="test" description="This is a test"/>
    </div> 
  );
});
