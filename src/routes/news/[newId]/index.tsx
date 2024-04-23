import { $, component$, useStore, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Card } from "~/components/common/card/card";
import { BannerComponent } from "~/components/common/detailsNew/Banner/banner";
import Carousel from "~/components/common/detailsNew/carousel/carousel";
import { DescriptionComponent } from "~/components/common/detailsNew/description/description";
import { SubtitleComponent } from "~/components/common/detailsNew/subtitle/subtitle";
import { TitleComponent } from "~/components/common/detailsNew/title/title";
import { VideoComponent } from "~/components/common/detailsNew/video/video";
import { NEWS } from "~/utils/newsArray";

export default component$(() => {
  const loc = useLocation();
  const show = useStore({
    id: "",
    name: "",
    description: "",
    category: [""],
    date: "",
  });

  const handleNew = $(async () => {
    try {
      const newItem = await NEWS.find((n) => n.id == loc.params.newId);

      if (newItem) {
        return newItem;
      }
    } catch (error) {
      console.error("Error al obtener la noticia:", error);
    }
  });

  useTask$(async () => {
    await handleNew().then((response) => {
      if (!response) {
        show.id = "null";
      } else {
        show.id = response.id;
        show.name = response.name;
        show.description = response.description;
        show.category = response.category;
        show.date = response.date;
      }
    });
  });

  if (show.id != "null") {
    return (
      <div class="flex min-h-screen w-full flex-col items-center gap-5  p-3 dark:text-white">
        {/* title */}
        <TitleComponent value={show.name}/>
        {/* Banner or Image */}
        <BannerComponent value=""/>
        {/* Description */}
        <DescriptionComponent value={show.description}/>  
        {/* carousel1 */}
        <Carousel />
        {/* Subtitle */}
        <SubtitleComponent value={"subtitulo de prueba"}/>
        {/* Description */}
        <DescriptionComponent value={"segun estudios sisas, "+show.description}/>  
        {/* Video */}
        <VideoComponent value=""/>
          {/* share section */}
          <div class="flex w-full items-center justify-center">
            <div class="flex justify-between items-center w-[70%] border-t-2 border-black">
              <div>
                <h3 class="">SHARE ARTICLE:</h3>
              </div>
                {/* iconos social media */}
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 50 50"
                >
                  <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                </svg>
                <svg
                  fill="#000000"
                  height="20"
                  width="20"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 460.775 460.775"
                  xml:space="preserve"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path>{" "}
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path d="M 4.5 3 C 2.5788117 3 1 4.5788117 1 6.5 L 1 18 C 1 19.64497 2.3550302 21 4 21 L 8 21 L 8 13.673828 L 12 16.798828 L 16 13.673828 L 16 21 L 20 21 C 21.64497 21 23 19.64497 23 18 L 23 6.5 C 23 4.5788117 21.421188 3 19.5 3 C 18.750123 3 17.982547 3.2422598 17.34375 3.7421875 L 12 7.9121094 L 6.65625 3.7421875 L 6.6542969 3.7421875 C 6.0158061 3.2430811 5.2492693 3 4.5 3 z M 4.5 5 C 4.8301235 5 5.1426247 5.098287 5.4238281 5.3183594 L 6 5.7675781 L 6 9.5742188 L 3 7.2324219 L 3 6.5 C 3 5.6591883 3.6591883 5 4.5 5 z M 19.5 5 C 20.340812 5 21 5.6591883 21 6.5 L 21 7.2324219 L 18 9.5742188 L 18 5.7675781 L 18.576172 5.3183594 C 18.857375 5.0982871 19.169877 5 19.5 5 z M 8 7.328125 L 12 10.449219 L 16 7.328125 L 16 11.136719 L 12 14.261719 L 8 11.136719 L 8 7.328125 z M 3 9.7695312 L 6 12.111328 L 6 19 L 4 19 C 3.4349698 19 3 18.56503 3 18 L 3 9.7695312 z M 21 9.7695312 L 21 18 C 21 18.56503 20.56503 19 20 19 L 18 19 L 18 12.111328 L 21 9.7695312 z"></path>
                </svg>
              </div>
            </div>
          </div>
          {/* Related Articles */}
          <div class="w-full pt-5">
            <h3 class="text-2xl font-bold">Related Articles</h3>
            {NEWS.map((NEW, index) => {
              if (index <= 2) {
                return (
                  <Card
                    key={NEW.id}
                    id={NEW.id}
                    title={NEW.name}
                    description={NEW.description}
                    date={NEW.date}
                  />
                );
              }
              return;
            })}
          </div>
        
      </div>
    );
  } else {
    return <div>Esta noticia no existe</div>;
  }
});
