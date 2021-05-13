var kérdések;
var kérdésszám = 1;
var hotList = [];  
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;

window.onload = () => {
    letöltés();

    document.getElementById("vissza").onclick = () => {
        if (kérdésszám == 0) {
            kérdésszám = kérdések.length - 1;
            letöltés();
        }

        else {
            kérdésszám--;
            letöltés();
        }

    }

    document.getElementById("előre").onclick = () => {
        if (kérdésszám == kérdések.length - 1) {
            kérdésszám = 0;
            letöltés();
        }

        else {
            kérdésszám++;
            letöltés();
        }
    }
}

function letöltésBefejeződött(d)
{
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(kérdésszám);
}

function letöltés()
{
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );
}

function kérdésMegjelenítés(kérdésSzám)
{
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;    
}

function kérdésBetöltés(questionNumber, destination)
{
    fetch(`/questions/${questionNumber}`)
        .then(result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${result.status}`);
                    return null;
                }
                else {
                    return result.json()
                }
            })
        .then(q => {
            hotList[destination] = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltve a hotList ${destination}. helyére`);
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        });
}

function válaszfeldolgozás(válasz)
{
    if (!válasz.ok) {
        console.error(`Hibás válasz: ${response.status}`)
    }
    else {
        return válasz.json()
    }
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function előre()
{
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}