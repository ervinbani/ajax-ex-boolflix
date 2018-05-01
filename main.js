var dataContainer=$('.container');
var infoContainer=dataContainer.children('.info-Container');
var listInfo=dataContainer.children('ul');

var arrFlags=['en', 'it', 'es', 'de'];


$(document).ready(function(){



    $(document).on('click', '#btn', function(){
          initialState();
        searchMovies();//funzione che cerca e stampa film
        searchSeries();//funzione che cerca e stampa Serie Tv


    });
    showDetails();



    //funzione che cerca e stampa film
    function searchMovies(){
      var inputUtente=$('.heder').children('.heder-right').children('.input').val();

      $.ajax({
          url:'https://api.themoviedb.org/3/search/movie?',
          method:'GET',
          data:{
              api_key:'936b60fb6691f67d5eda3a0a29507da1',
              query:inputUtente,
              language:'it_IT',

          },
          success: function(data){
              var risultato=data.results;
                if(inputUtente==''){
                  alert('inserisci il nome di un film');

                }
                else{

                  for(var i=0;i<risultato.length;i++){
                      var leng=risultato[i]['original_language'];
                      var poster=risultato[i]['poster_path'];
                      console.log('tittle', risultato[i]['original_title']);
                      console.log('poster', addPoster(poster));
                      dataContainer.append('<div class=info-Container style=background-image:url('+'https://image.tmdb.org/t/p/w342/'+poster+')>'
                                          +'<ul class=listadati>'
                                          +'<li>'+'<strong>Titolo:</strong>'+risultato[i]['title']+'</li>'
                                          +'<li>'+'<strong>Titolo originale:</strong>'+risultato[i]['original_title']+'</li>'
                                          +'<li class="leng">'+'<strong>Lingua originale:</strong>'+leng+generateFlag(leng)+'</li>'
                                          +'<li>'+'<strong>Voto:</strong>'+transformAverage(risultato[i]['vote_average'])+'</li>'
                                          +'<li>'+'<strong>Type:'+'Film'+'</li>'
                                          +'</ul>'
                                          +'</div>');

                  }

                }

            },
          error:function(){
              alert('errore');
          }
      });//fine ajax

    }
    //funzione che cerca e stampa serie Tv
    function searchSeries(){

      var inputUtente=$('.heder').children('.heder-right').children('.input').val();

      $.ajax({
          url:'https://api.themoviedb.org/3/search/tv?',
          method:'GET',
          data:{
              api_key:'936b60fb6691f67d5eda3a0a29507da1',
              query:inputUtente,
              language:'it_IT',

          },
          success: function(data){
              var seriesResult=data.results;
              console.log('nome serie', seriesResult)
                if(inputUtente==''){
                  alert('inserisci il titolo di un film');

                }
                else{

                    for(var i=0;i<seriesResult.length;i++){
                        var leng=seriesResult[i]['original_language'];
                        var poster=seriesResult[i]['poster_path'];
                        console.log('tittle', seriesResult[i]['original_title'], seriesResult[i]['poster_path']);
                        dataContainer.append('<div class=info-Container style=background-image:url('+'https://image.tmdb.org/t/p/w342/'+poster+')>'
                                            +'<ul class=listadati>'
                                            +'<li>'+'<strong>Titolo:</strong>'+seriesResult[i]['name']+'</li>'
                                            +'<li>'+'<strong>Titolo originale:</strong>'+seriesResult[i]['original_name']+'</li>'
                                            +'<li class="leng">'+'<strong>Lingua originale:</strong>'+leng+generateFlag(leng)+'</li>'
                                            +'<li>'+'<strong>Voto:</strong>'+transformAverage(seriesResult[i]['vote_average'])+'</li>'
                                            +'<li>'+'<strong>Type:</strong>'+'Serie Tv'+'</li>'
                                            +'</ul>'
                                            +'</div>');

                    }

                }

            },
          error:function(){
              alert('errore');
          }
      });//fine ajax


    }
    //funzione che transforma la media in un numero x da 1 a 5 e stampa x star invece del num x
    function transformAverage(vote_average){
        var starVote=Math.floor(vote_average/2);
        var arrStar=[];
        for(var i=0;i<5;i++){
            if(i<starVote){
                arrStar.push('<i class="fas fa-star" style="color:yellow"></i>');
            }
            else{
                arrStar.push('<i class="star fas fa-star" ></i>');
            }
        }
        return arrStar.join("");;
    }
    //funzione che prende in ingresso le iniziali della lingua originale e stampa la bandiera corrispondente
    function generateFlag(leng){
        var newElement='';
        if(arrFlags.includes(leng)){
            newElement+='<img src=flags/'+leng+'.svg width=20px>';
        }
        return newElement;
    }
    //funzione che reseta il valore dell'input
    function initialState(inputUtente){
        //var resetInput=$('.heder').children('.heder-right').children('.input').val('');
        var newcontainer=$('.container').html('');


    }
    //funzione che aggiunge un poster ad ogni film o serie che appare nella ricerca
    function addPoster(poster){
        var newElement='';
        var urlCopy='https://image.tmdb.org/t/p/w342/'
        if(poster!=''){
            newElement+='<img src='+urlCopy + poster + '>';
        }
        return newElement;
    }
    //al click su ogni poster di un film, appare la schermata con i dati e nasconde il poster
    function showDetails(){
        var infoContainer=dataContainer.children('.info-Container');
        $(document).on("click",".info-Container",function(){
              var thisfilm= $(this).find(".listadati ");
              thisfilm.addClass("bg-lightgrey");
              thisfilm.fadeIn(1000);
    });
    // On mouseleave scompare il testo contenente le info del film
    $(document).on("mouseleave",".info-Container",function(){
        var thisfilm= $(this).find(".listadati");
        thisfilm.fadeOut(1500);
    });


    }


});//fine del doc ready
