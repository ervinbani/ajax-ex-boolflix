$(document).ready(function(){


    $(document).on('click', $('#btn'), function(){
        var inputUtente=$('.container').children('.input').val();
        $.ajax({
            url:'https://api.themoviedb.org/3/search/movie?',
            method:'GET',
            data:{
                api_key:'936b60fb6691f67d5eda3a0a29507da1',
                query:inputUtente,
                language:'it-IT'
            },
            success: function(data){
                ris=data.results;
                console.log(ris);
            },
            error:function(){
                alert('errore');
            }
        });//fine ajax




    });//fine del document.on





});//fine del doc ready
