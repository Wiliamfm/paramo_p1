const staticPaths = new Set(["/favicon.svg","/images/paramo_logo.png","/images/prueba1.jpg","/manifest.json","/paramo_assets/Arte Páramo aliados.ai","/paramo_assets/Artes Logo Blanco Negro Páramo aliados.ai","/paramo_assets/Digital iconos PÁRAMO aliados-01.png","/paramo_assets/Digital iconos PÁRAMO aliados-02.png","/paramo_assets/Digital iconos PÁRAMO aliados-03.png","/paramo_assets/Digital iconos PÁRAMO aliados-04.png","/paramo_assets/Digital iconos PÁRAMO aliados-05.png","/paramo_assets/Digital iconos PÁRAMO aliados-06.png","/paramo_assets/Digital iconos PÁRAMO aliados-07.png","/paramo_assets/Digital iconos PÁRAMO aliados-08.png","/paramo_assets/Digital iconos PÁRAMO aliados-09.png","/paramo_assets/Digital iconos PÁRAMO aliados-10.png","/paramo_assets/Digital iconos PÁRAMO aliados-11.png","/paramo_assets/Digital iconos PÁRAMO aliados-12.png","/paramo_assets/Digital iconos PÁRAMO aliados-13.png","/paramo_assets/Digital iconos PÁRAMO aliados-14.png","/paramo_assets/fonts/Intro.otf","/paramo_assets/fonts/Karla-Bold.ttf","/paramo_assets/fonts/Karla-Regular.ttf","/paramo_assets/fonts/PPNeueMachina-InktrapBold.ttf","/paramo_assets/fonts/PPNeueMachina-InktrapRegular.otf","/paramo_assets/fonts/PPNeueMachina-InktrapRegular.ttf","/paramo_assets/fonts/PPNeueMachina-PlainRegular.otf","/paramo_assets/logo blanco páramo aliados-15.png","/q-manifest.json","/qwik-prefetch-service-worker.js","/service-worker.js","/sitemap.xml"]);
function isStaticPath(method, url) {
  if (method.toUpperCase() !== 'GET') {
    return false;
  }
  const p = url.pathname;
  if (p.startsWith("/build/")) {
    return true;
  }
  if (p.startsWith("/assets/")) {
    return true;
  }
  if (staticPaths.has(p)) {
    return true;
  }
  if (p.endsWith('/q-data.json')) {
    const pWithoutQdata = p.replace(/\/q-data.json$/, '');
    if (staticPaths.has(pWithoutQdata + '/')) {
      return true;
    }
    if (staticPaths.has(pWithoutQdata)) {
      return true;
    }
  }
  return false;
}
export { isStaticPath };