const baconImageSource = 'https://baconmockup.com/1240/775/';
const kevinImageSource = 'https://static.parade.com/wp-content/uploads/2016/05/KevinBacon-FTR.jpg';

$(document).ready(() => {

    const $button1 = $('#choice1');
    const $button2 = $('#choice2');
    const $card = $('#card');
    const $cardBack = $('#card div.back');
    const $messageArea = $('div.message-area');
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
        $messageArea.removeClass('good bad hidden');
        $messageArea.text(message);
        $messageArea.addClass(isGood ? 'good' : 'bad');
    }

    function clearMessage() {
        $messageArea.text('');
        $messageArea.addClass('hidden');
    }

    function makeRandomCard() {
        correctNumber = Math.floor(Math.random() * 2) + 1;
        if (correctNumber === 1) {
            generateCard(baconImageSource);
        } else {
            generateCard(kevinImageSource);
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
