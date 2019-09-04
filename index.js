// удаляем старый обьект перед новой выборкой
function remove() {
    var list = document.getElementById("template");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

// создание ajax объекта  
function createRequestObject() {
    try {
        return new XMLHttpRequest()
    } catch (e) {
        try {
            return new ActiveXObject('Msxml2.XMLHTTP')
        } catch (e) {
            try {
                return new ActiveXObject('Microsoft.XMLHTTP')
            } catch (e) {
                return null;
            }
        }
    }
}

// показываем контент с сервера
function showContent(link) {

    var cont = document.getElementById('form__result');
    var loading = document.getElementById('loading');
    var template = document.getElementById('template');
    /*
        var html = '<div class="media" id="media">';
        html += '<img src="#" class="media__img" alt="...">';
        html += '<div class="media__body">';
        html += '<h5 class="media__title"></h5><p class="media__text num1"> Основан в <span></span></p><p class="media__text num2"><span></span> проектов на Git hub</p><a class="media__link" href="#">Документация</a>';
        html += '</div>';
        html += '</div>';

        template.innerHTML = html;
    */

    var media = document.createElement('div');
    media.className = 'media';

    var img = document.createElement("img");
    img.src = "#12";
    img.className = 'media__img';

    var media_body = document.createElement('div');
    media_body.className = 'media__body';

    var media_title = document.createElement('h5');
    media_title.className = 'media__title';

    var media_text_01 = document.createElement('p');
    media_text_01.className = 'media__text num1';

    var media_text_02 = document.createElement('p');
    media_text_02.className = 'media__text num2';

    var a = document.createElement("a");
    a.href = "#";
    a.className = 'media__link';

    template.appendChild(media);
    media.appendChild(img);
    media.appendChild(media_body);
    media_body.appendChild(media_title);
    media_body.appendChild(media_text_01).innerHTML = 'Основан в <span></span>';
    media_body.appendChild(media_text_02).innerHTML = '<span></span> проектов на Git hub';
    media_body.appendChild(a).innerHTML = 'Документация';

    var http = createRequestObject();
    if (http) {
        http.open('get', link);
        http.onreadystatechange = function () {

            if (http.readyState == 4) {
                // cont.innerHTML = http.responseText;
                var jsonData = JSON.parse(http.responseText);

                for (var i = 0; i < jsonData.data.length; i++) {

                    var counter = jsonData.data[i];
                    if (counter.logo) {
                        var templateClone = template.content.cloneNode(true);
                        templateClone.querySelector('.media__img').setAttribute('src', counter.logo);
                        templateClone.querySelector('.media__title').textContent +=
                            ' ' + counter.name;
                        templateClone.querySelector('.num1 > span').textContent +=
                            ' ' + counter.year;
                        templateClone.querySelector('.num2 > span').textContent +=
                            ' ' + counter.projectsCount;

                        templateClone.querySelector('.media__link').setAttribute('href', counter.docs);
                        template.appendChild(templateClone);

                    }

                }


            }
        }
        http.send(null);
    } else {
        document.location = link;
    }
}

// обрабатываем клик по кнопке
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault;
    remove();
    var selind = document.getElementById("select").options.selectedIndex;
    var txt = document.getElementById("select").options[selind].text;
    var val = document.getElementById("select").options[selind].value;
    var formation_link = 'https://frontend-test-api.alex93.now.sh/api/languages?group=' + val;
    showContent(formation_link);

});