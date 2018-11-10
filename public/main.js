const baconImages = [
    'https://baconmockup.com/1240/775/',
    'https://static.parade.com/wp-content/uploads/2016/05/KevinBacon-FTR.jpg',
];
const newtonImages = [
    'https://upload.wikimedia.org/wikipedia/commons/c/c9/Fig-Newtons-Stacked.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/Olivia_Newton_John_%286707495311%29_%28cropped_to_look_large%29.jpg'
];

$(document).ready(() => {

    const $button1 = $('#choice1');
    const $button2 = $('#choice2');
    const $card = $('#card');
    const $cardBack = $('#card div.back');
    const $messageArea = $('div.message-area');
    const $questionArea = $('h4.question');
    let correctNumber = 0;

    function generateCard(imageSrc) {
        $cardBack.empty();
        const $imgBack = $('<img>', {
            class: 'img-fluid card card-back',
            src: imageSrc
        });
        $cardBack.append($imgBack);
    }

    function showMessage(message, isGood) {
        $messageArea.removeClass('bg-transparent');
        $messageArea.text(message);
        $messageArea.addClass(isGood ? 'good' : 'bad');
    }

    function clearMessage() {
        $messageArea.removeClass('good bad');
        $messageArea.text('');
        $messageArea.addClass('bg-transparent');
    }

    function genRandomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function makeRandomCard() {
        const cardType = genRandomNumber(1, 2);
        let foodImage, celebImage;
        if (cardType === 1) {
            foodImage = baconImages[0];
            celebImage = baconImages[1];
            $questionArea.text('Bacon or Kevin Bacon?');
            $button1.text('Bacon!');
            $button2.text('Kevin Bacon!');
        } else {
            foodImage = newtonImages[0];
            celebImage = newtonImages[1];
            $questionArea.text('Fig Newton or Olivia Newton John?');
            $button1.text('Fig Newton!');
            $button2.text('Olivia Newton John!');
        }
        correctNumber = genRandomNumber(1, 2);
        if (correctNumber === 1) {
            generateCard(foodImage);
        } else {
            generateCard(celebImage);
        }
    }

    function disableButtons() {
        $button1.prop('disabled', true);
        $button2.prop('disabled', true);
    }

    function enableButtons() {
        $button1.prop('disabled', false);
        $button2.prop('disabled', false);
    }

    $card.flip({
        trigger: 'manual'
    });

    makeRandomCard();

    function handleClick (event) {
        $card.flip(true);
        disableButtons();
        const choice = event.target.id[event.target.id.length - 1];
        if (parseInt(choice) === correctNumber) {
            showMessage('You chose well!', true);
        } else {
            showMessage('You chose poorly', false);
        }
        setTimeout(() => {
            clearMessage();
            $card.flip(false);
            setTimeout(() => {
                makeRandomCard();
                enableButtons();
            }, 500);            
        }, 1500);
    }

    $button1.click(handleClick);
    $button2.click(handleClick);

});
