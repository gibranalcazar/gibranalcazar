   
  var historyX = 'X';
  var routes = {
    '':       'home.html',
    '/':      'home.html',
    '#/home':   'home.html',
    '#/portfolio':  'portfolio.html',
    '#/about':   'about.html',
    '#/contact':  'contact.html'
  }

  async function loadPage(url, innerElement){
    console.log(url);
    console.log(innerElement);

    const result = await fetch(url);
    const contenido = await result.text();
    const element = document.getElementById('content');
    element.innerHTML = contenido;

    if (innerElement) {
      scrollIntoViewGN(innerElement);
    }
  }

  const scrollIntoViewGN = (id) =>{
    document.getElementById(id).scrollIntoView();
  }

  const router = () =>{
    console.log('in router');
    var innerElement = '';
    var link = window.location.hash;  
    var count = link.split("/").length -1;
    
    if (count>1) {
      innerElement = link.split("/")[2];
      link = '#/' + link.split("/")[1];
    }  

    console.log("link: "+link);
    console.log("h1: "+ historyX);
    if ((historyX === link) && (innerElement)){
      scrollIntoViewGN(innerElement);
      historyX = link;
      console.log("not reloading");
      return;
    }
    historyX = link;
    console.log("history: "+historyX);
    let url = routes[link];
    loadPage(url, innerElement);
  }

  router();
  window.addEventListener('hashchange', router);
