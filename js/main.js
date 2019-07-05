//HTMLタグからの変数を参照する
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//各ボタンへの参照
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

//表示中のスライドを格納
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

//クイズの質問と選択肢、回答
const myQuestions = [
  {
    question:"テスト1",
    answers:{
      a:"A",
      b:"b",
      c:"c",
      d:"d"
    },
    correctAnswer:"c"
  },
  {
    question:"テスト2",
    answers:{
      a:"A",
      b:"b",
      c:"c"
    },
    correctAnswer:"b"
  },
  {
    question:"テスト3",
    answers:{
      a:"A",
      b:"b",
      c:"c"
    },
    correctAnswer:"a"
  }
];

//クイズ生成
function buildQuiz(){
  //HTMLに出力
  const output = [];

  //ループで問題を1問ずつ格納
  myQuestions.forEach(
    (currentQuestion,questionNumber) => {

        //回答を配列で格納
        const answers = [];
        //回答を取り出し、letter変数に格納※なくなるまで繰り返し　実際に選択した値を取り出している
        for(letter in currentQuestion.answers){

          //for分で解答ラジオボタンと選択肢を表示
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter}:
              ${currentQuestion.answers[letter]}
              </label>`
          );
        }

        //ラジオボタンで選択した質問と回答をoutputに追加
        output.push(
          //sildeでクイズの表示・非表示
          '<div class="slide">
            //ここの currentQuestion.questionがよくわからん
            `<div class="question"> ${currentQuestion.question}</div>
            <div class="answers">${answers.join('')}</div>`
          </div>'
        );
    }
  );
 //HTMLに出力
 quizContainer.innerHTML = output.join('');
}

//回答表示
function showResults(){

  //ユーザーが選択したすべての回答をコンテナに格納
  const answerContainers = quizContainer.querySelectorAll('.answers');

  //正解数
  let numCorrect = 0;

  //一問ずつループで回答チェック　currentQuestion＝問題と選択肢、回答、questionNumber＝myQuestionsの順番
  myQuestions.forEach((currentQuestion,questionNumber) =>{

    //それぞれ「問題番号」「チェックしたラジオボタン」「ラジオボタンの内容（値）」
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    //選択した値　もしくは空白（無回答） どれを選択したのか　問題と選択肢を取り出している
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    //正解のときの処理　一致した場合
    if(userAnswer===currentQuestion.correctAnswer){

      //正解数をカウントアップ
      numCorrect++;

      //選択欄を緑に変更
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    //不正解のときの処理
    else{
      //選択欄を赤に変更
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  //正解数の表示 ${}の部分がHTMLに表示される
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

buildQuiz();

//ボタンを押すと結果を表示
submitButton.addEventListener('click',showResults);

//スライドの表示機能
function showSlide(n){
  //removeで非表示にする\
  slides[currentSlide].classList.remove('active-slide');
  //addで表示にする
  slides[n].classList.add('active-slide');
  //スライド番号の更新
  currentSlide = n;

  //先頭スライド
  if(currentSlide===0){
    //previousButtonを非表示
    previousButton.style.display = 'none';
  }
  //先頭スライド以外
  else{
    //previousButton非表示
    previousButton.style.display = 'inline-block';
  }

  //最終スライド
  if(currentSlide===slides.length - 1){
    //nextButtonを非表示、submitButtonを表示
    nextButton.style.display  = 'none';
    submitButton.style.display = 'inline-block';
  }
  //最終スライド以外
  else {
    //nextButtonを表示、submitButtonを非表示
    nextButton.style.display  = 'inline-block';
    submitButton.style.display = 'none';
  }
}
//先頭スライドの表示
showSlide(0);

//次のスライドを表示
function showNextSlide(){
  showSlide(currentSlide + 1);
}

//前のスライドを表示
function showPreviousSlide(){
  showSlide(currentSlide - 1);
}

//previousButtonを押したときの動作
previousButton.addEventListener("click",showPreviousSlide);

//nextButtonを押したときの動作
nextButton.addEventListener("click",showNextSlide);
