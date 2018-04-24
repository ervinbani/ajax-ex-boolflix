$(document).ready(function(){


    $(document).on('click', '#btn', function(){
        var inputUtente=$('.container').children('.input').val();
        $.ajax({
            url:'https://api.themoviedb.org/search/movie',
            method:'GET',
            data:{
                api_key:'936b60fb6691f67d5eda3a0a29507da1',
                query:inputUtente,
                language:'IT'
            },
            succes: function(data){
                console.log(data);
            },
            error:function(){
                alert('errore');
            }
        });//fine ajax




    });//fine del document.on





});//fine del doc ready
